<template>
    <div>
          <div class="header-chat">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <p class="name">Megan Leib</p>
            <i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
          </div>
          <div class="messages-chat">
            <div class="message">
              <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                <div class="online"></div>
              </div>
              <p class="text"> Hi, how are you ? </p>
            </div>
            <div class="message text-only">
              <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
            </div>
            <p class="time"> 14h58</p>
            <div class="message " v-for="item in messageArray" :key="item">
              <div class="response">
                <p class="text"> {{ item }}</p>
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
import io from 'socket.io-client';
export default{
    name:'chat',
    data(){
        return{
            messageInput:'',
            messageArray:[],
            
        }
    },
    methods:{
        postMessage(){
            if(this.messageInput !==''){
                this.messageArray.push(this.messageInput);
                this.messageInput=''; 
            }            
        },
        enter(){
            this.postMessage();
        }
    },
    mounted(){
      const socket=io('http://localhost:5173');
      socket.on('connect',()=>{
        console.log('connected to server');
      });
      socket.on('message',(message)=>{
        this.messageArray.push(message);
      });
    },

}
</script>
<style scoped>

</style>
