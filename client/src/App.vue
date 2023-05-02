<!-- <script setup>
import HelloWorld from './components/chat.vue'
import TheWelcome from './components/TheWelcome.vue'
</script> -->

<template>
<div class="container">
      <div class="row">
        <menu-app></menu-app>
        <chat-list-app></chat-list-app>
        <section class="chat">
          <chat-app></chat-app>
        </section>
      </div>
    </div>
</template>
<script>
import chatApp from './components/chat.vue';
import menuApp from './components/menu.vue';
import chatListApp from './components/chatList.vue';

export default{
  components:{
    chatApp,
    menuApp,
    chatListApp
  },
 
}
</script>
<style scoped>

</style>
