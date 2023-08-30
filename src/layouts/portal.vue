<template>
    <div>
        <Loading />
        <div id="portal">
            <MobileLayout v-if="isMobile">
                <!-- Pass the slot content to the mobile layout -->
                <slot name="default"></slot> <!-- Use the same slot in the mobile layout -->
            </MobileLayout>

            <DesktopLayout v-if="!isMobile">
                <!-- Pass the slot content to the desktop layout -->
                <slot name="default"></slot> <!-- Use the same slot in the desktop layout -->
            </DesktopLayout>
        </div>
    </div>
</template>

<script setup>
import { isMobile } from 'mobile-device-detect';
import Loading from '../components/loading.vue';
import MobileLayout from '@/layouts/sub-layouts/mobile-layout.vue';
import DesktopLayout from '@/layouts/sub-layouts/desktop-layout.vue';
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
