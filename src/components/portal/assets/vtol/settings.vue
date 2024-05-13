<template>
    <div data-bs-theme="dark" class="rounded p-2" v-if="menu">
        <div class="d-flex m">
            <span class="text-muted ml-1 mt-1">Manage assets</span>
            <div class="btn btn-icon"><IconClose
                class="pe-auto text-white pt-1"
                size="1.5rem"
                @click="closeMenu"
            /></div>
        </div>
        <ul class="list-unstyled pe-auto">
            <li
                v-for="(item, index) in menuItems"
                :key="index"
                class="mt-1"
                :class="{
                    'text-danger': item === 'Archive',
                    'text-white': item !== 'Archive',
                }"
                @click="setClickedItem(index)"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        menu: {
            type: Boolean,
            required: true,
        },
    });

    const clickedIndex = ref<number | null>(null);
    const menuItems = [
        "Edit",
        "Adjust flight",
        "Book flight",
        "Maintenance",
        "Archive",
    ];
    const emit = defineEmits(["closeMenu"]);

    const closeMenu = () => {
        emit("closeMenu", false);
    };

    const setClickedItem = (index: number) => {
        clickedIndex.value = index;
    };
</script>
