import './assets/tailwind.css'

import {createApp} from 'vue';
import router from "./router.ts";
import i18n from "./i18n/i18n.ts";
import { createPinia } from 'pinia';
import App from "./App.vue";
import {useUserStore} from "./store/user-store.ts";
import {handleError} from "./utils/error-handler.ts";

const app = createApp(App);
app.use(createPinia());
app.use(i18n);

app.config.errorHandler = (err, instance, info) => {
    handleError(err, `Vue error (${info})`);
};

(async () => {
    await useUserStore().init();
    app.use(router);
    await router.isReady();

    app.mount('#app')
})();

