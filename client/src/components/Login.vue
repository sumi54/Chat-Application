<template>
  <div class="container2">
    <div class="col">
      <div class="form-floating mb-3 login">
        <input type="text" class="col-sm-7 form-control " id="floatingInput" placeholder="Name..." v-model="nameInput" v-on:keyup.enter="gotoChat">
        <button @click="gotoChat" class="btn btn-primary col-sm-5 login-btn">Join To Chat!</button>
      </div>
    </div>
  </div>   
</template>
<script>
import router from '../router';
import { socket } from "../socket";

import {mapState,mapStores} from 'pinia'
import {useChatStore} from '../stores/chatStore'
import chatListVue from './chatList.vue';
export default {
  name: 'Login',
  data(){
    return{
      nameInput:'',
    }
  },  
 
  mounted(){

    socket.on("userid",(userId) => {
        this.chatStore.setUserId(userId)
    });

  },
  methods:{
    gotoChat(){
      if(this.nameInput==''){
        alert("İsim alanını boş bırakmayınız...")

      }else if(this.nameInput.length>20){
        alert("20 harften daha fazla giremezsiniz")
      }
      else{
        router.push('/chat')
        socket.emit("name",this.nameInput); //gönderiyo
        this.chatStore.setCurrentUser(this.nameInput);
      }
    }
  },
  computed : {
    ...mapStores(useChatStore)
    
  }
  
};
</script>
<style>
.login{
  display: flex;
  flex-direction: column;
  margin-left: 30%;
}
input{
  height: 2.5em;
  width: 6em; 
  margin-top: 21%;
}
.login-btn{
  margin-top: 1em;
  margin-left: 2.2em;
}
.container2{
  padding:auto;
  background-color: #FFF; 
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  height: 320px;
  width: 600px;
  /* text-align: center; */
  /* margin-left: auto;
  margin-right: auto; */
  margin: auto;
}
</style>