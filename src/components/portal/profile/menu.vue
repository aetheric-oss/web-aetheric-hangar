<template>
    <header class="px-3">
        <h3>My Profile</h3>
        <div class="hstack gap-2 py-1">
            <button
                v-for="(item, index) in menuItems"
                class="btn btn-gray rounded-pill"
                :class="{ 'bg-body-tertiary': activePageIndex === index }"
                @click="menuClicked(index)"
            >
                {{ item.name }}
            </button>
        </div>
    </header>
    <!-------------------------->
    <hr class="my-2 my-md-3" />
    <!-------------------------->
</template>

<script setup lang="ts">
    const props = defineProps({
        menuItems: {
            type: Array<IMenuItem>,
            required: true,
        },
    });

    // Reactive vars
    const activePageIndex = ref(0);

    // Functions
    const menuClicked = (index: number) => {
        activePageIndex.value = index;

        // emit menu clicked event for potential listeners
        emit("menuClicked", index);
    };

    // Emits
    const emit = defineEmits<{
        (e: "menuClicked", value: number): void;
    }>();
</script>
