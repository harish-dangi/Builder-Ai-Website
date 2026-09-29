import { ProjectModel } from "../Model/Project.model.js";
import mongoose from "mongoose";
import { generateProject } from "../Services/ai.js";
/**
 * @description: create a new project from an AI prompt.
 * @route: POST /api/projects
 * @access: Private
*/

export const createProjectController = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.id;
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }
    // Create project in the database with status "pending"
    const Project = await ProjectModel.create({
      name: `Project - ${new Date().toISOString()}`,
      description: prompt,
      files: {},
      messages: [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: "Planning project structure and files...",
        }
      ],
      version: 0,
      owner: userId,
      status: "pending",
      filesPlanned: [],
      filesGenerated: [],
      currentFile: null,
      error: null,
    });

    // Run background generation process
    runBackgroundGeneration(Project._id.toString(), prompt)
      .catch((error) => {
        console.error("Background generation error:", error);
      });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: {
        _id: Project._id,
        name: Project.name,
        description: Project.description,
        files: Project.files,
        messages: Project.messages,
        owner: Project.owner,
        version: Project.version,
        status: Project.status,
        filesPlanned: Project.filesPlanned,
        filesGenerated: Project.filesGenerated,
        currentFile: Project.currentFile,
        error: Project.error,
        createdAt: Project.createdAt,
        updatedAt: Project.updatedAt,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
/**
 * @description: get all projects of a user.
 * @route: GET /api/projects
 * @access: Private
*/
export const getAllProjectsController = async (req, res) => {
  try {
    // const userId = req.user.id;
    const projects = await ProjectModel.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @description: get a single project by ID.
 * @route: GET /api/projects/:id
 * @access: Private
*/
export const getProjectByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log('userId:',userId)
    const projectId = req.params.projectId;
    // console.log("ProjectID:",projectId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthenticated User",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project Id"
      });
    }
    const project = await ProjectModel.findById({
      _id: projectId
    });
    // console.log("project",project);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const filesObj = {};
    for (const [path, entry] of Object.entries(project.files)) {
      filesObj[path] = entry.content;
    }

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project,
      files: filesObj,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @description: Background worker to progressively generate files and update database in real time.
 * @route: POST /api/projects/:id/generate
 * @access: Private
 */
export async function runBackgroundGeneration(projectId, prompt) {
  try {
    const result = await generateProject(prompt);
    console.log("result", result)
    const updateProject = await ProjectModel.findByIdAndUpdate(projectId, {
      files: result.files,
      description: result.description,
      status: "completed",
      version: 1,
      error: null
    }, { new: true });
    console.log("updateProject", updateProject)
  } catch (error) {
    await ProjectModel.findByIdAndUpdate(projectId, {
      status: "failed",
      error: error.message
    });
  }
}

/**
 * @description: Update a project's status and files.
 * @route: PUT /api/projects/:id
 * @access: Private
 */
export const updateProjectController = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.id;
    const { files } = req.body;

    console.log("PROJECT ID:", projectId);
    console.log("USER ID:", userId);

    // 1. Sirf ID se project find karo
    const projectById = await ProjectModel.findById(projectId);

    console.log("PROJECT BY ID:", projectById);
    console.log("PROJECT OWNER:", projectById?.owner);
    console.log("CURRENT USER:", userId);

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project Id",
      });
    }

    if (!files || typeof files !== "object") {
      return res.status(400).json({
        success: false,
        message: "Files must be an object",
      });
    }

    if (!projectById) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist",
      });
    }

    // 2. Ab owner check karo
    if (projectById.owner.toString() !== userId.toString()) {
      console.log("OWNER DOES NOT MATCH");

      return res.status(403).json({
        success: false,
        message: "You are not the owner of this project",
      });
    }

    // 3. Update
    projectById.files = files;

    const updatedProject = await projectById.save();

    console.log("UPDATED PROJECT:", updatedProject);

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/**
 * @description: Delete a project by ID.
 * @route: DELETE /api/projects/:id
 * @access: Private
 */
export const deleteProjectController = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Project Id"
      });
    }
    const userId = req.user.id;
    const result = await ProjectModel.findByIdAndDelete({ _id: projectId, owner: userId });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @description: Publish a project by ID.
 * @route: POST /api/projects/:id/publish
 * @access: Private
*/
export const publishProjectController = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userID = req.user.id
      if (!userID) {
      return res.status(400).json({
        success: false,
        message: "Unauthenticated User",
      });
    }
  
    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId},
      { published: true },
      { returnDocument: "after" }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    // console.log(project.published)
    return res.status(200).json({
      success: true,
      message: "Project published successfully",
      project,
      published: project.published,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/** 
 * @description:  a publicly published project details (without sensitive information).
 * @route: GET /api/projects/:id/
 * @access: Public
*/
export const getPublishedProjectController = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    console.log("Published Project ID:", projectId);

    const project = await ProjectModel.findOne({
      _id: projectId,
      published: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Published project not found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Get Published Project Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
