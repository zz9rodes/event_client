<template>
    <Toast />
    <AppModal :is-loader="true" :is-open="isOpen"></AppModal>
    <div class="p-6 bg-white shadow-md rounded-xl">
        <h2 class="mb-6 text-2xl font-bold text-violet-600">Create New Post</h2>
        <form @submit.prevent="HandleCreateNewCompanies" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-violet-400">Post Title</label>
                <input id="name" v-model="formData.title" type="text" required
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Enter company name" />
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-violet-400">Post Description</label>
                <textarea id="description" v-model="formData.description" rows="4"
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Describe your Post..."></textarea>
            </div>

            <div>
                <label for="cover" class="block text-sm font-medium text-violet-400">Post Image</label>
                <input id="cover" multiple type="file" @change="handleFileUpload" accept="image/*"
                    class="relative block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm" />
              
            </div>

            <div v-if="formData.files.length>0" class="mt-4">
                <Gallery :images="formData.files" :removable="true" :display-count="3" ></Gallery>
            </div>

            <div>
                <button type="submit"
                    class="flex w-full px-4 py-2 text-sm font-medium text-white border border-transparent shadow-sm flexw-full bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                    <span class="justify-center flex-[1] ">
                        Save Post
                    </span>
                    <AppSpinerLoader v-if="isLoader" />
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref ,defineEmits} from 'vue';
import Toast from 'primevue/toast';
import { AppwriteuploadFile } from '@/app_write/files';
import AppSpinerLoader from '../global/AppSpinerLoader.vue';
import Gallery from '../global/Gallery.vue';
import AppModal from '../global/AppModal.vue';
import { useAuthStore } from '@/stores/auth';
import { useToast } from "primevue/usetoast";
import { useRoute } from 'vue-router';
const emit=defineEmits(['close-modal'])
const auth = useAuthStore()
let formData = reactive({
    title: '',
    description: '',
    files:[
       
    ] 
});


const route=useRoute()
const toast = useToast();

const isLoader = ref(false)

const isOpen=ref(false)



const handleFileUpload = async (e) => {
    isOpen.value=true
    const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
    const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
    const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

    const files = Array.from(e.target.files);

    // Envoi des fichiers en parallèle
    if(files.length>3){
        window.$toast('error','Number of files exceeded',"You Can jsut use 3 Files")
    }
    else{
        const uploadPromises = files.map(async (file) => {
        const data = await AppwriteuploadFile(file);
        console.log(data);

        if (data.isCreate) {

            const newFile = {
                url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
                title: data.file.$id,
                type: data.file.mimeType
            };

            formData.files.push(newFile)

            toast.add({ severity: 'success', summary: 'Success', detail: data.message, life: 3000 });
        }
        else {
            toast.add({ severity: 'error', summary: 'Error', detail: data.message, life: 3000 });
        }
    });

    await Promise.all(uploadPromises);
    }
  
    isOpen.value=false
}



const HandleCreateNewCompanies = async () => {
    const event_id=route.params.event_id
    const data = await auth.api('POST',`/event/${event_id}/post/create`, formData)
    if (data.valid) {
        console.log("\n\n ICI \n\n")
        formData=null
        window.$toast('success', data.successMessage,data.successMessage);
        window.location.reload()
    }
    else if(data.status!==422) {
        console.log(data);
    }

    emit('close-modal')
}
</script>

<style scoped>        
/* No additional styles needed */
</style>
