
   <template>
    <div class="container max-w-4xl mx-auto my-8 overflow-hidden bg-white rounded-lg shadow-lg">
      <div class="flex flex-col post-details">
        <div class="flex items-center justify-between p-2">
          <h1 class="text-3xl font-bold capitalize text-violet-600">{{ post.title }}</h1>
          <span class="">
            {{ moment(post.create_at).format('LL')}}
          </span>
        </div>
  
        <div class="relative h-48">
          <div class="flex h-full transition-transform duration-500 ease-in-out carousel-inner" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(file, index) in post.files" :key="index" class="flex justify-center flex-shrink-0 w-full">
              <img :src="file.url" :alt="`post file ${index + 1}`" class="object-cover w-full h-auto">
            </div>
          </div>
          <a v-if="post.files.length > 1" href="#" class="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 left-4" @click.prevent="prevSlide">&lt;</a>
          <a v-if="post.files.length > 1" href="#" class="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full top-1/2 right-4" @click.prevent="nextSlide">&gt;</a>
        </div>
  
        <div class="p-2">
          <p class="mb-4 leading-relaxed text-gray-700">{{ post.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in post.tags" :key="tag" class="px-3 py-1 text-sm rounded-full bg-violet-100 text-violet-600">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import moment from 'moment';
  
  const props = defineProps({
    post: {
      type: Object,
      required: true,
      validator: (post) => {
        return post.title && post.date && post.location && post.description && 
               post.price && Array.isArray(post.tags) && Array.isArray(post.files);
      }
    }
  });
  
  const currentSlide = ref(0);
  const totalSlides = ref(0);
  
  onMounted(() => {
    totalSlides.value = props.post.files.length;
  });
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value;
  };
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value;
  };
  </script>
  
  