import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/store/UserStore.ts";

const routes = [
    { path: '/', name: 'home', component: import("@/views/main/HomeView.vue") },
    { path: '/about', name: 'about', component: import("@/views/main/AboutView.vue") },
    { path: '/register', name: 'register', component: import("@/views/user/RegistrationView.vue")},
    { path: '/login', name: 'login', component: import("@/views/user/LoginView.vue")},
    { path: '/profile', name: 'profile', component: import("@/views/user/UserProfileView.vue")},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    const isAuthenticated = userStore.isAuthenticated();
    console.log("Is Authenticated?", isAuthenticated);

    if (!isAuthenticated && (to.name !== 'login' && to.name !== 'register')) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router