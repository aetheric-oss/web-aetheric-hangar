<template>
    <div>
        <ProfileMenu :activePageIndex="0"/>
        <hr class="m-1">
        <ProfileSettingsUserCard />
        <hr class="m-1">
        <ProfileSettingsContactInfo />
        <hr class="m-1">
        <ProfileSettingsAddresses />
    </div>
</template>

<script setup>
definePageMeta({ layout: 'portal' });
</script>
