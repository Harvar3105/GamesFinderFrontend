import './assets/tailwind.css'

import { createApp } from 'vue';
import router from "./router";
import i18n from "./i18n/i18n";
import { createPinia } from 'pinia';
import App from "./App.vue";
import {useUserStore} from "@/store/UserStore.ts";

const app = createApp(App);
app.use(createPinia());
app.use(i18n);

(async () => {
    await useUserStore().init();
    app.use(router);
    await router.isReady();

    app.mount('#app')
})();

