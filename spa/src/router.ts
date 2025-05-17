import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/main/HomeView.vue";
import AboutView from "@/views/main/AboutView.vue";
import RegistrationView from "@/views/user/RegistrationView.vue";
import {useUserStore} from "@/store/UserStore.ts";
import LoginView from "@/views/user/LoginView.vue";

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/register', name: 'register', component: RegistrationView},
    { path: '/login', name: 'login', component: LoginView},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    const isAuthenticated = !!userStore.user
    console.log("Is Authenticated?", isAuthenticated);

    if (!isAuthenticated && (to.name !== 'login' && to.name !== 'register')) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router