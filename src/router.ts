import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "./views/main/HomeView.vue";
import AboutView from "./views/main/AboutView.vue";
import RegistrationView from "@/views/user/RegistrationView.vue";

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/register', name: 'register', component: RegistrationView},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router