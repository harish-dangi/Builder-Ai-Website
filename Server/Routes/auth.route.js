import express from "express";
import { getMeController, loginController,logoutController,registerController } from "../Controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
isAuthenticated
const Authrouter = express.Router();

Authrouter.post("/login", loginController);
Authrouter.post("/register",registerController);
Authrouter.get("/logout",isAuthenticated,logoutController);
Authrouter.get("/getme",isAuthenticated ,getMeController);

export default Authrouter;