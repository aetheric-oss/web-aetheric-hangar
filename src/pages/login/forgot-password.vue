<template>
    <main class="bg-color p-3 vh-100">
        <template v-if="isMobile">
            <MobileLoginLayout>
                <NuxtLayout name="mobile-forgot-password"></NuxtLayout>
            </MobileLoginLayout>
        </template>
        <template v-else>
            <DesktopLoginLayout class="bg-color">
                <NuxtLayout name="desktop-forgot-password"></NuxtLayout>
            </DesktopLoginLayout>
        </template>
    </main>
</template>

<script setup>
import { isMobile } from 'mobile-device-detect';
import MobileLoginBackground from '@/assets/icons/login/mobile-login-background.svg';
import MobileLoginLayout from '~/layouts/auth/mobile-forgot-password.vue';
import DesktopLoginLayout from '~/layouts/auth/desktop-forgot-password.vue';
definePageMeta({ layout: 'auth/login' });
</script>
