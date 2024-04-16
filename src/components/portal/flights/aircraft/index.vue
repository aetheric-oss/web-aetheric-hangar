<template>
    <PortalContentBlock
        title="Flights"
        subtitle="Overview"
    >
        <nuxt-link
            class="btn btn-primary shadow align-self-end d-flex align-items-center"
            to="/flights/aircraft/schedule/1"
        >
            <IconPlus class="me-1"/> Plan Flight
        </nuxt-link>
    </PortalContentBlock>
</template>

<script setup lang="ts">
    const $api = useAethericApi(useCurrentCompany().value);
</script>
