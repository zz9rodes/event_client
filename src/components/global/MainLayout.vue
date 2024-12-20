<template>
  <div class="flex flex-col h-screen bg-gray-100 sm:flex-row">
    <!-- Sidebar for smaller screens -->
    <div :class="[
      'hidden m-2 rounded-2xl relative sm:block transition-all duration-300 ease-in-out  bg-white border-r border-gray-200',
      isExpanded ? 'w-44' : 'w-16',
    ]">
      <!-- Toggle Button -->
      <button class="flex items-center justify-between w-full p-2 rounded-2xl hover:bg-gray-50">
        <img :src="logoImage" :class="[isExpanded ? 'size-12' : 'size-8']" alt="" @click.self="router.push({name:'account'})" />
        <svg @click="toggleSidebar" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-chevrons-left-right h-6 w-6 absolute left-full translate-x-[-50%] text-violet-600">
          <path d="m9 7-5 5 5 5" />
          <path d="m15 7 5 5-5 5" />
        </svg>
      </button>

      <!-- Navigation Menu -->
      <nav class="px-2 mt-5">
        <div class="space-y-1">
          <SidebarItem @click.prevent="RouteChangeEvent(item)" v-for="item in navItems" :key="item.name" :item="item"
            :is-expanded="isExpanded" :is-active="isActive(item.name)" />
        </div>
      </nav>

      <!-- User Profile Section -->
      <div @click="toggleUserMenu" class="absolute bottom-0 w-full border-t border-gray-200 cursor-pointer">
        <div class="flex items-center px-2 py-3 hover:bg-violet-50"
          :class="isExpanded ? 'justify-start' : 'justify-center'">
          <img class="w-8 h-8 rounded-full"
            :src="currrentUser.avatarUrl" alt="User avatar" />
          <div :class="[
            'ml-3 transition-all duration-300',
            isExpanded
              ? 'opacity-100 w-auto'
              : 'opacity-0 w-0 overflow-hidden',
          ]">
            <p class="text-sm font-medium text-gray-700 truncate">{{ auth.user.firstName  }}</p>
            <p class="text-xs text-gray-500">View Profile</p>
          </div>
        </div>
      </div>
    </div>



    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <main class="relative flex-1 m-2 overflow-x-hidden overflow-y-auto bg-gray-100 pb-14 sm:pb-0">
        <AppGoback class="absolute top-0 left-0 z-30"/>
        <RouterView class=" mt-9" />
      </main>

      <!-- Mobile Navigation Bar -->
      <nav class="fixed bottom-0 left-0 right-0 px-2 bg-white border-t border-gray-200 sm:hidden z-[460]">
        <div class="flex items-center justify-around h-16 gap-1">
          <SidebarItem @click.prevent="RouteChangeEvent(item)" v-for="item in navItems" :key="item.name" :item="item"
            :is-expanded="false" :is-active="isActive(item.name)" class="flex-1" />
          <button @click="toggleUserMenu()" class="flex flex-col items-center justify-center flex-1">
            <img class="w-6 h-6 rounded-full"
              :src="currrentUser.avatarUrl" alt="User avatar" />
            <span class="mt-1 text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile User Menu -->
    <Transition name="fade">
      <div v-if="isUserMenuOpen" @click.self="toggleUserMenu()"
        class="fixed inset-0 bg-bacdrop_modal bg-opacity-90 backdrop-blur z-[470] ">
        <div class="absolute right-0 p-4 mx-2 bg-white rounded-t-lg top-5">
          <div class="flex justify-between">
            <div class="flex items-center mb-4">
              <img class="w-10 h-10 mr-3 rounded-full"
                :src="currrentUser.avatarUrl" alt="User avatar" />
              <div>
                <p class="text-sm font-medium text-gray-700">{{currrentUser.firstName}} {{currrentUser.lastName}}</p>
                <p class="text-xs text-gray-500">{{ currrentUser.email}}</p>
              </div>
            </div>
            <span @click="RouteChangeEvent(navItems[3])">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="cursor-pointer lucide lucide-circle-arrow-out-up-right">
                <path d="M22 12A10 10 0 1 1 12 2" />
                <path d="M22 2 12 12" />
                <path d="M16 2h6v6" />
              </svg>
            </span>
          </div>

          <button @click="logout"
            class="w-full px-4 py-2 text-white transition-colors rounded-md bg-violet-600 hover:bg-violet-700">
            Log out
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import SidebarItem from "./SidebarItem.vue";
import logoImage from '@/assets/logo.png'
import { navItems } from './NavItem'
import { RouterView, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppGoback from "./AppGoback.vue";


const auth=useAuthStore()

const router = useRouter()

const isExpanded = ref(true);
const currentRoute = ref("events");
const currrentUser=auth.user
const isUserMenuOpen = ref(false);


const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const isActive = (route) => {
  return currentRoute.value === route;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const logout = async () => {
  // isUserMenuOpen.value = false;
  await auth.logout()
  router.push('/auth/login')
};

const updateDimensions = () => {
  if (window.innerWidth > 640) {
    isUserMenuOpen.value = false;
  }
};

const RouteChangeEvent = (item) => {
  isUserMenuOpen.value = false;
  currentRoute.value = item.name
  router.push(item.route)
}

onMounted(() => {
  window.addEventListener("resize", updateDimensions);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateDimensions);
});
</script>



<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}
</style>
