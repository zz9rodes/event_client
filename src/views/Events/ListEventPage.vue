<template>
    <ListEventSearchBar />
    <h1 class="container pb-4 mx-auto text-sm font-bold capitalize sm:text-xl md:text-3xl text-violet-600 font-nunito">Find the perfect Events one for you!
    </h1>
    <CategoryBarEvent  :categories="categories"/>
    <ListCardEvent  :events="events"></ListCardEvent>

</template>

<script setup>
import ListEventSearchBar from '@/components/Events/SearchBarEvents.vue';
import CategoryBarEvent from '@/components/Events/CategoryBarEvent.vue';
import ListCardEvent from '@/components/Events/ListCardEvent.vue';
import { onMounted,ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth=useAuthStore()

const events=ref([])

const categories=ref([])

onMounted(()=>{
    LoadsEvents()

    LoadsCategories()
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


const LoadsCategories= async ()=>{
  console.log("on charge  les categories")
  const data=await  auth.api('GET','/category/')
  if(data.valid){
    data.result.forEach((category,index) => {
            category.id=index+1
    });
    categories.value=data.result
  }
  else{
    window.$toast('error', data.errorMessage,data.errorMessage);
  }
  console.log(data);
}

</script>

<style scoped></style>