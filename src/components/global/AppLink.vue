<template>
  <router-link :to="to">
    {{ name }}
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props=defineProps({
    to:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:false
    }
})

</script>

<style>

</style>