// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import { Appwritelogin } from './app_write/files';



import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';

async function initApp() {
    await Appwritelogin();
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(ToastService);


app.mount('#app')
initApp()


// await Appwritelogin()

