<template>
  <div v-if="events.length > 0" class="container px-4 py-8 mx-auto">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <div v-for="event in events" :key="event.slug"
      @click="HandlerRouteChange({ name: 'event', params: { company_id: route.params.company_id,event_id:event.slug } })"
        class="overflow-hidden transition-transform duration-300 bg-white rounded-none shadow-lg cursor-pointer group hover:scale-105">
        <div class="relative h-64">
          <img :src="event.files[0].url" :alt="event.name" class="object-cover w-full h-full" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div class="flex justify-between p-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ event.name }}</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="hidden lucide lucide-square-arrow-out-up-right group-hover:block">
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
          </svg>
        </div>
      </div>
      <div @click="HandlerRouteChange({ name: 'create-event', params: { company_id: route.params.company_id } })"
        class="overflow-hidden transition-transform duration-300 bg-[#e5e7eb] rounded-none shadow-lg cursor-pointer group hover:scale-105 flex justify-center items-center">
        <div class="flex justify-between p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-plus">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </div>
    </div>
    <div></div>
  </div>
  <EmptyEvent v-else></EmptyEvent>
</template>

<script setup>
import { ref, defineProps } from "vue";
import EmptyEvent from "./EmptyEvent.vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()


const HandlerRouteChange = (goto) => {
  router.push(goto)
}


const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
});
// const events = ref([
//   {
//     id: 1,
//     name: 'Tech Conference 2024',
//     description: 'June 15-17, 2024',
//     coverImage: 'https://i.pinimg.com/236x/a4/0a/16/a40a16f42e383613eb6ab7403a9a675b.jpg'
//   },
//   {
//     id: 2,
//     name: 'Music Festival',
//     description: 'July 22-24, 2024',
//     coverImage: 'https://i.pinimg.com/236x/ea/b5/87/eab587d1cbb485686f7f975e82111887.jpg'
//   },
//   {
//     id: 3,
//     name: 'Art Exhibition',
//     description: 'August 5-10, 2024',
//     coverImage: 'https://i.pinimg.com/236x/dd/2c/00/dd2c0054a8417cfeb9ce3c07d8b1b36c.jpg'
//   },
//   {
//     id: 4,
//     name: 'Food & Wine Expo',
//     description: 'September 18-20, 2024',
//     coverImage: 'https://i.pinimg.com/236x/bd/36/48/bd364824032c2d92cd5a39587435198c.jpg'
//   },
//   {
//     id: 5,
//     name: 'Sports Championship',
//     description: 'October 1-5, 2024',
//     coverImage: 'https://i.pinimg.com/236x/8e/8c/09/8e8c090b023114191e642071528acb33.jpg'
//   }
// ])
//
</script>

<style scoped>
/* No additional styles needed */
</style>
