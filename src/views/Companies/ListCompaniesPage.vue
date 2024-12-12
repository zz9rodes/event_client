<template>
    <ListEvents />
    <div class="inline-flex items-center justify-between w-full px-8 py-6 ">
        <h1 class="text-xl font-bold md:text-3xl text-violet-600">Your Comapnies

        </h1>
        <div>
            <button class="p-2 px-4 text-white rounded-md bg-violet-600" @click.prevent="isOpen = true">New</button>
        </div>
    </div>
    <AppModal :is-loader="false" :is-open="isOpen" @close-modal="isOpen = false">
        <FormCreateCompany @close-modal="isOpen = false"></FormCreateCompany>
    </AppModal>

    <ListCompanies @create-company="isOpen = true" v-if="companies.length > 0" :companies="companies"></ListCompanies>
    <EmptyCompanies @create-company="isOpen = true" v-else></EmptyCompanies>

</template>

<script setup>
import ListCompanies from '@/components/Companies/ListCompanies.vue';
import AppModal from '@/components/global/AppModal.vue';
import FormCreateCompany from '@/components/Companies/FormCreateCompany.vue';
import EmptyCompanies from '@/components/Companies/EmptyCompanies.vue';

import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore()

const companies = ref([

])

const isOpen = ref(false)

onMounted(() => {
    LoadsCompanies()
})

const LoadsCompanies = async () => {
    const data = await auth.api('GET', '/company/admins')

    if (data.valid) {
        console.log("\n\n ICI \n\n")
        companies.value = data.result.admins
        // window.$toast('success', data.successMessage,data.successMessage);
    }
    else if (data.status !== 422) {
        console.log(data);
    }

}


</script>

<style scoped></style>