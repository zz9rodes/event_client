   <template>
    <div class="container px-4 py-8 mx-auto">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">Upcoming Events</h2>
      <Drawer v-model:visible="visible" position="right" :showCloseIcon=false>
        <EventDetails :event="event" />
      </Drawer>
      <div class="flex flex-wrap -mx-2">
        <div @click="ShowEventDetails(event.id)" v-for="event in events" :key="event.id"
          class="w-full px-2 mb-4 cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div
            class="relative h-64 overflow-hidden transition-transform duration-300 rounded-lg shadow-lg hover:scale-105">
            <img :src="event.coverImage" :alt="event.name" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="text-xl font-semibold text-white">{{ event.name }}</h3>
              <p class="mt-1 text-sm text-gray-200">{{ event.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue'

import Drawer from 'primevue/drawer';
import EventDetails from './EventDetails.vue';
const visible = ref(false)

const events = ref([
  {
    id: 1,
    name: 'Tech Conference 2024',
    date: 'June 15-17, 2024',
    coverImage: 'https://i.pinimg.com/236x/a4/0a/16/a40a16f42e383613eb6ab7403a9a675b.jpg'
  },
  {
    id: 2,
    name: 'Music Festival',
    date: 'July 22-24, 2024',
    coverImage: 'https://i.pinimg.com/236x/ea/b5/87/eab587d1cbb485686f7f975e82111887.jpg'
  },
  {
    id: 3,
    name: 'Art Exhibition',
    date: 'August 5-10, 2024',
    coverImage: 'https://i.pinimg.com/236x/dd/2c/00/dd2c0054a8417cfeb9ce3c07d8b1b36c.jpg'
  },
  {
    id: 4,
    name: 'Food & Wine Expo',
    date: 'September 18-20, 2024',
    coverImage: 'https://i.pinimg.com/236x/bd/36/48/bd364824032c2d92cd5a39587435198c.jpg'
  },
  {
    id: 5,
    name: 'Sports Championship',
    date: 'October 1-5, 2024',
    coverImage: 'https://i.pinimg.com/236x/8e/8c/09/8e8c090b023114191e642071528acb33.jpg'
  },
  {
    id: 6,
    name: 'Business Summit',
    date: 'November 12-14, 2024',
    coverImage: 'https://i.pinimg.com/236x/06/30/e6/0630e63a37d7ef817f4705d1627bd89d.jpg'
  },
  {
    id: 7,
    name: 'Fashion Week',
    date: 'December 3-7, 2024',
    coverImage: 'https://i.pinimg.com/236x/13/8d/35/138d352e4b094971fbbd21a618cf6840.jpg'
  },
  {
    id: 8,
    name: 'Film Festival',
    date: 'January 15-20, 2025',
    coverImage: 'https://i.pinimg.com/236x/a1/dc/f9/a1dcf96639321998f5139f86c005ef9b.jpg'
  }
])


const event = ref(events.value[0])
const viewBox = ref(false)


const ShowEventDetails = (eventId) => {

  event.value = events.value.find(e => e.id == eventId)
  visible.value = true
  console.log(event.value);

  event.value = {
    id: 1,
    name: 'Tech Conference 2024',
    description: 'Join us for the most innovative tech conference of the year. Featuring keynote speakers from leading tech companies, hands-on workshops, and networking opportunities.',
    coverImage: 'https://i.pinimg.com/236x/8c/5e/5f/8c5e5fbc4405dac77c9a2f5bda6a246e.jpg',
    price: '$299',
    date: 'June 15-17, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Tech Convention Center, Silicon Valley, CA',
    files: [
      { id: 1, name: 'Conference Schedule.pdf', url: 'https://i.pinimg.com/236x/8c/5e/5f/8c5e5fbc4405dac77c9a2f5bda6a246e.jpg' },
      { id: 2, name: 'Speaker Bios.docx', url: 'https://i.pinimg.com/474x/ac/f2/40/acf2405b99f0a06f7e5fd70f1601bf77.jpg' },
      { id: 3, name: 'Venue Map.png', url: 'https://i.pinimg.com/236x/06/30/e6/0630e63a37d7ef817f4705d1627bd89d.jpg' },
      { id: 4, name: 'Venue Map.png', url: 'https://i.pinimg.com/236x/8c/5e/5f/8c5e5fbc4405dac77c9a2f5bda6a246e.jpg' },
      { id: 5, name: 'Venue Map.png', url: 'https://i.pinimg.com/236x/d4/37/0c/d4370cfb8a33ae5556fb9587996300f4.jpg' }
    ]
  }

}
console.log(event);

</script>

<style scoped>
.p-drawer {
  @apply w-96 !important
}
</style>

