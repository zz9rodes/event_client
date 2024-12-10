<template>
    <div class="container px-4 py-8 mx-auto">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div v-for="admin in admins" :key="admin.id"
                class="overflow-hidden transition-transform duration-300 bg-white rounded-none shadow-lg cursor-pointer group hover:scale-105">
                <div class="relative h-64">
                    <img :src="admin.profilePhoto" :alt="admin.name" class="w-full h-full" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="flex justify-between p-4 ">
                    <div class="p-4 bg-purple-50">
                        <h3 class="mb-1 text-lg font-semibold text-purple-800">{{ admin.name }}</h3>
                        <p class="text-sm text-gray-600">{{ admin.email }}</p>
                    </div>
                </div>
            </div>

            <div @click="isOpen=true"
                class="flex flex-col items-center justify-center p-6 overflow-hidden transition-all duration-300 bg-white shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1">
                <div class="flex items-center justify-center w-20 h-20 mb-4 bg-purple-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-purple-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>

            </div>
        </div>
    </div>
    <AppModal :is-open="isOpen" :is-loader="false" @closeModal="isOpen=false">
        <FormSendInvitation></FormSendInvitation>
    </AppModal>
</template>

<script setup>
// import 
import { ref, defineProps } from 'vue'
import FormSendInvitation from './FormSendInvitation.vue';
import AppModal from '../global/AppModal.vue';

const props = defineProps({
    admins: {
        type: Array,
        required: true,
        validator: function (value) {
            return value.every(admin =>
                admin.id && admin.name && admin.email && admin.profilePhoto
            );
        }
    }
})
const isOpen=ref(false)
</script>



<style scoped></style>