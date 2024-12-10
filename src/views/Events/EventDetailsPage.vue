<template>
    <div class="min-h-screen bg-gray-50">
         <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="mb-8">
                <div class="relative h-[500px] rounded-lg overflow-hidden mb-4">
                    <img :src="event.mainImage" alt="Event venue" class="object-cover w-full h-full" />
                </div>
                <div class="flex gap-2 overflow-x-auto scrollbar-hide">
                    <template v-for="(file, index) in event.files" :key="index">
                        <img v-if="file.type == 'img'" @click="handlePreviewEventFiles(index)" :src="file.url"
                            :alt="`files image ${index + 1}`"
                            class="object-cover w-full h-32 transition-opacity rounded-lg cursor-pointer hover:opacity-75" />
                        <video autoplay="true" controls v-else @click="handlePreviewEventFiles(index)" :src="file.url"
                            :alt="`files video ${index + 1}`"
                            class="object-cover w-full h-32 transition-opacity rounded-lg cursor-pointer hover:opacity-75"></video>
                    </template>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <div class="p-6 mb-6 bg-white shadow-sm rounded-xl">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-2xl font-bold text-violet-800">{{ event.title }}</h2>

                        </div>

                        <div class="flex flex-wrap justify-between gap-4 mb-6">
                            <div class="p-4 text-center rounded-lg bg-violet-50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto mb-2 text-violet-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span class="block text-sm text-gray-600">{{ event.capacity }} Capacity</span>
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
                                    <p class="font-medium text-gray-800">{{ event.address.city }}</p>
                                </div>
                                <div>
                                    <p class="mb-1 text-sm text-gray-600">Country</p>
                                    <p class="font-medium text-gray-800">{{ event.address.country }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-1">

                    <div class="grid gap-2 p-6 bg-white shadow-sm rounded-xl">
                        <span type="submit"
                            class="w-full px-4 py-2 transition-colors duration-300 rounded-md text-violet-600 bg-violet-50 hover:bg-violet-100">
                            {{ event.pricing.price ? event.pricing.price : event.pricing.type }}$
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
            <img :v-if="preview.type === 'img'" class="rounded max-w-80 sm:max-w-xl lg:max-w-4xl" :src="preview.url"
                alt="">

            <!-- <div    class="flex justify-center h-64 w-80 sm:w-xl lg:w-4xl bg-gray-50"> -->
            <video autoplay controls v-if="preview.type === 'video'" class="rounded w-80 sm:w-xl lg:w-4xl h-5/6">
                <source :src="preview.url">
            </video>
        </div>
    </AppModal>
</template>

<script setup>
import { reactive, ref } from 'vue'
import AppModal from '@/components/global/AppModal.vue';
import EventBarMenu from '@/components/Events/EventBarMenu.vue';

const isOpen = ref(false)
let preview = reactive({
    url: null,
    type: null,
    title: null
})

const event = reactive({
    title: 'Tech Conference 2024',
    rating: 4.5,
    capacity: '500 People',
    duration: '3 Days',
    location: 'Convention Center',
    mainImage: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    files: [
        {
            type: 'img',
            url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        },
        {
            type: 'img',
            url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        },
        {
            type: 'img',
            url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        },
        {
            type: 'img',
            url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
        },
        {
            type: 'video',
            url: "https://cloud.appwrite.io/v1/storage/buckets/6662f3050006440b1ab2/files/D8qqCJiz0CQL9mo_ar.sMU2oJ0oEV05pH4SN/view?project=6660582f001665b39635"
        }
    ],
    description: 'Join us for the biggest tech conference of the year! This premium event brings together industry leaders, innovators, and tech enthusiasts for three days of learning, networking, and inspiration. Each session is carefully curated to provide valuable insights into the latest technological trends and developments.',
    address: {
        city: 'San Francisco',
        country: 'United States'
    },
    pricing: {
        type: 'Paid',
        price: 200
    }
})

const handlePreviewEventFiles = (index) => {
    console.log(index)
    console.log(event.files[index]);

    preview = event.files[index]
    isOpen.value = true
    console.log(preview.value)
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>