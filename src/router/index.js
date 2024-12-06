import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/Landing/LandingPage.vue';
import Login from '@/components/auth/Login.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';
import Register from '@/components/auth/Register.vue';
import SendMail from '@/components/auth/sendMail.vue';
import MainLayout from '@/components/global/MainLayout.vue';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import ListEventPage from '@/views/ListEventPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/auth', 
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: 'login', 
          name: 'login', 
          component: Login,
        },
        {
          path: 'reset-password', 
          name: 'reset-password',
          component: ResetPassword,
        },
        {
          path: 'register', 
          name: 'register',
          component: Register,
        },
        {
          path: 'send-mail', 
          name: 'send-mail',
          component: SendMail,
        },
      ],
    },
    {
      path:"/account",
      name:"account",
      component:MainLayout,
      children:[
        {
          path:'/events',
          name:"events",
          component:ListEventPage
        }
      ]
    }
  ],
});

export default router;