<template>
    <ListEvents />
    <div class="inline-flex items-center justify-between w-full px-8 py-6 ">
        <h1 class="text-xl font-bold md:text-3xl text-violet-600">Your Comapnies

        </h1>
        <div>
            <button class="p-2 px-4 text-white rounded-md bg-violet-600" @click.prevent="isOpen=true">New</button>
        </div>
    </div>
    <AppModal :is-loader="false" :is-open="isOpen" @close-modal="isOpen=false">
        <FormCreateCompany></FormCreateCompany>
    </AppModal>

    <ListCompanies></ListCompanies>

</template>

<script setup>
import ListCompanies from '@/components/Companies/ListCompanies.vue';
import AppModal from '@/components/global/AppModal.vue';
import FormCreateCompany from '@/components/Companies/FormCreateCompany.vue';
import { ref } from 'vue';

const isOpen=ref(false)
</script>

<style scoped></style>