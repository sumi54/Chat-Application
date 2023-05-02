import { response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
//cevap
const httpServer = createServer();

const io = new Server(httpServer, {
  cors : {
    origin : "http://localhost:5173"
  }
});

let onlineUsers  = []

io.on("connection", (socket) => {
  // socket.on("userId",(user)=>{
  //   onlineUsers.push({
  //     id:user
  //   });
  // })
  onlineUsers.push(socket.id);
  socket.emit("userId",onlineUsers);
  console.log(onlineUsers);
  // console.log(socket.id)
  // console.log(onlineUsers)
  
  // socket.emit('userRegister',state.userId)
  // socket.emit('userRegister',onlineUsers);
  socket.on("chat",(message,id)=>{
    console.log(message.message);
    io.emit("message",message,id);
  })


  socket.on("disconnect",() => {
    onlineUsers = onlineUsers.filter(function(usersId){
      return usersId != socket.id
    })
    console.log(onlineUsers);
  })

});



httpServer.listen(3000);