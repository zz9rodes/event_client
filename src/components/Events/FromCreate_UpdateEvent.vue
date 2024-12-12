<template>
    <div class="grid justify-center min-h-screen px-4 bg-gray-100 sm:px-6 lg:px-8">
        <div class="inline-flex items-center justify-between w-full px-8 py-6 2xl:w-5/6">
            <h1 class="text-xl font-bold md:text-3xl text-violet-600">Build New Event

            </h1>
            <div @click="submitEvent">
                <button class="p-2 px-4 text-white rounded-md bg-violet-600">Save</button>
            </div>
        </div>
        <div class="p-8 2xl:w-5/6">
            <form @submit.prevent="submitEvent" class="space-y-8">
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2 ">
                    <div class="space-y-6">
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Event Name</label>
                            <input id="title" v-model="event.name" type="text" required
                                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Enter event Name" />
                        </div>

                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Event
                                Description</label>
                            <textarea id="description" v-model="event.description" rows="4"
                                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Describe your event..."></textarea>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                                <input id="datee" v-model="event.date_time" type="date" :min="nowDate" required
                                    class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm" />
                            </div>
                            <div>
                                <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
                                <input id="time" v-model="event.duration" type="time" required
                                    class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                            <input id="location" disabled v-model="event.address" type="text" required
                                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Event Location" />
                        </div>

                    </div>

                    <div class="space-y-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">Event Categories</label>
                            <div class="space-y-2">
                                <label v-for="category in categories" :key="category"
                                    class="inline-flex items-center mr-4">
                                    <input type="checkbox" :value="category.id" v-model="event.categories"
                                        class="w-5 h-5 form-checkbox text-violet-600" />
                                    <span class="ml-2 text-gray-700">{{ category.name }}</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-700">Pricing</label>
                            <div class="space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="event.pricing" value="free"
                                        class="w-5 h-5 cursor-pointer form-radio radio checked:bg-violet-600 text-violet-600" />
                                    <span class="ml-2 text-gray-700">Free</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="event.pricing" value="paid"
                                        class="w-5 h-5 cursor-pointer form-radio radio checked:bg-violet-600 text-violet-600" />
                                    <span class="ml-2 text-gray-700">Paid</span>
                                </label>
                            </div>
                        </div>

                        <div v-if="event.pricing === 'paid'">
                            <label for="price" class="block text-sm font-medium text-gray-700">Price (Fr)</label>
                            <div class="relative mt-1 rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <span class="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input id="price" v-model="event.price" type="number" min="0" step="0.01" required
                                    class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="0.00" />
                            </div>
                        </div>

                        <div>
                            <label for="location" class="block text-sm font-medium text-gray-700">places</label>
                            <input id="location" v-model="event.places" type="number" required
                                class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Event Location" />
                        </div>

                        <div>
                            <label for="file-upload" class="block mb-2 text-sm font-medium text-gray-700">
                                Event Files
                            </label>

                            <div class="flex items-center justify-center w-full">
                                <label for="file-upload"
                                    class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-none cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-400"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500">
                                            <span class="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                    </div>
                                    <input id="file-upload" type="file" accept="image/* , video/mp4" class="hidden"
                                        @change="handleFileUpload" multiple maxlength="2" />
                                </label>
                            </div>
                        </div>

                        <div v-if="event.files.length > 0" class="mt-4">
                            <h3 class="mb-2 text-lg font-medium text-gray-900">Attached Files:</h3>
                            <Gallery :images="event.files" :removable="true" />
                        </div>
                    </div>
                </div>
                <WordMap @setmarker="HandleSetmarker" :marker="markePosition" />
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import WordMap from '../global/WordMap.vue';
import Gallery from '../global/Gallery.vue';
import { AppwriteuploadFile } from '@/app_write/files';
import { useModalStore } from '@/stores/modal';
import { formatDateToYYYYMMDD } from '@/utils';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { hasEmptyFields } from '@/utils';

const route = useRoute()
const router=useRouter()

const modal = useModalStore()

const auth = useAuthStore()


const categories = [{ id: 1, name: 'Music' }, { id: 2, name: 'Sports' }, { id: 3, name: 'Technology' }, { id: 4, name: 'Art' }, { id: 5, name: 'Food' }]
const markePosition = null

const nowDate = formatDateToYYYYMMDD()


const event = reactive({
    name: '',
    description: '',
    date_time: '',
    active: true,
    duration: '',
    address: '',
    location: {
        lat: '',
        lon: ''
    },
    categories: [],
    pricing: 'free',
    places: 0,
    price: 0,
    files: []
})

const HandleSetmarker = (data) => {
    console.log(data);

    event.location.lat = data.lat
    event.location.lon = data.lng
    event.address = data.name
}


const handleFileUpload = async (e) => {
    modal.showModal();  // Ouvrir le modal

    const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
    const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
    const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

    const files = Array.from(e.target.files);

    // Envoi des fichiers en parallèle
    const uploadPromises = files.map(async (file) => {
        const data = await AppwriteuploadFile(file);
        console.log(data);

        if (data.isCreate) {

            const newFile = {
                url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
                title: data.file.$id,
                type: data.file.mimeType
            };
            event.files.push(newFile);
            window.$toast('success', 'Success', data.message);
        }
        else {
            window.$toast('error', 'Error', data.message);
        }
    });

    // Attendre que tous les uploads soient terminés
    await Promise.all(uploadPromises);

    modal.closeModal();  // Fermer le modal après les uploads
}


const submitEvent = async () => {
    const isempty = hasEmptyFields(event)
    if (!isempty) {
        modal.showModal()

        const data = await auth.api('POST', `/company/${route.params.company_id}/event/create`, event)

        if (data.valid) {
            window.$toast('success', data.successMessage, data.successMessage)
            router.push({name:'company',params:{company_id:route.params.company_id}})
        }
        else {
            console.log(data)
        }

        modal.closeModal()
    }
    else{
        window.$toast('error', "Veiller remplir tout les champ", "error",5000)
    }

}
</script>
