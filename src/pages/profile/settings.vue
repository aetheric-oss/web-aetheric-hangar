<template>
    <ProfileMenu :activePageIndex="0" />
    <hr class="m-1" />
    <ProfileSettingsUserCard />
    <hr class="m-1" />
    <ProfileSettingsContactInfo />
    <hr class="m-1" />
    <ProfileSettingsAddresses />
</template>

<script setup lang="ts">
    definePageMeta({ layout: "portal" });
</script>
