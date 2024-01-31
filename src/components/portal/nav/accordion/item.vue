<template>
    <div class="accordion-item">
        <PortalNavAccordionButton :id="id" :image="'/icons/' + image + '.svg'" :title="title" v-if="isNested"/>
        <PortalNavAccordionLink :image="'/icons/' + image + '.svg'" :title="title" v-else/>
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
        image: String,
        title: String,
        items: Array,
    });
    const isNested = props.items.length !== 0;
</script>
