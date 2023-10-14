<template>
    <main class="p-3 bg-color vh-100">
        <template v-if="isMobile">
            <MobileLoginLayout>
                <h1>Mobile</h1>
            </MobileLoginLayout>
        </template>
        <template v-else>
            <DesktopLoginLayout>
                <h1>Desktop</h1>
            </DesktopLoginLayout>
        </template>
    </main>
</template>

<script setup>
import { isMobile } from 'mobile-device-detect';

definePageMeta({ layout: 'auth/login' });
</script>
