<template>
    <div
        class='fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 px-6 py-4 bg-white bg-opacity-90 backdrop-blur-sm '>
        <router-link :to="{name:'home'}" class="flex items-center gap-1 ">
          <img :src="logoImage" class="h-12" alt="">
          <h1 class="font-bold text-1xl text-violet-600">
            Event4You
          </h1>
        </router-link>
    </div>
    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import logoImage from '@/assets/logo.png'

const counter=useCounterStore()
</script>

<style></style>