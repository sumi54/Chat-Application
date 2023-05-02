import { reactive } from "vue";
import { io } from "socket.io-client";
//istek
export const state = reactive({
    connected: false,
    userId : []
  });
  
  const URL = "http://localhost:3000";
  
  export const socket = io(URL);
  
  socket.on("connect", () => {
    state.connected = true;
    // socket.emit("userId",socket.id);
    // console.log(socket.id)
    // state.userId = socket.id
  //  socket.on('userRegister',(user)=>{
  //   this.userId.push(user);
  //   console.log(this.userId)
  //   })
    // socket.emit('userRegister',state.userId)
    
    // socket.on('chat',(msg)=>io.emit('receiver',msg))
  });
  
  socket.on("disconnect", () => {
    state.connected = false;
  });
  
  // socket.on("chat", (args) => {//Burası bizim attığımız mesaj
  //   console.log(args);
    
  // });
  
  // socket.on("receiver", (args) => {//Burası karşı tarafın mesajı
  //   console.log(args)
  // });
