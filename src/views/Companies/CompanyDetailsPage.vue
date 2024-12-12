<template>
  <div>
    <CompanyHeaderDetails :company="settingData" />
    <CompaniesBarMenu :menus="menus"  @change-menu="HandlerChangeMenu"/>
    <div class="">
      <CompaniesSettings  :company="settingData" v-if="activeview=='Setting'"></CompaniesSettings>
      <ListCompaniesEvent :events="company.events" v-else-if="activeview=='Events'"></ListCompaniesEvent>
      <CompaniesAdmins :admins="company.admins" v-else-if="activeview=='Admin'"></CompaniesAdmins>
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import { ref, onMounted, reactive } from 'vue';
import CompanyHeaderDetails from '@/components/Companies/CompanyHeaderDetails.vue';
import CompaniesBarMenu from '@/components/Companies/CompaniesBarMenu.vue';

import CompaniesSettings from '@/components/Companies/CompaniesSettings.vue';
import CompaniesAdmins from '@/components/Companies/CompaniesAdmins.vue';
import ListCompaniesEvent from '@/components/Events/ListCompaniesEvent.vue';

import { useAuthStore } from '@/stores/auth';

const menus = ref([
  { id: 1, name: 'Setting' },
  { id: 2, name: 'Events' },
  { id: 3, name: 'Admin' },
])

const activeview=ref(menus.value[0].name)

const auth = useAuthStore()

const route = useRoute()

const company = ref(null)

const settingData=reactive({
  name:"",
  description:"",
  cover:null
})

onMounted(() => {
  LoadsCompaniesDetails()
})

const HandlerChangeMenu=(menu)=>{
  activeview.value=menu.name
  console.log(activeview.value);
  
}

const LoadsCompaniesDetails = async () => {
  console.log(route);

  const comapny_id = route.params.company_id
  const data = await auth.api('GET', `/company/${comapny_id}`)

  if (data.valid) {
    console.log(data);

    company.value = data.result
    settingData.name=company.value.name
    settingData.description=company.value.description
    settingData.cover=company.value.cover

    

  } else {
    console.log(data)
  }
}

</script>

<style></style>