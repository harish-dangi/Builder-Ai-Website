/**
 * @route Post /api/projects/:id/chat
*/

import { object } from "zod";
import { ProjectModel } from "../Model/Project.model";
import { reviseProject } from "../Services/ai";
import { applyOperations } from "../Services/diff";

export const BuildManifest = (files) => {
  const manifest = [];
  for (const [path, entry] of Object.entries(files)) {
    manifest.push({ path, hash: entry.hash, size: entry.content.length });
  }
  return manifest;
}
//send the revision prompt and return updated projects
export const chat = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user._id;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({
      message: "prompt not found"
    })
  }

  const project = await ProjectModel.findOne({ _id: req.params.id, owner: userId });
  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    })
  }

  //set status to revising and save user prompt immedaitely
  project.status = "revising",
  project.messages.push({
    role: "user", content: prompt, timestamp: new Date()
  });
  await project.save();

  try {
    //Build compact manifest (path + hash + size) instead of sending all code
    const manifest = BuildManifest(project.files);

    //includes all file contents so the ai can accurate search/replace
    const relevantFiles = {};
    for (const [path, entry] of Object.entries(files)) {
      relevantFiles[path] = entry.content;
    }
    //Recent messages for context (last 4 max)
    const recentMessages = project.messages.slice(-4).map((m) => ({
      role: m.role,
      content: m.content,
    }))

    console.log(`[Ai] Revising project ${project._id}: "${prompt.slice(0, 80)}..." ` + `(${manifest.length} files, manifest ~${JSON.stringify(manifest).length} chars)`);

    //call ai with manifest + relevantFiles
    const result = await reviseProject(prompt, manifest, relevantFiles, recentMessages);
    console.log(`[Ai] got ${result.operations.length} operations: ${result.description}`);

    //Apply operation to file map
    const { files: updatedFiles, applied, errors } = applyOperations(project.files, result.operations)

    if (errors.length > 0) {
      console.warn(`[Diff] Errors applying operations:`, errors)
    }

    //Update project in DB
    project.files = updatedFiles;
    project.markModified("files");
    project.version += 1;
    project.status = "completed";
    project.messages.push({
      role: "assistant",
      content: result.description + (errors.length > 0 ? `\n\n Some Operations failed: ${errors.join(", ")} ` : " ")
    });
    await project.save();

    //Return updated projcet
    const filesObj = {};
    for (const [path, entry] of Object.entries(project.files)) {
      filesObj[path] = entry.content;
    }

    return res.status(200).json({
      message: "Return Updated Project Successfull!",
      project
    })
  } catch (err) {
    console.error(`[AI] Revision Error ${err.message}`);
    project.status = "completed";
    await project.save();
    return res.status(500).json({
      error: err.message || "Failed to process revision request"
    });

  }
}