import './assets/tailwind.css'

import { createApp } from 'vue';
import router from "./router";
import i18n from "./i18n/i18n";
import { createPinia } from 'pinia';
import App from "./App.vue";
import {useUserStore} from "@/store/UserStore.ts";

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(createPinia());

initData();
app.mount('#app');


function initData(){
    useUserStore().init();
}