<template>
    <div>
          <div class="header-chat">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <p class="name">Megan Leib</p>
            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
          </div>
          <div class="messages-chat">
            <div class="message" v-for="(response,index) in responseArray" :key="'response'+index">
              <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                <div class="online"></div>
              </div>
              <p class="text" > {{response}} </p>
            </div>
            <!-- <div class="message text-only">
              <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
            </div> -->
            {{ connected }}
            <p v-for="id in onlineUsers" :key="id">{{ id }}</p>
            <p class="time"> 14h58</p>
            
            <div class="message " v-for="(message,index) in messageArray" :key="'message'+index">
              <div class="response">
                <p class="text"> {{ message }}</p>

              </div>
            </div>
          </div>
          
          <div class="footer-chat">
            <i class="icon fa fa-smile-o clickable" style="font-size:25pt;" aria-hidden="true"></i>
            <input type="text" class="write-message" placeholder="Type your message here" v-model="messageInput" v-on:keyup.enter="enter">
            <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true" @click="postMessage" ></i>
          </div>
        
    </div>
</template>
<script>
import { state } from "@/socket";
import { socket } from "../socket";

export default{
    name:'chat',
    data(){
        return{
            messageInput:'',
            messageArray:[],
            responseArray:[],
            userId : null,
            onlineUsers:[]
        }
    },

    computed : {
      connected() {
        return state.connected;
      },
      
    },
    methods:{
        postMessage(){  
          
          socket.emit("chat",this.messageInput); //gönderiyo
          this.messageInput='';
                        
        },
        enter(){
            this.postMessage();
        }
    },
    mounted(){
      // socket.on('userRegister' ,id=>{
      //   console.log(id);
      // })
    socket.on("userId",(user)=>{
      this.onlineUsers.push(user);
    })
    socket.on("message",(message,response)=>{ //dinliyo
      if(this.onlineUsers == this.onlineUsers){
        this.messageArray.push(message);
      }else{
        this.responseArray.push(response);
      }
       
    })
    }
   
};


</script>
<style scoped>

</style>
