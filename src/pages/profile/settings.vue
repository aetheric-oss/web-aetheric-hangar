<template>
    <div>
        <Menu :activePageIndex="0"></Menu>
        <hr class="m-1">
        <h3> Profile Settings </h3>
    </div>
</template>

<script setup>
import Menu from '@/components/profile/menu.vue';
definePageMeta({ layout: 'portal' });
</script>
