<template>
    <PortalContentBlock title="Vertiports" subtitle="Overview">
    </PortalContentBlock>
</template>

<script setup lang="ts">
    const $api = useAethericApi(useCurrentCompany().value);
</script>
