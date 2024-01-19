<template>
    <div class="accordion-item">
        <PortalNavAccordionButton :id="id" :icon="'/icons/' + icon + '.svg'" :title="title" v-if="isNested"/>
        <PortalNavAccordionLink :icon="'/icons/' + icon + '.svg'" :title="title" v-else/>
        <div
            :id="`flush-collapse${id}`"
            class="accordion-collapse collapse"
            v-if="isNested"
        >
            <div class="accordion-body">
                <span v-for="(item, index) in items" :key="index">
                    <router-link
                        :to="item.path"
                        class="nav-link accordion-text"
                    >
                        {{ item.name }}
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: Number,
        icon: String,
        title: String,
        items: Array,
    });
    const isNested = props.items.length !== 0;
</script>

<style scoped lang="scss">
</style>
