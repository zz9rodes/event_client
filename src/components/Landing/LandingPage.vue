<template>
  <div class="min-h-screen text-gray-800 bg-gray-100">
    <header
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 backdrop-blur-sm"
    >
      <div class="flex items-center gap-4">
        <router-link :to="{ name: 'home' }">
          <img src="/logo.png" class="h-12" alt="" />
        </router-link>

        <router-link :to="{ name: 'events-list' }">
          <button
            class="hidden px-4 py-2 text-sm transition-colors rounded-full shadow-sm bg-violet-100 text-violet-700 hover:bg-violet-200 sm:inline-block"
          >
            Events
          </button>
        </router-link>
      </div>

      <!-- Desktop Menu -->
      <nav class="hidden gap-6 text-sm text-gray-600 sm:flex">
        <AppLink
          class="px-4 py-2 font-medium text-white transition transition-colors ease-in-out delay-150 rounded-full bg-violet-600/70 hover:bg-violet-600"
          name="Get
          Account"
          :to="{ name: 'register' }"
        />

        <AppLink
          class="px-4 py-2 font-medium transition-colors hover:text-violet-700"
          name="Login"
          :to="{ name: 'login' }"
        />
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="text-gray-600 transition-colors sm:hidden hover:text-violet-700"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </header>

    <!-- Mobile Menu -->
    <Transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        @click.self="toggleMobileMenu"
        class="fixed inset-0 z-40 pt-20 sm:hidden bg-bacdrop_modal bg-opacity-90 backdrop-blur-sm"
      >
        <nav class="flex flex-col gap-6 p-4 text-lg text-gray-600">
          <AppLink
            name="Get Account"
            class="px-4 py-2 font-medium text-white transition transition-colors ease-in-out delay-150 rounded-full bg-violet-600/70 hover:bg-violet-600"
            :to="{ name: 'register' }"
          />

          <AppLink
            name="Login"
            class="flex flex-col w-full px-4 py-2 text-sm transition-colors rounded-full shadow-sm bg-violet-100 text-violet-700 hover:bg-violet-200"
            :to="{ name: 'login' }"
          />
          <!-- <button
            class="flex flex-col w-full px-4 py-2 text-sm transition-colors rounded-full shadow-sm bg-violet-100 text-violet-700 hover:bg-violet-200"
          >
            Events
          </button> -->

          <router-link :to="{ name: 'events-list' }">
          <button
          class="flex flex-col w-full px-4 py-2 text-sm transition-colors rounded-full shadow-sm bg-violet-100 text-violet-700 hover:bg-violet-200"
          >
            Events
          </button>
        </router-link>
        </nav>
      </div>
    </Transition>

    <!-- Hero Section -->
    <section class="max-w-3xl py-20 mx-auto text-center">
      <div class="relative inline-block mt-5 mb-8">
        <img
          src="https://i.pinimg.com/474x/7b/35/d7/7b35d705acbf5f92cb94a20b2ce91f41.jpg"
          alt="Profile"
          class="w-20 h-20 border-4 rounded-full border-violet-200"
        />
        <span
          class="absolute -right-2 top-0 rotate-[-15deg] translate-x-10 cursor-pointer bg-violet-500 text-white px-2 py-1 rounded-full text-xs"
          >Follow Me</span
        >
      </div>

      <h1 class="mb-8 text-3xl font-bold text-gray-800 lg:text-5xl">
        Plan your <span class="text-violet-600">event in</span><br />
        one click!l <span class="text-violet-600">Sign up now!.</span>
      </h1>
      <router-link :to="{ name: 'register' }">
        <button
          class="inline-flex items-center gap-2 px-8 py-3 text-white transition-colors rounded-full bg-violet-600 hover:bg-violet-700"
        >
          Get Started
          <span class="px-2 py-1 text-xs rounded-full bg-violet-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up-right"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </span>
        </button>
      </router-link>
    </section>

    <!-- <section class="max-w-4xl py-2 mx-auto flex items-center justify-center flex-col">
      <Caroussel />
    </section> -->

    <!-- Services Section -->
    <section class="max-w-4xl py-20 mx-auto">
      <h2 class="mb-12 text-3xl font-bold text-center">
        Collaborate with <span class="text-violet-600">brands and agencies</span
        ><br />
        to create impactful <span class="text-violet-600">results.</span>
      </h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="p-6 text-center transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
        >
          <div class="flex justify-center mb-4">
            <span class="text-2xl font-semibold text-violet-500">icon</span>
          </div>
          <h3 class="mb-2 text-lg font-bold text-gray-800">
            {{ service.title }}
          </h3>
          <p class="text-sm text-gray-600">{{ service.description }}</p>
        </div>
      </div>
    </section>
    <!-- <Timeline class="my-" /> -->
    <section
      class="py-20 mx-4 text-center text-white rounded-lg bg-gradient-to-br from-violet-500 to-purple-600"
    >
      <div class="flex justify-center mb-4">
        <span class="text-2xl font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </span>
      </div>
      <h2 class="mb-8 text-xl font-bold md:text-2xl lg:text-4xl">
        Tell me about your Favorite<br />
        Categrogies
      </h2>

      <div class="flex justify-center h-10 gap-4 lg:h-14">
        <button
          class="px-3 py-1 text-sm font-semibold transition-colors bg-white rounded-full text-violet-700 lg:px-8 lg:py-3 hover:bg-gray-100"
        >
          Email Me
        </button>
        <button
          class="px-3 py-1 text-sm transition-colors border-2 border-white rounded-full lg:px-8 lg:py-3 hover:bg-white hover:text-violet-700"
        >
          Go To Votes
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="flex items-center justify-between py-6 mt-12 text-sm text-gray-600 border-t border-gray-200"
    >
      <span>© 2024 All rights reserved.</span>
      <div class="flex gap-6">
        <a href="#" class="transition-colors hover:text-violet-700">LinkedIn</a>
        <a href="#" class="transition-colors hover:text-violet-700">Dribbble</a>
        <a href="#" class="transition-colors hover:text-violet-700"
          >Instagram</a
        >
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Caroussel from "@/components/global/Caroussel.vue";
import AppLink from "../global/AppLink.vue";

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const services = [
  {
    title: "UX & UI",
    description:
      "Designing interfaces that are intuitive, efficient and enjoyable to use",
  },
  {
    title: "Web & Mobile App",
    description:
      "Transforming ideas into exceptional web and mobile app experiences",
  },
  {
    title: "Design & Creative",
    description:
      "Crafting visually stunning designs that connect with your audience",
  },
  {
    title: "Development",
    description:
      "Bringing your vision to life with the latest technology and design trends",
  },
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}
</style>