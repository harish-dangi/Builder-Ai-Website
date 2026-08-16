import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import Authrouter from "./Routes/auth.route.js";
import Projectrouter from "./Routes/project.route.js";


const  app = express();
app.use(cookieParser());
// app.use(cors());
app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
/**
* all routes here
*/
app.use('/api/auth',Authrouter)
app.use('/api/projects',Projectrouter)



export default app;
