   <template>
    <div class="flex items-center justify-end p-4 space-x-4">
      <div class="relative">
        <input
          type="text"
          name="search"
          id="search"
          class="w-full py-2 pl-10 pr-3 text-sm leading-5 placeholder-gray-500 transition duration-150 ease-in-out border border-gray-300 rounded-full sm:w-64 bg-gray-50 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:bg-white"
          placeholder="Search..."
          v-model="searchQuery"
          @input="handleSearch"
        >
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <button
        @click="handleNotificationClick"
        class="relative p-2 text-gray-400 transition duration-150 ease-in-out rounded-full hover:text-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
      >
        <span class="sr-only">View notifications</span>
        <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span v-if="notificationCount > 0" class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 -mt-1 -mr-1 text-xs font-bold text-white bg-red-500 rounded-full">
          {{ notificationCount }}
        </span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const searchQuery = ref('')
  const notificationCount = ref(3) 
  
  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchQuery.value)
  }
  
  const handleNotificationClick = () => {
    // Implement notification click functionality here
    console.log('Notification clicked')
  }
  </script>
  
  