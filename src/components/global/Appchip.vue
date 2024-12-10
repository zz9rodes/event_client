<template>
    <div class="w-full">
      <div class="flex flex-wrap items-center gap-2 p-2 border border-gray-300 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500">
        <div v-for="tag in tags" :key="tag" class="flex items-center bg-violet-100 text-violet-800 px-2 py-1">
          <span class="text-sm">{{ tag }}</span>
          <button @click="removeTag(tag)" class="ml-1 text-violet-600 hover:text-violet-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input
          v-model="newTag"
          @keydown.enter.prevent="addTag"
          @keydown.backspace="handleBackspace"
          type="text"
          placeholder="Add a tag..."
          class="flex-grow min-w-[120px] outline-none bg-transparent text-sm"
        />
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    },
    // maxTags: {
    //   type: Number,
    //   default: Infinity
    // }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const tags = ref(props.modelValue);
  const newTag = ref('');
  const error = ref('');
  
  watch(() => props.modelValue, (newValue) => {
    tags.value = newValue;
  });
  
  const addTag = () => {
    if (newTag.value.trim() && !tags.value.includes(newTag.value.trim())) {
      if (tags.value.length < props.maxTags) {
        tags.value.push(newTag.value.trim());
        emit('update:modelValue', tags.value);
        newTag.value = '';
        error.value = '';
      } else {
        error.value = `Maximum of ${props.maxTags} tags allowed.`;
      }
    }
  };
  
  const removeTag = (tag) => {
    const index = tags.value.indexOf(tag);
    if (index > -1) {
      tags.value.splice(index, 1);
      emit('update:modelValue', tags.value);
    }
    error.value = '';
  };
  
  const handleBackspace = (event) => {
    if (newTag.value === '' && tags.value.length > 0) {
      event.preventDefault();
      removeTag(tags.value[tags.value.length - 1]);
    }
  };
  </script>
  
  