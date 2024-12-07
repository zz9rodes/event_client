<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Cover Image -->
    <div class="relative h-64 overflow-hidden md:h-96">
      <img :src="event.coverImage" :alt="event.name" class="object-cover w-full h-full rounded-[20px]" />
      <h1 class="absolute text-3xl font-bold text-white cursor-pointer bottom-4 left-4 md:text-4xl">{{ event.name }}
      </h1>
    </div>

    <div class="p-2">
      <Gallery :images="event.files" />

    </div>

    <div class="container px-2 py-8 mx-auto">
      <!-- Event Details -->
      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Event Details</h2>
        <p class="text-gray-600">{{ event.description }}</p>
      </div>
      <!-- Date and Time -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Date and Time</h3>
        <div class="flex flex-wrap justify-between gap-2">
          <div class="p-2 text-white rounded-md bg-violet-600">{{ event.date }} </div>
          <div class="p-2 text-white rounded-md bg-violet-600">{{ event.time }}</div>
        </div>

      </div>

      <!-- Location -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Location</h3>
        <p class="text-gray-600">{{ event.location }}</p>
      </div>

      <!-- Price -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Price</h3>
        <div class="flex flex-wrap items-start justify-between gap-2">
          <p class="text-2xl font-bold text-violet-600">{{ event.price }}</p>

          <button class="p-2 text-white rounded-md bg-violet-600">
            Join Now
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Gallery from '../global/Gallery.vue';
const props = defineProps({
  event: {
    type: Object,
    Required: true
  }
})

</script>

<style scoped></style>