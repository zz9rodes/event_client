<template>
    <div class="flex items-center justify-center h-full ">
        <div class="flex justify-between max-w-6xl grid-cols-1 gap-4 mx-auto md:grid-cols-2 lg:grid-cols-4 ">
            <div class="flex flex-col items-center justify-center p-8 text-center rounded-lg ">
                <div @click="HandlerRouteChange" class="relative mb-6 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-party-popper w-16 h-16 text-gray-200">
                        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                        <path d="M10 6h4" />
                        <path d="M10 10h4" />
                        <path d="M10 14h4" />
                        <path d="M10 18h4" />
                    </svg>
                    <span class="absolute -right-1 -top-1">
                        <svg class="w-6 h-6 text-violet-600" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
                <h3 class="mb-2 font-medium text-gray-900">Nothing to show here</h3>
                <p class="mb-6 text-sm text-gray-500">start to create a Companies
                </p>

            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from "vue";


const emit=defineEmits('create-companies')


const HandlerRouteChange = () => {
    emit('create-company')
}

</script>

<style scoped></style>