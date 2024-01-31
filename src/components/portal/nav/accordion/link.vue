<template>
    <router-link
        :to="`/${title.toLowerCase()}`"
        class="accordion-button collapsed"
    >
        <img v-if="image" class="btn-icon pe-2" :src="image" />
        {{ title }}
    </router-link>
</template>

<script setup>
    const props = defineProps({
        image: String,
        title: String,
    });
</script>
