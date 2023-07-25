<template>
  <div class="container">
    <div class="row">
        <menu-app></menu-app>
        <chat-list-app></chat-list-app>
        <section class="chat">
          <div class="header-chat">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <p class="name">{{chatStore.getUserName}}</p>
            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
          </div>
          
          <div class="messages-chat">
              <!-- v-show="chatStore.getUserId !== chatStore.getRoom" -->
            <div class="scroll">
            <div v-for="message in receivedMessagesFromUser"  :key="message">
              <div class="message" :class="{'text-only' : message.from == false  }">
                <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);" v-if="message.from">
                  <div class="online"></div>
                </div>
                <div :class="{'response' : message.from == false}">
                  <p  class="text"> {{ message.content }} </p>
                </div>
              </div>
              <p class="time" :class="{'text-right' : message.from == false}"> {{time}}</p>
            </div>
          </div>
          </div>
          <!-- </div> -->
          <div class="footer-chat">
            <i class="icon fa fa-smile-o clickable" style="font-size:25pt;" aria-hidden="true"></i>
            <input type="text" class="write-message" placeholder="Type your message here" v-model="messageInput" v-on:keyup.enter="postMessage">
            <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true" @click="postMessage" ></i>
          </div>
      </section> 
    </div> 
    </div>
</template>

<script >

import { state } from "@/socket";
import { socket } from "../socket";
import menuApp from './menu.vue';
import chatListApp from './chatList.vue';
import moment from "moment";

import {mapState,mapStores} from 'pinia'
import {useChatStore} from '../stores/chatStore'

export default{

  name:'chat',
  
  components:{
    menuApp,
    chatListApp
  },
    data(){
        return{
            messageInput:'',
            messageArray:[],
            CurrentUserName : '',
            onlineUsers:[],
            nameArray:[],
            CurrentUser:'',
            SenderUser:'',
            time:[],
            CurrentTime:"",
            onlineUsersId:[],
            rooms:"",
            socId:""
        }
    },
    computed : {
      connected() {
        return state.connected;
      },
      ...mapStores(useChatStore),
      receivedMessagesFromUser(){

        let messages = this.chatStore.messages.find(room => room.id == this.chatStore.getRoom)

        if(messages === undefined){
          return []
        }
        return messages.message
       },

    },
    methods:{
        postMessage(){  
          // this.chatStore.setUserId(44);
          // console.log("Son Hali  => " + this.chatStore.getUserId);
          if(this.chatStore.getRoom==""){
            alert("Sohbet edeceğiniz kişiyi seçmediniz...");
          }else if(this.messageInput == ""){
            alert("Mesaj alanı boş bırakılamaz.")
          }
          else{
            const timelong=moment().format('HH:mm:ss');
            this.time=moment().format('HH:mm');
            
            this.chatStore.setMessages(this.messageInput,this.chatStore.getRoom,false,true)
            socket.emit("private_message",this.messageInput,this.chatStore.getRoom); 
            this.messageInput='';
          }
        },
        updateTime(){
          setInterval(()=>{
            this.CurrentTime=moment().format('HH:mm:ss');
          })
        },

    },
    mounted(){
      socket.on("disconnectInfo",(userId)=>{
          this.chatStore.onlineusers=this.chatStore.onlineusers.filter(user => user.id != userId)
      })
      
      socket.on("nameList",(users)=>{
        this.onlineUsers.push(users);
      })

      socket.on("nameList",(users)=>{
          if(users.length>0){
            this.CurrentUserName=users[users.length-1].name;
          }
      });
      this.updateTime();
      
      socket.on("chat",({socketId,message})=>{
        const timelong=moment().format('HH:mm:ss');
        this.time=moment().format('HH:mm');
        this.chatStore.setCurrentId(socketId);
        if(socketId != this.chatStore.getUserId){

          let isRead =socketId == this.chatStore.getRoom 

          this.chatStore.setMessages(message,socketId,true,isRead);


        }
        
      });

      this.onlineUsersId.push(this.chatStore.getUserId);

    }
};

</script>
<style>


.container{
  border-collapse: collapse;
  /* background-color: #da1515; */
}
.chat{
  overflow: hidden !important;
}
.messages-chat{
  height: 72% ;
  overflow-y: scroll;
  max-height: 40em ;
}

.time-response{
  margin-left: 90% !important;
}
::-webkit-scrollbar-track{
  max-height: 50%;
}
</style>