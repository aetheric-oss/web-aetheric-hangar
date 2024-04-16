<template>
    <div class="d-flex flex-column flex-grow-1">
        <h1 class="px-3 py-2 text-uppercase d-flex align-items-center">
            <span class="fw-bold pe-2">Flights</span>
            <span class="fw-light flex-grow-1">Overview</span>
            <nuxt-link
                class="btn btn-primary shadow align-self-center"
                to="/flights/aircraft/schedule"
            >
                <IconPlus /> Plan Flight
            </nuxt-link>
        </h1>
        <article class="px-2 flex-grow-1">
        </article>
        <footer data-bs-theme="dark" class="d-flex align-self-bottom px-2 rounded-top">
        </footer>
    </div>
</template>

<script setup lang="ts">
    const $api = useAethericApi(useCurrentCompany());
</script>
