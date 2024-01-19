<template>
    <router-link
        :to="`/${title.toLowerCase()}`"
        class="accordion-button collapsed"
    >
        <img class="btn-img pe-2" :src="icon" />
        {{ title }}
    </router-link>
</template>

<script setup>
    const props = defineProps({
        icon: String,
        title: String,
    });
</script>
