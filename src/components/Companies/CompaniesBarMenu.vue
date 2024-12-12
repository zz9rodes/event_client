<template>
  <div class="relative">
    <div class="overflow-x-auto scrollbar-hide">
      <div class="flex p-4 space-x-4 min-w-max">
        <div v-for="menu in menus" :key="menu.id" @click="selectMenu(menu)" :class="[
          'px-4 py-2 text-sm font-medium cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
          selectedMenu === menu.id
            ? 'bg-violet-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600'
        ]">
          {{ menu.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  menus: {
    type: Array,
    required: true,
    default: false
  }
})

const emit = defineEmits(['change-menu'])




const selectedMenu = ref(props.menus[0].id)

const selectMenu = (menu) => {
  selectedMenu.value = menu.id
  emit('change-menu', menu)
}

// selectMenu(menus.value[0])

</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>