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
  import { ref } from 'vue'
  
  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'Health' },
    { id: 5, name: 'Business' },
    { id: 6, name: 'Entertainment' },
    { id: 7, name: 'Sports' },
    { id: 8, name: 'Politics' },
    { id: 9, name: 'Environment' },
    { id: 10, name: 'Education' },
    { id: 11, name: 'Education' },
    { id: 112, name: 'Education' },
    { id: 103, name: 'Education' },

  ]
  
  const selectedCategory = ref(1)
  
  const selectCategory = (category) => {
    selectedCategory.value = category.id
    // Vous pouvez ajouter ici la logique pour filtrer le contenu en fonction de la catégorie sélectionnée
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
  
  