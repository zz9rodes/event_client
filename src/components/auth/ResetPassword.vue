<template>

  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Reset your Password
        </h2>

      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">New password</label>
            <input id="new-password" name="new-password" type="password" required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="New password" v-model="password" />
          </div>
          <div>
            <label for="password" class="sr-only">Confirm Password</label>
            <input id="confirm-password" name="confirm-password" type="password" required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="confirm-password" v-model="password" />
          </div>
        </div>


        <div>
          <button type="submit"
            class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-violet-500 group-hover:text-violet-400" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            Update
          </button>
        </div>
      </form>
      <div v-if="errorMessage" class="mt-4 text-sm text-center text-red-600">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleSubmit = () => {
  // Basic validation
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  console.log('Login attempt with:', { email: email.value, password: password.value })
  errorMessage.value = ''
  alert('Login successful! (This is a simulation)')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>