<template>
   <Toast />
   <div class=" font-nunito">
      <RouterView />
      <AppModal :is-open="modal.isOpen">

      </AppModal>
   </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import AppModal from './components/global/AppModal.vue';
import { useModalStore } from './stores/modal';
import { Toast } from 'primevue';
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
import { onBeforeUnmount } from 'vue';
const toast = useToast()



const modal = useModalStore()

const showToast = (severity, summary = '', detail) => {
   toast.add({ severity, summary, detail, life: 3000 });
};

// Rendre la méthode disponible globalement
window.$toast = showToast;
onBeforeUnmount(()=>{
   alert("onBeforeUnmount")
})
</script>

<style scoped></style>