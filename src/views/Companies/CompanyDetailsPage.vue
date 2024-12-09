<template>
  <div>
    <CompanyHeaderDetails/>
    <CompaniesBarMenu/>
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import CompanyHeaderDetails from '@/components/Companies/CompanyHeaderDetails.vue';
import CompaniesBarMenu from '@/components/Companies/CompaniesBarMenu.vue';

</script>

<style>

</style>