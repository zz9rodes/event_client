<template>

    <div class="flex items-center justify-center px-4 bg-white sm:px-6 lg:px-8 w-[95vw] sm:w-[70vw] p-2 rounded-md">

        <div class="w-full max-w-md space-y-8">
        
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="first-name" class="sr-only">First Name</label>
                        <input id="first-name" name="firstName" type="text" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="First Name" v-model="firstName" />
                    </div>
                    <div>
                        <label for="last-name" class="sr-only">Last Name</label>
                        <input id="last-name" name="lastName" type="text" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Last Name" v-model="lastName" />
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Email address" v-model="email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Password" v-model="password" />
                    </div>
                    <div>
                        <label for="phone" class="sr-only">Phone</label>
                        <input id="phone" name="phone" type="tel" autocomplete="tel" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Phone" v-model="phone" />
                    </div>
                    <div>
                        <label for="date-of-birth" class="sr-only">Date of Birth</label>
                        <input id="date-of-birth" name="dateOfBirth" type="date" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            v-model="dateOfBirth" />
                    </div>
                </div>

                <div>

                    <div class="flex items-center mt-1">
                        <label for="avatar" class="cursor-pointer border-violet-500 ">
                            <span class="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                <svg class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        </label>

                        <input type="file" id="avatar" name="avatar" accept="image/*"
                            class="hidden px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            @change="handleAvatarChange" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="w-5 h-5 text-violet-500 group-hover:text-violet-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path
                                    d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                        </span>
                        Update Account
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
import AppLink from '../global/AppLink.vue';

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const phone = ref('')
const dateOfBirth = ref('')
const avatar = ref(null)
const errorMessage = ref('')

const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        avatar.value = file
    }
}

const handleSubmit = () => {
    if (!firstName.value || !lastName.value || !email.value || !password.value || !phone.value || !dateOfBirth.value) {
        errorMessage.value = 'Please fill in all required fields.'
        return
    }   
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', sans-serif;
}
</style>