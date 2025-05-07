import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import i18n from "./i18n/i18n";
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(createPinia());

app.mount('#app');
