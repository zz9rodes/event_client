<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Cover Image -->
    <div class="relative h-64 overflow-hidden md:h-96">
      <img
        :src="event.files[0].url"
        :alt="event.name"
        class="object-cover w-full h-full rounded-[20px]"
      />
      <h1
        class="absolute text-3xl font-bold text-white cursor-pointer bottom-4 left-4 md:text-4xl"
      >
        {{ event.name }}
      </h1>
    </div>

    <div class="p-2">
      <Gallery :images="event.files" />
    </div>

    <div class="container px-2 py-8 mx-auto">
      <!-- Event Details -->
      <div class="mb-8">
        <h2 class="mb-4 text-2xl font-semibold text-gray-800">Event Details</h2>
        <p class="text-gray-600">{{ event.description }}</p>
      </div>
      <!-- Date and Time -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Date and Time</h3>
        <div class="flex flex-wrap justify-between gap-2">
          <div class="p-2 text-white rounded-md bg-violet-600">
            {{ moment(event.dateTime).format("MMM Do YY") }}
          </div>
          <div class="p-2 text-white rounded-md bg-violet-600">
            {{ moment(event.dateTime).format("LTS") }}
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Location</h3>
        <p class="text-gray-600 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-map-pinned"
          >
            <path
              d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"
            />
            <circle cx="12" cy="8" r="2" />
            <path
              d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"
            />
          </svg>
          {{ event.address }}
        </p>
      </div>

      <!-- Price -->
      <div class="mb-8">
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Price</h3>
        <div class="flex flex-wrap items-start justify-between gap-2">
          <p class="text-2xl font-bold text-violet-600 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-bitcoin"
            >
              <path
                d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"
              />
            </svg>
            {{ event.price }}
          </p>
          <button
            :disabled="!icanSubscribe"
            @click="HandleSubsribeToEvent()"
            :class="icanSubscribe ? ' bg-violet-600' : ' bg-violet-100'"
            class="p-2 text-white rounded-md"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
import Gallery from "../global/Gallery.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const router = useRouter();
const auth = useAuthStore();

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const icanSubscribe = ref(true);

const CheckSubscribtion = async (event_id) => {
  const data = await auth.api("GET", `/susbscribers/event/${event_id}/check`);

  if (data.valid) {
    icanSubscribe.value = !data.result;
  } else {
    console.log(data);
  }
};

const HandleSubsribeToEvent = async () => {
  // const event_id=props.event.slug
  const payload = {
    event_id: props.event.slug,
  };
  const data = await auth.api("POST", `/susbscribers/create`, payload);

  if (data.valid) {
    console.log(data);
    window.$toast(
      "success",
      "Success",
      "Your Are Suscribe to this Events",
      5000
    );
    router.push({ name: "subscribtions" });
  } else {
    console.log(data);
  }
};

onMounted(() => {
  CheckSubscribtion(props.event.slug);
});
</script>

<style scoped></style>