<template>
    <div class="mb-2">
        <div class="d-grid gap-1 align-items-center py-1">
            <div v-if="label" class="form-label" :for="id">
                {{ label }}
            </div>
            <div
                class="form-control d-flex btn gap-1 rounded-pill align-items-center"
                @click="toggleDropdown"
            >
                <div class="px-1">
                    <slot name="left-icon"></slot>
                </div>
                <div
                    class="flex-grow-1 text-light"
                    v-html="selectedValue"
                ></div>
                <button type="button" class="btn btn-icon me-1" role="button">
                    <IconCaretDown size="1.5rem" v-show="!showDropdown" />
                    <IconCaretUp size="1.5rem" v-show="showDropdown" />
                </button>
            </div>
            <div
                class="form-control d-grid p-1 pt-2 rounded-3 shadow-lg"
                v-if="showDropdown"
            >
                <div
                    class="btn"
                    v-for="(value, key) in dropdownItems"
                    :key="key"
                    @click="updateValue(key as string)"
                >
                    {{ value }}
                </div>
            </div>
        </div>
        <div class="text-error" v-if="errorValue">{{ errorValue }}</div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        darkMode: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
        items: {
            type: Object as PropType<IDropdownValues>,
            required: true,
        },
    });

    // Reactive vars
    const inputValue = defineModel<string>("inputValue");
    const errorValue = defineModel<string>("errorValue");
    const showDropdown = ref(false);
    const dropdownItems = ref<IDropdownValues>(props.items);
    const selectedValue = computed<string>(() => {
        return inputValue.value
            ? dropdownItems.value[inputValue.value]
            : props.placeholder || "Select Value from the Dropdown"
    }
    );

    // Functions
    const updateValue = (key: string) => {
        inputValue.value = key;
        showDropdown.value = false;
    };
    const toggleDropdown = (event: any) => {
        event.preventDefault();
        showDropdown.value = !showDropdown.value;
    };
</script>

<style scoped lang="scss">
    div.selected-value {
        background-color: transparent;
    }
</style>
