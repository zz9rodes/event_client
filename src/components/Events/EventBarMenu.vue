<template>
    <div class="relative">
        <div class="overflow-x-auto scrollbar-hide">
            <div class="flex p-4 space-x-4 min-w-max">
                <AppLink :to="menu.route" :name="menu.name" v-for="menu in menus"
                    :key="menu.id" @click="selectMenu(menu)" :class="[
                        'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out',
                        selectedMenu === menu.id
                            ? 'bg-violet-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-600'
                    ]">
                    {{ menu.name }}
                </AppLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import AppLink from '../global/AppLink.vue';
const route = useRoute();
const router = useRouter();


console.log(route);



const menus = ref([
    { id: 1, disabled: false, name: 'Details', route: { 'name': "event-detail", params: { company_id: route.params.company_id, event_id: route.params.event_id } } },
    { id: 2, disabled: false, name: 'Subcriptions', route: { 'name': "event-subscribtions", params: { company_id: route.params.company_id, event_id: route.params.event_id } } },
    // { id: 3, disabled: true, name: 'Update', route: { 'name': "companies-admins", params: { company_id: route.params.company_id } } },
]
)
const selectedMenu = ref(null)

const selectMenu = (menu) => {
    console.log(menu, "\n\n")
    selectedMenu.value = menu.id
        router.push(menu.route)
    
}

selectMenu(menus.value[0])

</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>