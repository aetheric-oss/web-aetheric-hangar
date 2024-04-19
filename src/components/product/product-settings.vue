<template>
    <div class="rounded bg-dark settings p-2" v-if="menu">
        <div class="d-flex justify-content">
            <p class="text-gray ml-1 mt-1">Manage assets</p>
            <PhX class="pe-auto text-white pt-1" size="1.5rem" @click="closeMenu"/>
        </div>
        <ul class="list-unstyled pe-auto settings-list">
            <li v-for="(item, index) in menuItems" :key="index"
                class="mt-1"
                :class="{ 'text-danger': clickedIndex === index, 'text-white': clickedIndex !== index }"
                @click="setClickedItem(index)">
            {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue';

const props = defineProps({
    menu: {
        type: Boolean,
        required: true
    }
});

const clickedIndex = ref<number | null>(null);
const menuItems = ['Edit', 'Adjust flight', 'Book flight', 'Maintenance', 'Archive']
const emit = defineEmits(["closeMenu"]);

const closeMenu = () => {
    emit("closeMenu", false);
};

const setClickedItem = (index: number) => {
    clickedIndex.value = index;
}


</script>

<style scoped lang="scss">

    .settings {
    background: #090F29;
    opacity: 1;
    }

    .settings-list li{
        text-transform: none !important;
        font-weight: normal !important;
        font-family: 'Poppins' !important;
    }


</style>
