<template>
    <div class="mb-2">
        <div class="inputs input-2-icon d-grid gap-1 align-items-center py-1">
            <div v-if="label" class="form-label input__label" :for="id">
                {{ label }}
            </div>
            <div
                class="input__div w-100 d-flex gap-1 rounded-pill align-items-center dropdown"
            >
                <div class="px-1">
                    <slot name="left-icon"></slot>
                </div>
                <div
                    class="selected-value form-control input__field w-100 text-light border-0 lh-1"
                >
                    {{ selectedValue }}
                </div>
                <button
                    type="button"
                    class="btn btn-icon pe-1"
                    @click="toggleDropdown"
                    role="button"
                >
                    <IconCaretDown size="1.5rem" v-show="!showDropdown" />
                    <IconCaretUp size="1.5rem" v-show="showDropdown" />
                </button>
            </div>
            <div class="input__dropdown p-1 pt-2" v-show="showDropdown">
                <div
                    class="input__dropdown__item fs-6"
                    v-for="(item, index) in items"
                    :key="index"
                    @click="selectItem(index)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="input__error" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
    import { computed } from "vue";
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
        type: {
            type: String,
            required: true,
        },
        inputValue: {
            type: Object,
            required: true,
            default: () => ({}),
        },
        placeholder: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: false,
        },
        items: {
            type: Array,
            required: true,
        },
    });
    const emit = defineEmits(["dropdownInput"]);
    let inputValueObj = ref(props.inputValue || {});
    const items = ref(props.items);
    const showDropdown = ref(false);
    const toggleDropdown = (event) => {
        event.preventDefault();
        showDropdown.value = !showDropdown.value;
    };
    let selectedValue = computed(() => {
        if (!inputValueObj.value)
            return props.placeholder || "Select Value from the Dropdown";
        const selectedItem = items.value.find(
            (item) => item.value === inputValueObj.value.value
        );
        return selectedItem
            ? selectedItem.name
            : props.placeholder || "Select Value from the Dropdown";
    });
    let selectItem = (index) => {
        inputValueObj.value = items.value[index];
        emit("dropdownInput", items.value[index]);
        showDropdown.value = false;
    };
</script>

<style scoped lang="scss">
    div.selected-value {
        background-color: transparent;
    }
</style>
