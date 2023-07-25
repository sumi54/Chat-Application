<template>
    <section class="discussions">
          <div class="discussion search">
            <!-- <div class="searchbar">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search...">
            </div> -->
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
              <div @click="read(user.id)"><p class="name" >{{ unreadMessages(user.id) }}</p></div>
              
              <!-- <p class="message">9 pm at the bar if possible 😳</p> -->
            </div>
            <div class="timer">12 sec</div>
          </div>
          <!-- <div v-for="fil in filter" :key="fil.id">{{ fil }}</div> -->
          <!-- <div class="discussion">
            <div class="photo" style="background-image: url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg);">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Dave Corlew</p>
              <p class="message">Let's meet for a coffee or something today ?</p>
            </div>
            <div class="timer">3 min</div>
          </div>
  
          <div class="discussion">
            <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80);">
            </div>
            <div class="desc-contact">
              <p class="name">Jerome Seiber</p>
              <p class="message">I've sent you the annual report</p>
            </div>
            <div class="timer">42 min</div>
          </div>
  
          <div class="discussion">
            <div class="photo" style="background-image: url(https://card.thomasdaubenton.com/img/photo.jpg);">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Thomas Dbtn</p>
              <p class="message">See you tomorrow ! 🙂</p>
            </div>
            <div class="timer">2 hour</div>
          </div>
  
          <div class="discussion">
            <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80);">
            </div>
            <div class="desc-contact">
              <p class="name">Elsie Amador</p>
              <p class="message">What the f**k is going on ?</p>
            </div>
            <div class="timer">1 day</div>
          </div>
  
          <div class="discussion">
            <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80);">
            </div>
            <div class="desc-contact">
              <p class="name">Billy Southard</p>
              <p class="message">Ahahah 😂</p>
            </div>
            <div class="timer">4 days</div>
          </div>
  
          <div class="discussion">
            <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);">
              <div class="online"></div>
            </div>
            <div class="desc-contact">
              <p class="name">Paul Walker</p>
              <p class="message">You can't see me</p>
            </div>
            <div class="timer">1 week</div>
          </div> -->
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
        let current = this.chatStore.getCurrentId
        let room = this.chatStore.getRoom
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
        let userId = user.id
        let current = this.chatStore.getCurrentId
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
      // this.filter.push(this.chatStore.filteredOnlineUsers)
    },

}
</script>
<style>
.CurrentUser 
.name{
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}
</style>