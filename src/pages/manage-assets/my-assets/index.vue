<template>
    <DesktopMyAssetsHeader class="manage-assets-header">
        <NuxtLayout name="desktop-my-assets"></NuxtLayout>
    </DesktopMyAssetsHeader>
    <ConfigBar>
        <NuxtLayout name="config-bar"></NuxtLayout>
    </ConfigBar>
</template>

<script setup>
    import DesktopMyAssetsHeader from "@/components/header/manage-assets.vue";
    import ConfigBar from "@/components/header/config-bar.vue";

    definePageMeta({
        layout: "portal",
        category: "Manage Assets",
        title: "MY Assets",
        showInSidebar: true,
    });
</script>
