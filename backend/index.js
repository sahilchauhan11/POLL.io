import express, { urlencoded } from "express";
import mongoDbconnection from "./utils/mongoDbConnection.js"
import cors from 'cors';
import http from 'http';
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import pollRoutes from "./routes/poll.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import dotenv from "dotenv";
import path from "path";
import {Server} from 'socket.io'
dotenv.config()
mongoDbconnection();
const app=express();
const server=http.createServer(app);
const io=new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  const port=process.env.PORT||3000;
  const __dirname=path.resolve();
  
app.use(cors(corsOptions));
app.use("/user",userRoutes)
app.use("/poll",pollRoutes)
app.use("/choice",choiceRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})


io.on("connection",(socket)=>{
  

  socket.on("disconnect", () => {
  });
})
export { io }; 
server.listen(port);