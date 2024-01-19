<template>
    <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#flush-collapse${id}`"
        aria-expanded="false"
        :aria-controls="`flush-collapse${id}`"
    >
        <img class="btn-img pe-2" :src="icon" />
        {{ title }}
    </button>
</template>

<script setup>
    const props = defineProps({
        id: Number,
        icon: String,
        title: String,
    });
</script>
