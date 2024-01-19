<template>
    <!-- for loop over pages and make a accordion component for each dict object -->
    <div class="accordion" v-for="(category, index) in pages" :key="index">
        <PortalNavAccordionItem
            :id="index"
            :title="category.name"
            :icon="category.icon"
            :items="category.pages"
        />
    </div>
</template>
<script setup>
    const pagesStore = usePagesMenuStore();
    const pages = pagesStore.getCategories;
</script>

<style type="scss">

</style>
