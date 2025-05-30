import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/store/user-store.ts";

export const routeNames = {
    home: "Home",
    about: "About",
    login: "Login",
    register: "Register",
    profile: "Profile",
}

const routes = [
    { path: '/', name: routeNames.home, component: import("@/views/main/HomeView.vue") },
    { path: '/about', name: routeNames.about, component: import("@/views/main/AboutView.vue") },
    { path: '/register', name: routeNames.register, component: import("@/views/user/RegistrationView.vue")},
    { path: '/login', name: routeNames.login, component: import("@/views/user/LoginView.vue")},
    { path: '/profile', name: routeNames.profile, component: import("@/views/user/UserProfileView.vue")},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    const isAuthenticated = userStore.isAuthenticated();
    console.log("Is Authenticated?", isAuthenticated);

    if (!isAuthenticated && (to.name !== routeNames.login && to.name !== routeNames.register)) {
        next({ name: routeNames.login })
    } else {
        next()
    }
})

export default router