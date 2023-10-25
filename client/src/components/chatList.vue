<template>
    <section class="discussions">
          <div class="discussion search">

            <div class="CurrentUser">
              <h1 class="name">Hoş Geldin {{ chatStore.getCurrentUser }}</h1>
            </div>
          </div>
          <div class="discussion message-active" v-for="user in activeUsers" :key="user.id" @click="room(user)" >
            <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">{{ user.name }}</p>

            </div>
            <div class="timer">{{ unreadMessages(user.id) }}</div>
          </div>

        </section>
</template>
<script>
import { socket } from "../socket";
import {mapState,mapStores} from 'pinia'
import {useChatStore} from '../stores/chatStore'
import { useTransitionState } from 'vue';
export default{
    data(){
      return{
        nameArray:[],
        filter:[],
        rooms:"",
        clicked:false,
      }
    },
    computed:{

     ...mapStores(useChatStore),
 
     activeUsers(){
       return this.chatStore.getActiveUsers;
     },

    },
    methods : {
      unreadMessages(userRoomId){
        let messages = this.chatStore.messages
        let fromMessage = messages.find(from => from.id == userRoomId )
        let unreadMessages = []
          if(fromMessage){
            fromMessage.message.forEach(function(message){
              if(!message.isRead){
                unreadMessages.push({...message}) 
              }
            })
          }
         return unreadMessages.length
      },

      room(user){
        // console.log(user.id);
        // this.rooms=user.id;
        // let current = this.chatStore.getCurrentId
        let userId = user.id
        let messages = this.chatStore.messages

        let fromMessage = messages.find(from => from.id == userId )
        if(fromMessage){
          fromMessage.message.forEach(function(message){
          
            if(message.isRead==false){
              
                message.isRead=true;
            }
          })
      }
        this.clicked=true
        this.chatStore.setRoom(userId);
        this.chatStore.setUserName(user.name)
      },
      
    },
    mounted(){
      socket.on("nameList",(users)=>{
        this.chatStore.onlineusers = users.filter(user => user.id != this.chatStore.id);
      })
    },

}
</script>
<style>
.CurrentUser 
.name{
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}
.timer{
  padding: 4px 9px !important;
  /* margin-left: 11% !important; */
  background-color: #6780cc;
  color: white;
}
</style>