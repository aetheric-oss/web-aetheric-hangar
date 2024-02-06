<template>
    <button
        class="btn btn-icon"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#' + target"
        :aria-controls="target">
        <component :is="icon" size="1.5rem"></component>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        icon: {
            type: String,
            required: true,
        },
        target: String
    });
</script>
