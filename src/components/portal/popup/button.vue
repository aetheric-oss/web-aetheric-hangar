<template>
    <button
        class="btn d-flex align-items-center text-uppercase"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#' + target"
        :aria-controls="target">
        <div class="flex-grow-1 text-start">
            <div class="text-muted fw-semibold" v-if="titleHeading">{{ titleHeading }}</div>
            {{ title }}
        </div>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        titleHeading: String,
        title: {
            type: String,
            required: true,
        },
        target: String
    });
</script>
