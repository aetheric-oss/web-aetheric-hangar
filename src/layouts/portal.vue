<template>
    <div>
        <Loading />
        <NuxtLayout :name="layout">
            <template #default>
                <slot name="default"></slot>
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup>
    import { isMobile } from "mobile-device-detect";
    import Loading from "../components/loading.vue";

    const layout = isMobile ? 'mobile-portal' : 'desktop-portal'
</script>

<style scoped lang="scss">
.nav-header {
    background-color: var(--bs-black);
    width: 100vw;
    padding: 5px 12px;
    margin: 0;

    display: grid;
    grid-template-rows: 1fr auto auto;
    grid-template-areas: "navbar-brand-logo notification-bell mobile-nav-close-btn";

    .navbar-brand {
        grid-area: navbar-brand-logo;
    }

    .notification-bell-container {
        grid-area: notification-bell;
        margin: auto 0;
    }

    .mobile-nav-close-btn {
        grid-area: mobile-nav-close-btn;
        margin: auto 0;
    }
}
</style>
