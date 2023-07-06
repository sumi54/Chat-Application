import { reactive } from "vue";
import { io } from "socket.io-client";
//istek
export const state = reactive({
    connected: false,
    userId : [],
    CurrentUser:[]
  });
  
  const URL = "http://192.168.137.115:3000";
  
  export const socket = io(URL);
  
  socket.on("connect", () => {
    state.connected = true;
  //  socket.on('userRegister',(user)=>{
  //   this.userId.push(user);
  //   console.log(this.userId)
  //   })
    // socket.emit('userRegister',state.userId)
    
    // socket.on('chat',(msg)=>io.emit('receiver',msg))

    // console.log(socket.id);
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
