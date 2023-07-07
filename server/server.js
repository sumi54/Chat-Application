import { response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";


//cevap
const httpServer = createServer();

const io = new Server(httpServer, {
  cors : {
    origin : "http://192.168.137.115:5173"
  }
});
let onlineUsers  = []
let users=[]
let messages=[]
io.on("connection", (socket) => {
  // **ROOMS
  // console.log(socket.rooms); (set1)
  // socket.join("name");
  // console.log(socket.rooms);(set2)


  socket.emit('userid',socket.id);
  
  // socket.on("chat_"+socket.id,(message) => {
    
  // })

  
  socket.on("name",(userName)=>{
    onlineUsers.push({
      "id" : socket.id,
      "name" : userName
    })
    // io.emit("userid",socket.id);
    
    io.emit("nameList",onlineUsers);
  })
  // socket.emit('userRegister',state.userId)
  // socket.emit('userRegister',onlineUsers);
  socket.on("chat",(message)=>{
    socket.broadcast.emit("chat",message);
  })
  socket.on("disconnect",() => {
    

    onlineUsers = onlineUsers.filter(function(user){
      return user.id != socket.id
    })

    io.emit("disconnectInfo",socket.id)

  })

});

httpServer.listen(3000,"192.168.137.115");