<template>
  <div class="min-h-full p-6 bg-white">
    <div class="mx-auto max-w-7xl">
      <div class="p-8">
        <div class="flex items-start justify-between mb-8">
          <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
          <button
            @click.prevent="isOpen = true"
            class="px-4 py-2 text-white transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
          >
            <span class="hidden sm:block">Edit Profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-user-pen sm:hidden"
            >
              <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
              <path
                d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
              />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="space-y-8 lg:col-span-2">
            <div class="flex flex-col items-start gap-6 md:flex-row">
              <img
                :src="profile?.avatarUrl"
                :alt="profile.name"
                class="object-cover w-32 h-32 rounded-xl"
              />
              <div class="space-y-4">
                <div>
                  <h2 class="text-2xl font-semibold text-gray-900">
                    {{ profile.firstName }}
                  </h2>
                  <p class="text-gray-500">{{ profile.lastName }}</p>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Contact Details</h3>
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div class="space-y-2">
                  <p class="text-sm text-gray-500">EMAIL ADDRESS</p>
                  <p class="text-gray-900">{{ profile.email }}</p>
                </div>
                <div class="space-y-2">
                  <p class="text-sm text-gray-500">PHONE NUMBER</p>
                  <p class="text-gray-900">{{ profile.phoneNumber }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 class="py-5 text-3xl">My Companies</h1>
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <div
            v-for="company in profile.company"
            :key="company.slug"
            class="overflow-hidden transition-transform duration-300 bg-white rounded-none shadow-lg cursor-pointer group hover:scale-105"
          >
            <div class="relative h-64">
              <img
                :src="company?.cover"
                :alt="company.name"
                class="object-cover w-full h-full"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              ></div>
            </div>
            <div class="flex justify-between p-4">
              <h3 class="text-xl font-semibold text-gray-800">
                {{ company.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppModal @close-modal="isOpen = false" :is-loader="false" :is-open="isOpen">
    <UpdateAccount></UpdateAccount>
  </AppModal>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AppModal from "./AppModal.vue";
import UpdateAccount from "../auth/UpdateAccount.vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const isOpen = ref(false);

const profile = ref({
  name: "John Doe",
  location: "San Francisco, CA",
  avatar:
    "https://i.pinimg.com/236x/50/e3/0e/50e30ea061634f6d46d13a156770771f.jpg",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",

  experience: [
    {
      year: "2021",
      title: "Sr. Real Estate Agent",
      company: "Agency X Real Trust",
      location: "San Francisco, CA",
    },
    {
      year: "2020",
      title: "Sales Agent",
      company: "Agency Y Real Time",
      location: "San Francisco, CA",
    },
    {
      year: "2019",
      title: "Jr. Sales Agent",
      company: "Agency Z First Trust",
      location: "San Francisco, CA",
    },
  ],
  reviews: [
    {
      name: "Alice Johnson",
      avatar:
        "https://i.pinimg.com/236x/ee/b0/e1/eeb0e16706c9c0275f4a0a7cd43a71b7.jpg",
      comment:
        "John is extremely professional and responsive. He helped me find my dream home in record time!",
      rating: 5,
    },
    {
      name: "Bob Smith",
      avatar:
        "https://i.pinimg.com/736x/6c/f9/6d/6cf96d942064d49fea2871fe926b81cc.jpg",
      comment:
        "Outstanding service and attention to detail. Highly recommended!",
      rating: 5,
    },
  ],
});

onMounted(async () => {
  await LoadsCurrentUserInfo();
});

const LoadsCurrentUserInfo = async () => {
  const data = await auth.api("GET", "/auth/me");

  if (data.valid) {
    console.log(data);
    profile.value = data.result;
  } else {
    console.log(data);
  }
};
</script>