<template>
    <button
        class="btn d-flex align-items-center text-uppercase"
        data-bs-toggle="offcanvas"
        :data-bs-target="'#' + target"
        :aria-controls="target"
    >
        <img class="btn-icon rounded-pill me-2" :src="image" />
        <div class="flex-grow-1 text-start">
            <div class="text-muted fw-semibold" v-if="titleHeading">
                {{ titleHeading }}
            </div>
            {{ title }}
        </div>
        <component :is="icon" size="1.5rem"></component>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps({
        image: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        titleHeading: String,
        title: {
            type: String,
            required: true,
        },
        target: String,
    });
</script>
