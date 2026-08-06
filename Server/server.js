import dotenv from 'dotenv'
dotenv.config()
import app from "./app.js";
import ConnectDB from './config/DB.js'


const PORT = process.env.PORT || 3000;


ConnectDB();
app.listen(PORT,()=>{
  console.log(`Sever is running on http://localhost:${PORT}`)
})
      