<template>
    <div class="vstack overflow-y-auto overflow-x-hidden my-2 px-2">
        <h1 v-if="title || subtitle" class="py-2 text-uppercase d-flex align-items-center">
            <span class="fw-bold pe-1">{{ title }}</span>
            <span class="fw-light flex-grow-1">{{ subtitle }}</span>
        </h1>
        <article class="d-flex flex-column p-2 px-lg-0">
            <div class="alert alert-danger" v-show="error">{{ error }}</div>
            <slot></slot>
        </article>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: false,
        },
        subtitle: {
            type: String,
            required: false,
        },
    });
    const error = defineModel("error");
</script>
