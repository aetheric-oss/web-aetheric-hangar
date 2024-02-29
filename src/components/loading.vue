<template>
    <div v-if="loading" class="bg-dark vw-100 vh-100 position-absolute">
        <div
            class="loading-spinner position-absolute top-50 start-50 translate-middle"
        ></div>
    </div>
</template>

<script setup lang="ts">
    const nuxtApp = useNuxtApp();
    const loading = ref(true);

    nuxtApp.hook("page:start", () => {
        loading.value = true;
    });
    nuxtApp.hook("page:finish", () => {
        loading.value = false;
    });
</script>

<style scoped lang="scss">
    .loading-spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--bs-primary);
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
        margin: 20px auto;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
