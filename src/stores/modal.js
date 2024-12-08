import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  function showModal() {
    isOpen.value=true
  }
  function closeModal() {
    isOpen.value=false
  }

  return { isOpen, showModal,closeModal }
})
