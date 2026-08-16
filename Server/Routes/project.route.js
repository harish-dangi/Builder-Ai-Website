import express from "express";
import { createProjectController, runBackgroundGeneration, updateProjectController, deleteProjectController, publishProjectController,getPublishedProjectController,getAllProjectsController,getProjectByIdController } from "../Controllers/project.controller.js"; 
import {isAuthenticated} from "../middleware/auth.middleware.js";
import { chat } from "../Controllers/chat.controller.js";

 const Projectrouter = express.Router();

// Create a new project
Projectrouter.post("/",isAuthenticated, createProjectController);
Projectrouter.put("/:projectId",isAuthenticated, updateProjectController);
Projectrouter.delete("/:projectId",isAuthenticated, deleteProjectController);
Projectrouter.post("/:projectId/publish",isAuthenticated, publishProjectController);
Projectrouter.get("/published/:projectId",isAuthenticated, getPublishedProjectController);
Projectrouter.get('/',isAuthenticated,getAllProjectsController)
Projectrouter.get("/:projectId",isAuthenticated,getProjectByIdController)

//chat 
Projectrouter.post("/:id/chat",isAuthenticated,chat);
// Projectrouter

export default Projectrouter;