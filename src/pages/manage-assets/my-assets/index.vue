<template>
    <div>
        <DesktopMyAssetsHeader class="manage-assets-header">
            <NuxtLayout name="desktop-my-assets"></NuxtLayout>
        </DesktopMyAssetsHeader>
        <ConfigBar>
            <NuxtLayout name="config-bar"></NuxtLayout>
        </ConfigBar>
    </div>
</template>

<script setup>
import DesktopMyAssetsHeader from '~/layouts/header/manage-assets.vue';
import ConfigBar from '~/layouts/config-bar.vue';

definePageMeta({
    layout: 'portal',
    category: 'Manage Assets',
    title: 'MY Assets',
    showInSidebar: true
});

</script>
