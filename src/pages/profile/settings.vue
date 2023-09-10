<template>
    <div>
        <Menu :activePageIndex="0"></Menu>
        <hr class="m-1">
        <UserCard />
        <hr class="m-1">
        <ContactInfo />
        <hr class="m-1">
        <Addresses />
    </div>
</template>

<script setup>
import Menu from '@/components/profile/menu.vue';
import UserCard from '@/components/profile/settings/user-card.vue';
import ContactInfo from '@/components/profile/settings/contact-info.vue';
import Addresses from '@/components/profile/settings/addresses.vue';
definePageMeta({ layout: 'portal' });
</script>
