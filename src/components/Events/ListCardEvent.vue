   <template>
    <div class="container px-4 py-8 mx-auto">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">Upcoming Events</h2>
      <Drawer v-model:visible="visible" position="right" :showCloseIcon=false>
        <EventDetails :event="event" />
      </Drawer>
      <div class="flex flex-wrap -mx-2">
        <div @click="ShowEventDetails(event.slug)" v-for="event in events" :key="event.slug"
          class="w-full px-2 mb-4 cursor-pointer sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
          <div
            class="relative h-64 overflow-hidden transition-transform duration-300 rounded-lg shadow-lg hover:scale-105">
            <img :src="event?.files[0]?.url" :alt="event.name" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <h3 class="text-xl font-semibold text-white">{{ event.name }}</h3>
              <p class="mt-1 text-sm text-gray-200">{{ moment(event.dateTime).format("MMM Do YY") }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref,defineProps } from 'vue'
import moment from 'moment';
import Drawer from 'primevue/drawer';
import EventDetails from './EventDetails.vue';
const visible = ref(false)

const props=defineProps({
  events:{
    type:Array,
    required:true
  }
})


const event = ref(props.events[0])
const viewBox = ref(false)


const ShowEventDetails = (eventId) => {

  event.value = props.events.find(e => e.slug == eventId)
  visible.value = true
  console.log(event.value);
}
console.log(event);

</script>

<style scoped>
.p-drawer {
  @apply w-96 !important
}
</style>

