import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import chat from './components/chat.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/chat',
    name: 'chat',
    component: chat,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;