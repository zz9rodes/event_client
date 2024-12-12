<template>
    <div
        class='fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 px-6 py-4 bg-white bg-opacity-90 backdrop-blur-sm '>
        <router-link :to="{name:'home'}">
          <img src="../../../public/logo.PNG" class="h-12" alt="">
        </router-link>
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
const counter=useCounterStore()
</script>

<style></style>