<template>
    <div class="relative">
      <div class="overflow-x-auto scrollbar-hide">
        <div class="flex p-4 space-x-4 min-w-max">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out',
              selectedCategory === category.id
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      <!-- <div class="absolute top-0 bottom-0 right-0 w-8 pointer-events-none bg-gradient-to-l "></div> -->
    </div>
  </template>
  
  <script setup>
  import { ref,defineProps } from 'vue'
  const props=defineProps({
    categories:{
      type:Array,
      required:false,
      default:[]
    }
  })
  
  
  const selectedCategory = ref(1)
  
  const selectCategory = (category) => {
    selectedCategory.value = category.id
    console.log('Selected category:', category.name)
  }
  </script>
  
  <style scoped>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  </style>
  
  