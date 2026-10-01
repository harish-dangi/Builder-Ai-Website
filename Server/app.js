import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import Authrouter from "./Routes/auth.route.js";
import Projectrouter from "./Routes/project.route.js";


const  app = express();
app.use(cookieParser());

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://builder-ai-website.vercel.app",
    "https://builder-ai-website-git-main-harish-6dd8.vercel.app",
    "https://builder-ai-website-lt3nh3an3-harish-6dd8.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // Postman/server-to-server requests ke liye
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));
/**
* all routes here
*/
app.use('/api/auth',Authrouter);
app.use('/api/projects',Projectrouter);

export default app;
