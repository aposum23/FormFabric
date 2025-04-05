import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';

import {
    Divider
} from "primevue";

const app = createApp(App);

app.component('Divider', Divider)

app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.mount('#app');
