<template>
    <div>
      <CompaniesAdmins :admins="admins"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import CompaniesAdmins from '@/components/Companies/CompaniesAdmins.vue';

    const admins=ref([])
    admins.value=[
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          profilePhoto: 'https://i.pinimg.com/236x/86/ec/27/86ec2774e34ebcdbd4529bd016291ca9.jpg'
        },
        {
          id: 2,
          name: 'Marie Martin',
          email: 'marie.martin@example.com',
          profilePhoto: 'https://i.pinimg.com/236x/2a/df/a6/2adfa62fb2b0ed26076e1003c15d5fde.jpg'
        },
        {
          id: 3,
          name: 'Sophie Bernard',
          email: 'sophie.bernard@example.com',
          profilePhoto: 'https://i.pinimg.com/236x/3e/94/ce/3e94ce51cd5e6d43e54a0dd3e4ce7e2a.jpg'
        }
      ]
  </script>
  
  <style>
  
  </style>