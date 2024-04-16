import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn && to.path !== "/login" && to.path !== "/demo" && from.path !== "/" && to.path !== "/" && to.path !== '/login/forgot-password' ) {
        return navigateTo("/");
    }
});
