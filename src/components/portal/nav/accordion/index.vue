<template>
    <!-- for loop over pages and make a accordion component for each dict object -->
    <div class="accordion d-grid gap-0 gap-lg-2">
        <PortalNavAccordionItem
            v-for="(category, index) in pages"
            :key="index"
            :id="index"
            :title="category.name"
            :image="category.icon"
            :items="category.pages"
        />
    </div>
</template>

<script setup lang="ts">
    import { usePagesMenuStore } from "~/store/pages";

    const pagesStore = usePagesMenuStore();
    const pages = pagesStore.getCategories;
</script>
