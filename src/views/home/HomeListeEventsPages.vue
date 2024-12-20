<template>
    <SearchBarEvents/>
    <h1 class="container pt-2 mx-auto font-bold text-violet-600 font-nunito sm:text-xl md:text-3xl px-7">
        Find Your Events 
    </h1>
    <HomeListEvent :events="events"></HomeListEvent>
</template>

<script setup>
import SearchBarEvents from '@/components/Events/SearchBarEvents.vue';
import HomeListEvent from '@/components/Home/HomeListEvent.vue';
import { onMounted,ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth=useAuthStore()

const events=ref([])


onMounted(()=>{
    LoadsEvents()
})

const LoadsEvents= async ()=>{
  const data=await  auth.api('GET','/events-all')
  if(data.valid){
    events.value=data.result
  }
  else{
    window.$toast('error', data.errorMessage,data.errorMessage);
  }
  console.log(data);
}





</script>

<style scoped></style>