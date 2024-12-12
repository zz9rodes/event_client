<template>
    <div class="min-h-screen bg-gray-50  sm:pb-0">
        <div class="px-4 py-8 mx-auto  pb-16 max-w-7xl sm:px-6 lg:px-8">
            <div class="mb-8">
                <div class="relative h-[500px] rounded-lg overflow-hidden mb-4">
                    <img v-if="event.files && event.files.length > 0" :src="event.files[0].url" alt="Event venue" class="object-cover w-full h-full" />
                </div>
                <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                    <template v-for="(file, index) in (event.files || [])" :key="index">
                        <img v-if="stringContainsIgnoreCase(file.type,'im')" @click="handlePreviewEventFiles(index)" :src="file.url"
                            :alt="`files image ${index + 1}`"
                            class="object-cover w-full h-32 transition-opacity rounded-lg cursor-pointer hover:opacity-75" />
                        <video autoplay="true" controls v-else-if="stringContainsIgnoreCase(file.type,'vid')" @click="handlePreviewEventFiles(index)" :src="file.url"
                            :alt="`files video ${index + 1}`"
                            class="object-cover w-full h-32 transition-opacity rounded-lg cursor-pointer hover:opacity-75"></video>
                    </template>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <div class="p-6 mb-6 bg-white shadow-sm rounded-xl" v-if="event.name">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-bold text-violet-800">{{ event.name }}</h2>
                        </div>

                        <div class="flex flex-wrap justify-between gap-4 mb-6">
                            <div class="p-4 text-center rounded-lg bg-violet-50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto mb-2 text-violet-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span class="block text-sm text-gray-600">{{ event.places }} Capacity</span>
                            </div>
                            <div class="p-4 text-center rounded-lg bg-violet-50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto mb-2 text-violet-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="block text-sm text-gray-600">{{ event.duration }}</span>
                            </div>
                        </div>

                        <div class="mb-6">
                            <h3 class="mb-2 text-lg font-semibold text-gray-800">Description</h3>
                            <p class="text-gray-600">{{ event.description }}</p>
                        </div>

                        <div>
                            <h3 class="mb-2 text-lg font-semibold text-gray-800">Address</h3>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="mb-1 text-sm text-gray-600">City</p>
                                    <p class="font-medium text-gray-800">{{ event.address }}</p>
                                </div>
                                <div>
                                    <p class="mb-1 text-sm text-gray-600">Country</p>
                                    <p class="font-medium text-gray-800">{{ event.address }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1">
                    <div class="grid gap-2 p-6 bg-white shadow-sm rounded-xl">
                        <span type="submit"
                            class="w-full px-4 py-2 transition-colors duration-300 rounded-md text-violet-600 bg-violet-50 hover:bg-violet-100">
                            {{ event.price != 0 ? event.price : event.pricing }}$
                        </span>
                        <button type="submit"
                            class="w-full px-4 py-2 text-white transition-colors duration-300 rounded-md bg-violet-600 hover:bg-violet-700">
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppModal :is-loader="false" :is-open="isOpen" @close-modal="isOpen = false">
        <div class="preview-img">
            <img v-if="stringContainsIgnoreCase(preview.type,'im')"  class="rounded max-w-80 sm:max-w-xl lg:max-w-4xl" :src="preview.url" alt="">
            <video autoplay controls v-if="preview.type === 'video'" class="rounded w-80 sm:w-xl lg:w-4xl h-5/6">
                <source :src="preview.url">
            </video>
        </div>
    </AppModal>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import AppModal from '@/components/global/AppModal.vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { stringContainsIgnoreCase } from '@/utils';

const router = useRouter()
const route = useRoute()

const auth = useAuthStore()
const isOpen = ref(false)
let preview = reactive({
    url: null,
    type: null,
    title: null
})
const event = ref({}) // Changez ici pour un objet vide

const handlePreviewEventFiles = (index) => {
    console.log(index)
    console.log(event.value.files[index]);

    preview = event.value.files[index]
    isOpen.value = true
}

onMounted(() => {
    LoadsEvent()
})

const LoadsEvent = async () => {
    console.log(route.params);
    
    const company_id = route.params.company_id
    const event_id = route.params.event_id
    const data = await auth.api('GET', `/company/${company_id}/event/${event_id}/get`)

    if (data.valid) {
        console.log(data)
        event.value = data.result
    } else {
        console.error(data)
    }
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>