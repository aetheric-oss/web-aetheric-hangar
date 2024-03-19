<template>
    <header class="px-3">
        <div class="hstack mb-3 gap-2 py-1">
            <div>
                <span>Manage assets </span>
            </div>
            <IconCaretRight size="1.5rem" />
            <div>
                <span>My assets </span>
            </div>
            <IconCaretRight size="1.5rem" />
            <div>
                <span>
                    {{ menuItems[activePageIndex].name }}
                </span>
            </div>
        </div>
        <div class="hstack gap-2 justify-content-center py-1">
            <button
                v-for="(item, index) in menuItems"
                class="btn rounded-pill"
                :class="{
                    'bg-body-tertiary': activePageIndex === index,
                    'text-body-tertiary': activePageIndex === index,
                    'btn-light': activePageIndex !== index,
                }"
                @click="menuClicked(index)"
            >
                {{ item.name }}
            </button>
        </div>
    </header>
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
