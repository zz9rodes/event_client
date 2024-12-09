<template>
    <div class="relative">
      <!-- Cover Image -->
      <div class="w-full h-64 overflow-hidden md:h-80 lg:h-96">
        <img 
          :src="company.coverImage" 
          :alt="company.name + ' cover'" 
          class="object-cover w-full h-full"
        />
      </div>
      
      <!-- Company Name Overlay -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
        <div class="container px-4 py-6 mx-auto">
          <h1 class="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {{ company.name }}
          </h1>
          <p class="text-lg text-gray-200 md:text-xl">
            {{ company.description }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Sample company data
  const company = ref({
    name: 'TechInnovate Solutions',
    description: 'Pioneering the future of technology',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  });
  </script>
  
  <style scoped>
  /* No additional styles needed as we're using Tailwind CSS */
  </style>
  
  