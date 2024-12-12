<template>
    <ListEvents />
    <h1 class="text-sm sm:text-xl md:text-3xl">find the perfect Events  one for you!
    </h1>
    <CategoryBarEvent :categories="categories"/>
    <ListCardEvent :events="events"></ListCardEvent>

</template>

<script setup>
import ListEvents from '@/components/Events/SearchBarEvents.vue';
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
    // window.$toast('success', data.successMessage,data.successMessage);
  }
  else{
    window.$toast('error', data.errorMessage,data.errorMessage);
  }
  console.log(data);
}


const LoadsCategories= async ()=>{
  const data=await  auth.api('GET','/category/')
  if(data.valid){
    data.result.forEach((category,index) => {
            category.id=index+1
    });
    categories.value=data.result
    // window.$toast('success', data.successMessage,data.successMessage);
  }
  else{
    window.$toast('error', data.errorMessage,data.errorMessage);
  }
  console.log(data);
}

</script>

<style scoped></style>