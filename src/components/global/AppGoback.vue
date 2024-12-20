<template>
    <div @click="HandlerRouteChange" class="cursor-pointer ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-circle-chevron-left size-7 text-violet-400">
            <circle cx="12" cy="12" r="10" />
            <path d="m14 16-4-4 4-4" />
        </svg>
    </div>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router';
const route=useRoute()
const router=useRouter()


const HandlerRouteChange=()=>{
   router.back()
}
</script>

<style></style>