<template>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <div v-for="(image, index) in displayedImages" :key="index"
            class="relative overflow-hidden rounded-lg shadow-md aspect-square">
            <img :src="image.url" :alt="image.alt"
                class="object-cover w-full h-full transition-transform duration-300 hover:scale-110">
            <button v-if="removable" type="button" @click="EventRemoveFile(index)" class="absolute top-0 right-0 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 p-1 text-white bg-red-500 rounded-full"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div v-if="index === displayedImages.length - 1 && remainingCount > 0"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <span class="text-2xl font-bold text-white">+{{ remainingCount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { removeFile } from '@/utils';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => []
    },
    displayCount: {
        type: Number,
        default: 4
    },
    removable: {
        type: Boolean,
        default: false
    }
});

const EventRemoveFile = (index) => {
    removeFile(props.images, index)
}

const displayedImages = computed(() => {
    return props.images.slice(0, props.displayCount);
});

const remainingCount = computed(() => {
    return Math.max(0, props.images.length - props.displayCount);
});
</script>