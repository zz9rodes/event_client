<template>
    <AppModal :is-open="isOpen" :is-loader="true" />
    <div class="flex justify-end px-8 mt-6 text-center">
        <button :disabled="!isSettingChange" @click="handleSubmit"
            :class="isSettingChange ? ' bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2' : ' bg-gray-200 '"
            class="px-6 py-2 text-white transition duration-300 ease-in-out rounded-md">
            Save
        </button>
    </div>
    <div class="px-8  rounded-xl">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-8 md:flex-row">
            <div class="w-full md:w-1/2">
                <div class="mb-4">
                    <label for="name" class="block mb-2 text-sm font-medium text-violet-700">Name</label>
                    <input type="text" id="name" v-model="formData.name"
                        class="w-full px-3 py-2 border rounded-md border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required />
                </div>
                <div class="mb-4">
                    <label for="description" class="block mb-2 text-sm font-medium text-violet-700">Description</label>
                    <textarea id="description" v-model="formData.description" rows="4"
                        class="w-full px-3 py-2 border rounded-md border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        required></textarea>
                </div>
            </div>

            <div class="w-full md:w-1/2">
                <div class="mb-4">
                    <label for="file" class="block mb-2 text-sm font-medium text-violet-700">Upload File</label>
                    <div
                        class="relative p-4 text-center transition duration-300 ease-in-out border-2 border-dashed rounded-lg cursor-pointer border-violet-400 hover:bg-violet-50">
                        <input type="file" id="file" @change="handleFileUpload"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                        <div v-if="!preview">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto text-violet-400"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p class="mt-1 text-sm text-violet-600">Click or drag file to upload</p>
                        </div>
                        <div v-else class="mt-2">
                            <img :src="preview" alt="Preview" class="h-auto max-w-full mx-auto rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </form>


    </div>
</template>

<script setup>
import { ref, reactive, defineProps, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { AppwriteuploadFile } from '@/app_write/files';
import AppModal from '@/components/global/AppModal.vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore()
const route = useRoute()

const props = defineProps({
    company: {
        type: reactive({
            name: '',
            description: '',
            cover: null
        }),
        required: true
    }
})


let formData = reactive({
    name: '',
    description: '',
    cover: null
})

formData = props.company

const isOpen = ref(false)
const preview = ref(null)
const isSettingChange = ref(false)


const handleSubmit = async () => {
    isOpen.value = true
    const company_id = route.params.company_id
    const data = await auth.api('PUT', `/company/update/${company_id}`, formData)
    if (data.valid) {
        window.$toast('success', data.successMessage, data.successMessage)
    }
    else {
        console.log(data)
    }

    console.log('Form submitted:', formData)
    isOpen.value = false
}
const handleFileUpload = async (e) => {

    isOpen.value = true

    const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
    const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
    const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

    const files = Array.from(e.target.files);

    const uploadPromises = files.map(async (file) => {
        const data = await AppwriteuploadFile(file);
        console.log(data);

        if (data.isCreate) {

            const newFile = {
                url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
                title: data.file.$id,
                type: data.file.mimeType
            };

            formData.cover = newFile.url;


            isOpen.value = false

            window.$toast('success', 'Success', data.message);
        }
        else {
            isOpen.value = false
            window.$toast('error', 'Error', data.message);
        }
    });

    await Promise.all(uploadPromises);
}

onMounted(() => [
    preview.value = formData.cover

])

watch(() => formData.cover, (newValue, oldValue) => {
    console.log(newValue);
    preview.value = newValue
    isSettingChange.value = true
});

watch(() => formData.name, (newValue, oldValue) => {
    console.log(newValue);

    isSettingChange.value = true
});

watch(() => formData.description, (newValue, oldValue) => {
    console.log(newValue);

    isSettingChange.value = true
});
</script>