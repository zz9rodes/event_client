
<template>
    <div class="flex justify-center card">
        <Toast />
        <Button label="Show" @click="show()" />
    </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { Toast,Button } from 'primevue';
// import Button from "primevue";
const toast = useToast();

const show = () => {
    toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content'});
};
</script>
