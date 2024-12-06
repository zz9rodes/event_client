<template>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <div v-for="(image, index) in displayedImages" :key="index"
            class="relative overflow-hidden rounded-lg shadow-md aspect-square">
            <img :src="image.url" :alt="image.alt"
                class="object-cover w-full h-full transition-transform duration-300 hover:scale-110">
            <div v-if="index === displayedImages.length - 1 && remainingCount > 0"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                <span class="text-2xl font-bold text-white">+{{ remainingCount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => []
    },
    displayCount: {
        type: Number,
        default: 4
    }
});

const displayedImages = computed(() => {
    return props.images.slice(0, props.displayCount);
});

const remainingCount = computed(() => {
    return Math.max(0, props.images.length - props.displayCount);
});
</script>