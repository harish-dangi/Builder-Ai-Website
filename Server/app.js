import cookieParser from "cookie-parser";
import express from "express";
import cors from 'cors'
import Authrouter from "./Routes/auth.route.js";
import Projectrouter from "./Routes/project.route.js";


const  app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json())

console.log("process.env.MONGO_UR");
console.log("process.env.PORT")
/**
* all routes here
*/
app.use('/api/auth',Authrouter)
app.use('/api/projects',Projectrouter)

app.get('/',(req,res)=>{
  res.send("server is live!")
})

export default app;
