import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/Landing/LandingPage.vue';
import Login from '@/components/auth/Login.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';
import Register from '@/components/auth/Register.vue';
import SendMail from '@/components/auth/sendMail.vue';
import MainLayout from '@/components/global/MainLayout.vue';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import ListEventPage from '@/views/Events/ListEventPage.vue';
import FromCreate_UpdateEvent from '@/components/Events/FromCreate_UpdateEvent.vue';
import ListCompaniesPage from '@/views/Companies/ListCompaniesPage.vue';
import CompanyDetailsPage from '@/views/Companies/CompanyDetailsPage.vue';
import EventDetailsPage from '@/views/Events/EventDetailsPage.vue';
import EventPages from '@/views/Events/EventPages.vue';
import EventSubcribtionPage from '@/views/Events/EventSubcribtionPage.vue';
import AppProfile from '@/components/global/AppProfile.vue';
import MySubcribtionList from '@/views/Subcriptions/MySubcribtionList.vue';
import HomeListeEventsPages from '@/views/home/HomeListeEventsPages.vue';
import { ref } from 'vue';
// 



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
        {
          path: 'events-list',
          name: "events-list",
          component: HomeListeEventsPages
        },
      ],
    },
    {
      path: "/account",
      name: "account",
      meta: {
        requiresAuth: true
      },
      component: MainLayout,
      redirect:{name:'events'},
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: AppProfile
        },
        {
          path: 'events-list',
          name: "events",
          component: ListEventPage
        },
        {
          path: 'companies',
          name: "companies",
          component: ListCompaniesPage
        },
        {
          path: "companies/:company_id",
          name: "company",
          component: CompanyDetailsPage,
        },
        {
          path: 'companies/:company_id/create-event',
          name: 'create-event',
          component: FromCreate_UpdateEvent
        },
        {
          path: 'companies/:company_id/event/:event_id',
          name: 'event',
          component: EventPages /*EventDetailsPage*/,
          children: [
            {
              path: 'details',
              name: 'event-detail',
              component: EventDetailsPage
            },
            {
              path: 'subscribtions',
              name: 'event-subscribtions',
              component: EventSubcribtionPage
            }
          ]
        },
        {
          path: 'my-subscribtions',
          name: 'subscribtions',
          component: MySubcribtionList /*EventDetailsPage*/,
        }
      ]
    }
  ],
});

const isAuthentificated = () => {
  const token = ref(localStorage.getItem('token'));

  return token.value ? true : false
}

router.beforeEach(async (to, from, next) => {
  console.log(to);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthentificated()) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else if (((to.name === 'login') || (to.name === 'register')) && isAuthentificated()) {
    next({ name: 'events' });
  } else {
    next();
  }
});


export default router;

