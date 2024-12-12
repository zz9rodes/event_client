 <template>
    <div  class="container px-4 py-8 mx-auto">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div @click="HandlerFollowCompanies(company)" v-for="company in companies" :key="company.slug"
          class="overflow-hidden transition-transform duration-300 bg-white rounded-none shadow-lg cursor-pointer group hover:scale-105">
          <div class="relative h-64">
            <img :src="company?.cover" :alt="company.name" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div class="flex justify-between p-4 ">
            <h3 class="text-xl font-semibold text-gray-800">{{ company.name }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg"  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden lucide lucide-square-arrow-out-up-right group-hover:block"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
          </div>
        </div>
        <div
        @click="HandlerRouteChange"
        class="overflow-hidden transition-transform duration-300 bg-[#e5e7eb] rounded-none shadow-lg cursor-pointer group hover:scale-105 flex justify-center items-center"
      >
        <div class="flex justify-between p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps,defineEmits} from 'vue'
  import { useRouter } from 'vue-router';


const emit=defineEmits('create-companies')

const router=useRouter()

  const props=defineProps({
    companies:{
      type:Array,
      required:true,
      default:[]
    }
  })

  const HandlerFollowCompanies=(company)=>{
      router.push({name:"company",params:{company_id:company.slug}})
  }
  

  const HandlerRouteChange = () => {
    emit('create-company')
}
  

  </script>
  
  <style scoped>
  /* No additional styles needed */
  </style>
  
  
