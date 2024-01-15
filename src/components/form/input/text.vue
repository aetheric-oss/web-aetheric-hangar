<template>
    <label class="form-label" :for="id">{{ label }}</label>
    <div class="input-box d-flex mb-2">
        <div class="btn-icon ps-1">
            <slot name="icon-left"></slot>
        </div>
        <input
            class="form-control flex-grow-1"
            :id="id"
            :type="type"
            v-model="modelValue"
            @input="(input) => $emit('update:modelValue', input.target.value)"
            :placeholder="placeholder"
        />
        <div class="btn-icon pe-1">
            <slot name="icon-right"></slot>
        </div>
        <div class="text-error" v-if="errorValue">{{ errorValue }}</div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        placeholder: {
            type: String,
            required: true,
        },
        errorValue: {
            type: String,
            required: false,
        },
    });
    const emit = defineEmits(["update:modelValue", "update:errorValue"]);

    // Computed vars
    const modelValue = computed({
        get: () => props.modelValue,
        set: (value) => emit("update:modelValue", value),
    });
    const errorValue = computed({
        get: () => props.errorValue,
        set: (value) => emit("update:errorValue", value),
    });
</script>
