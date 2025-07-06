<template>
    <div class="flex justify-center card">
        <Toast />
        <Button label="Afficher" @click="show()" />
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { Toast,Button } from 'primevue';
// import Button from "primevue";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Information', detail: 'Contenu du message'});
};
</script>
