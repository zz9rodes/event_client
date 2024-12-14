<template>
<!-- <Toast/> -->
    <div class="flex items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8">

        <div class="w-full max-w-md space-y-8">
            <div>
                <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
                    Create your account
                </h2>
                <p class="mt-2 text-sm text-center text-gray-600">
                    Or

                    <AppLink class="font-medium text-violet-600 hover:text-violet-500"
                        name="sign in to your existing account" :to="{ name: 'login' }" />
                </p>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="first-name" class="sr-only">First Name</label>
                        <input id="first-name" name="firstName" type="text" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="First Name" v-model="formData.firstName" />
                    </div>
                    <div>
                        <label for="last-name" class="sr-only">Last Name</label>
                        <input id="last-name" name="lastName" type="text" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Last Name" v-model="formData.lastName" />
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Email address" v-model="formData.email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Password" minlength="9" v-model="formData.password" />
                    </div>
                    <div>
                        <label for="phone" class="sr-only">Phone</label>
                        <input id="phone" name="phone" type="tel" autocomplete="tel" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            placeholder="Phone" v-model="formData.phoneNumber" />
                    </div>
                    <div>
                        <label for="date-of-birth" class="sr-only">Date of Birth</label>
                        <input id="date-of-birth" name="dateOfBirth" type="date" required
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                        v-model="formData.dob" />
                    </div>
                    <!-- <div>
                        <label for="adress-location" class="sr-only">Adress Location</label>
                        <input id="adress-location" name="Adress" type="text" placeholder="Adress" required
                            class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                            v-model="formData.address" />
                    </div> -->
                </div>

                <div>

                    <div class="flex items-center justify-between mt-1">
                        <label for="avatar" class="cursor-pointer ">
                            <span class="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                                <img v-if="formData.avatar != null" :src="formData.avatar" alt="" class="w-full h-full ">

                                <svg v-else class="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </span>
                        </label>

                        <input  type="file" id="avatar" name="avatar" accept="image/*"
                            class="hidden px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            @change="handleFileUpload" />

                            <span class="flex items-center" v-if="!isAllowsLocation">
                                <p class="text-sm ">
                                    use your location ? 
                                </p>
                                <input type="checkbox" v-model="allowsLocation" @change="getGeolocation"
                            class="toggle toggle-violet-600 checked:text-violet-600" />
                    
                            </span>
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
                        Register
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
import { ref,onMounted, reactive } from 'vue'
import AppLink from '../global/AppLink.vue';
import { hasEmptyFields } from '@/utils';
import { AppwriteuploadFile } from '@/app_write/files';
import { useModalStore } from '@/stores/modal';
import { Toast } from 'primevue';
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
// import AppModal from '../global/AppModal.vue';
const router=useRouter()
const auth=useAuthStore()
const toast = useToast()

const formData = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    dob: '',
    avatarUrl: "https://i.pinimg.com/736x/4a/26/cd/4a26cdcd5cbd89187dd280d8eff0a9d3.jpg",
    address: '',
    location:{
        lat:"0",
        long:"0"
    }
});
const isAllowsLocation=ref(false)
const errorMessage = ref('')

const modal = useModalStore()


const handleFileUpload = async (e) => {
    modal.showModal();  

    const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
    const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
    const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

    const files = Array.from(e.target.files);

    const uploadPromises = files.map(async (file) => {
        const data = await AppwriteuploadFile(file);

        if (data.isCreate) {

            const newFile = {
                url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
                title: data.file.$id,
                type: data.file.mimeType
            };
            formData.avatarUrl = newFile.url;
            toast.add({ severity: 'success', summary: 'Success', detail: data.message, life: 3000 });
        }
        else {
            toast.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
        }
    });

    await Promise.all(uploadPromises);

    modal.closeModal(); 
}

const handleSubmit =  async () => {
    modal.showModal()
    if((!formData.address || formData.address=='') && (formData.location.lat!=0 || formData.location.long!=0)){
      await   fetchLocationInfo(formData.location.lat,formData.location.long)
    }
    if (hasEmptyFields(formData)) {
        modal.closeModal()
        errorMessage.value = 'Please fill in all required fields.'
        return
    }
    const data= await auth.register(formData)
    if(data?.status==201){
        modal.closeModal()
        window.$toast('success', data.successMessage,data.successMessage);
        router.push({name:'login'})
    }
    
    modal.closeModal()
}


async function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                isAllowsLocation.value=true
                formData.location.lat = `${position.coords.latitude}`;
               formData.location.long = `${position.coords.longitude}`;
                console.log(`Latitude: ${formData.location.lat}, Longitude: ${formData.location.long}`);
                return location;
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.error("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error("An unknown error occurred.");
                        break;
                }
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

async function fetchLocationInfo(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      formData.address=data.display_name || 'Unknown location'
    } catch (error) {
      console.error('Error fetching location data:', error);
     return error
    }
  }

onMounted(() => {
  getGeolocation();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', sans-serif;
}
</style>