<template>
    <div>
        <Menu :activePageIndex="2"></Menu>
        <hr class="m-1">
        <h3> Profile Payment </h3>
    </div>
</template>

<script setup>
import Menu from '@/components/profile/menu.vue';
definePageMeta({ layout: 'portal' });
</script>
