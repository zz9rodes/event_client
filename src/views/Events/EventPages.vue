<template >
    <div class="flex flex-col h-full ">
        <nav class="bg-white shadow-sm ">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <h1 class="hidden text-xl font-bold text-violet-800 sm:block">EventHub</h1>
                    </div>
                    <EventBarMenu/>
                   
                </div>
            </div>
    </nav>

    <RouterView class="flex-1"></RouterView>
    </div>
  

</template>

<script setup>
import { RouterView } from 'vue-router';
import EventBarMenu from '@/components/Events/EventBarMenu.vue';

</script>

<style>

</style>