<template>
    <div class="mb-2">
        <div class="inputs input-2-icon d-grid gap-1 align-items-center py-1">
            <div v-if="label" class="form-label input__label" :for="id">{{ label }}</div>
            <div class="input__div d-flex gap-1 rounded-pill align-items-center ">
                <div class="px-1">
                    <slot name="left-icon"></slot>
                </div>
                <input class="form-control input__field w-100 text-light"
                    :id="id"
                    :type="type"
                    v-model="inputValueObj"
                    @input="(input) => $emit('input', input.target.value)"
                    :placeholder="placeholder"
                />
                <div class="ms-auto px-1">
                    <slot name="right-icon"></slot>
                </div>
            </div>
        </div>
        <div class="input__error" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    inputValue: {
        type: String,
        required: true,
        default: ''
    },
    placeholder: {
        type: String,
        required: true,
    },
    error: {
        type: String,
        required: false
    }
});
const emit = defineEmits(['input']);
const inputValueObj = ref(props.inputValue);
</script>
