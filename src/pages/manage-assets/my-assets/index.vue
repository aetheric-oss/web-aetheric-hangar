<template>
    <DesktopMyAssetsHeader class="manage-assets-header">
    </DesktopMyAssetsHeader>
    <ConfigBar>
    </ConfigBar>
</template>

<script setup lang="ts">
    import DesktopMyAssetsHeader from "@/components/header/manage-assets.vue";
    import ConfigBar from "@/components/header/config-bar.vue";

    definePageMeta({
        layout: "portal",
        category: "Manage Assets",
        title: "MY Assets",
        showInSidebar: true,
    });
</script>
