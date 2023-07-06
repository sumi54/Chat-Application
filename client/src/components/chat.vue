<template>
  <div class="container">
    <div class="row">
        <menu-app></menu-app>
        <chat-list-app></chat-list-app>
        <section class="chat">
          <div class="header-chat">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <p class="name">{{ CurrentUserName }}</p>
            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
          </div>
          <div class="messages-chat">
            <!-- <div v-if="responseArray.time>CurrentTime"> -->
            <div class="message"  v-for="message in messageArray" :key="message">
              <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                <div class="online"></div>
              </div>
              <p class="text" ><span :class="{'float-left':message.type===0}">{{ message.message }} </span> </p>
              
            </div>
            <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
            </ul>

             <!-- <div class="message text-only">
              <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
            </div>   -->
            <!-- {{ connected }} -->
            <p v-for="id in onlineUsersId" :key="id">{{ id }}</p>
            <p class="time"> {{time}}</p>
          <!-- </div> -->
            <!-- <div v-else> -->
            <div class="message message-response" v-for="message in responseArray" :key="message">
              <div class="response">
                <p class="text"> <span :class="{'float-right':message.type===1}">{{ message.message }} </span></p>
              </div>
              <p class="time time-response"> {{ time }}</p>
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

// import { useChatStore } from "@/stores/chat.js";
//   const store = useChatStore();
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
            responseArray:[],
            CurrentUserName : '',
            onlineUsers:[],
            nameArray:[],
            CurrentUser:'',
            SenderUser:'',
            time:[],
            CurrentTime:"",
            onlineUsersId:[]
        }
    },
    computed : {
      connected() {
        return state.connected;
      },
      ...mapStores(useChatStore)
    },
    methods:{
        postMessage(){  

          
          // this.chatStore.setUserId(44);
          // console.log("Son Hali  => " + this.chatStore.getUserId);
          const timelong=moment().format('HH:mm:ss');
          this.time=moment().format('HH:mm')
          
          this.responseArray.push({message:this.messageInput,type:0,time:timelong});
          socket.emit("chat",this.messageInput); 
          this.messageInput='';
        },
        updateTime(){
          setInterval(()=>{
            this.CurrentTime=moment().format('HH:mm:ss');
          })
        },
    },
    mounted(){
      socket.on("disconnectInfo",(userId)=>{
        console.log(userId);
          this.chatStore.onlineusers=this.chatStore.onlineusers.filter(user => user.id != userId)
      })
      
      console.log(this.chatStore.onlineusers);
      socket.on("nameList",(users)=>{
        this.onlineUsers.push(users);
      })

      socket.on("nameList",(users)=>{
          if(users.length>0){
            this.CurrentUserName=users[users.length-1].name;
          }
      });
      this.updateTime();
    
    socket.on("chat",(message,id)=>{
      const timelong=moment().format('HH:mm:ss');
      this.time=moment().format('HH:mm');
      this.CurrentUser=socket.id;
        this.messageArray.push({message:message,type:1,time:timelong,CurrentUser:id});
    });
    this.onlineUsersId.push(this.chatStore.getUserId);

    }
};

</script>
<style>
.message-response{
  flex-direction: column;
}
.time-response{
  margin-left: 80% !important;
}
</style>
