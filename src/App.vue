<template>
   <div>
    <RouterView/>
    <AppModal :is-open="modal.isOpen">

    </AppModal>
   </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppModal from './components/global/AppModal.vue';
import { useModalStore } from './stores/modal';

const modal=useModalStore()

</script>

<style scoped>

</style>