<template>

  <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account

        </h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          Or
          <AppLink :to="{ name: 'register' }" name="Get An Account"
            class="font-medium text-violet-600 hover:text-violet-500" />
          <!-- <router-link >  </router-link> -->
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Email address" v-model="formData.email" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
              class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Password" v-model="formData.password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
              class="w-4 h-4 border-gray-300 rounded text-violet-600 focus:ring-violet-500" />
            <label for="remember-me" class="block ml-2 text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">

            <AppLink :to="{ name: 'send-mail' }" name=" Forgot your password?"
              class="font-medium text-violet-600 hover:text-violet-500" />
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
            Sign in
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
import { ref,reactive } from 'vue'
import AppLink from '../global/AppLink.vue';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useRouter } from 'vue-router';

const router=useRouter()
const modal=useModalStore()

const auth=useAuthStore()
const errorMessage = ref('')

const formData=reactive({
  email:"",
  password:""
})

const handleSubmit = async () => {
  modal.showModal()
  if (!formData.email || !formData.password) {
    modal.closeModal()
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  const data= await auth.login(formData)
  if(data?.valid){
    modal.closeModal()
    window.$toast('success', data.successMessage,data.successMessage);
    router.push({name:'account'})
  }
 
  modal.closeModal()
  return 
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
</style>