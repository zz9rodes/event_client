<template>
  <div>
    <h1 class="text-5xl py-6 px-2">My Subcribions</h1>
        <SubcribtionList :events="susbscribtions"/>
  </div>
</template>

<script setup>
import SubcribtionList from '@/components/SubcribtionList.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted,ref } from 'vue';

const susbscribtions=ref([])

const auth=useAuthStore()
onMounted(()=>{
    LoadSuscribtions()
})

const LoadSuscribtions= async()=>{
 const data=await    auth.api('GET','/susbscribers/user/get')

 if(data.valid){
    console.log(data)
    susbscribtions.value=data.result.susbcribers
 }else{
    console.log(data);
    
 }
}
</script>

<style scoped>

</style>