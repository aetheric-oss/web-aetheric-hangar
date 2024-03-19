<template>
    <div class="mb-2">
        <div class="d-grid gap-1 align-items-center py-1">
            <div v-if="label" class="form-label" :for="id">
                {{ label }}
            </div>
            <div class="dropdown">
                <button
                    class="btn btn-gray w-100 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <slot name="left-icon"></slot>
                    <span
                        class="text-light"
                        v-html="selectedValue"
                    ></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark w-100">
                    <li
                        v-for="(value, key) in dropdownItems"
                        :key="key"
                        @click="updateValue(key as string)"
                    >
                        <a class="dropdown-item text-center" href="#">{{ value }}</a>
                    </li>
                </ul>
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
            : props.placeholder || "Select Value from the Dropdown";
    });

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
