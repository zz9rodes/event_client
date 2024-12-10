<template>
    <Toast />
    <div class="p-6 bg-white shadow-md">
        <h2 class="mb-6 text-2xl font-bold text-violet-600">Create New Company</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-violet-400">Company Name</label>
                <input id="name" v-model="company.name" type="text" required
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Enter company name" />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-violet-400">Company Description</label>
                <textarea id="description" v-model="company.description" rows="4"
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Describe your company..."></textarea>
            </div>

            <div>
                <label for="coverImage" class="block text-sm font-medium text-violet-400">Cover Image</label>
                <input id="coverImage" type="file" @change="handleFileUpload" accept="image/*"
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm" />
                <p v-if="company.coverImage" class="mt-2 text-sm text-gray-500">
                    Selected file: {{ company.coverImage.name }}
                </p>
            </div>

            <div v-if="company.coverImage" class="mt-4">
                <img :src="company.coverImage.url" alt="Cover Image Preview" class="object-cover w-full h-48 " />
            </div>

            <div>
                <button type="submit"
                    class="flex w-full px-4 py-2 text-sm font-medium text-white border border-transparent shadow-sm flexw-full bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    <span class="justify-center flex-[1] ">
                        Create Company
                    </span>
                    <AppSpinerLoader v-if="isLoader" />
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
// import Gallery from './Gallery.vue';
// import { removeFile } from '@/utils';
import Toast from 'primevue/toast';
import { AppwriteuploadFile } from '@/app_write/files';
import AppSpinerLoader from '../global/AppSpinerLoader.vue';
const company = reactive({
    name: '',
    description: '',
    coverImage: null
});


import { useToast } from "primevue/usetoast";
const toast = useToast();

const isLoader = ref(false)

const imagePreview = ref(null);

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const data = await AppwriteuploadFile(file)
    if (data.isCreate) {
        company.coverImage = file;

    }

};

const handleFileUpload = async (e) => {

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
            company.coverImage = newFile;

            toast.add({ severity: 'success', summary: 'Success', detail: data.message, life: 3000 });
        }
        else {
            toast.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
        }
    });

    await Promise.all(uploadPromises);
}

const handleSubmit = () => {
    // Here you would typically send the form data to your backend
    console.log('Company data:', {
        name: company.name,
        description: company.description,
        coverImage: company.coverImage
    });

    // Reset form after submission
    company = { name: '', description: '', coverImage: null };
    imagePreview.value = null;

    // You might want to show a success message or redirect the user here
    alert('Company created successfully!');
};
</script>

<style scoped>
/* No additional styles needed */
</style>
