import express from "express";
import { createProjectController, runBackgroundGeneration, updateProjectController, deleteProjectController, publishProjectController,getPublishedProjectController } from "../Controllers/project.controller.js"; 
import {isAuthenticated} from "../middleware/auth.middleware.js";

 const Projectrouter = express.Router();

// Create a new project
Projectrouter.post("/",isAuthenticated, createProjectController);
Projectrouter.put("/:projectId",isAuthenticated, updateProjectController);
Projectrouter.delete("/:projectId",isAuthenticated, deleteProjectController);
Projectrouter.post("/:projectId/publish",isAuthenticated, publishProjectController);
Projectrouter.get("/published/:projectId", getPublishedProjectController);

export default Projectrouter;