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
import FormCreateCompany from '@/components/Companies/FormCreateCompany.vue';
import ListCompaniesPage from '@/views/Companies/ListCompaniesPage.vue';
import CompanyDetailsPage from '@/views/Companies/CompanyDetailsPage.vue';
import CompanyDashboardPages from '@/views/Companies/CompanyDashboardPages.vue';
import CompanyEventsList from '@/views/Companies/CompanyEventsListPages.vue';
import CompanyAdminsPage from '@/views/Companies/CompanyAdminsPage.vue';
import CompanySettingPage from '@/views/Companies/CompanySettingPage.vue'
import EventDetailsPage from '@/views/Events/EventDetailsPage.vue';
import EventPages from '@/views/Events/EventPages.vue';
import EventSubcribtionPage from '@/views/Events/EventSubcribtionPage.vue';
import AppProfile from '@/components/global/AppProfile.vue';

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
      path: "/account",
      name: "account",
      component: MainLayout,
      children: [
        {
          path:'profile',
          name:'profile',
          component:AppProfile
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
          path: "companies/:compainy_id",
          name: "company",
          component: CompanyDetailsPage,
          children: [
            {
              path: 'companies-events',
              name: 'companies-events',
              component: CompanyEventsList
            },
            {
              path: 'companies-dashboard',
              name: 'companies-dashboard',
              component: CompanyDashboardPages
            },
            {
              path: 'companies-admins',
              name: 'companies-admins',
              component: CompanyAdminsPage
            },
            {
              path: 'companies-setting',
              name: 'companies-setting',
              component: CompanySettingPage
            }
          ]
        },
        {
          path: 'companies/:compainy_id/create-event',
          name: 'create-event',
          component: FromCreate_UpdateEvent
        },
        {
          path: 'companies/:compainy_id/event/:event_id',
          name: 'event',
          component: EventPages /*EventDetailsPage*/,
          children:[
            {
              path:'details',
              name:'event-detail',
              component:EventDetailsPage
            },
            {
              path:'subscribtions',
              name:'event-subscribtions',
              component:EventSubcribtionPage
            }
          ]
        }
      ]
    }
  ],
});

export default router;