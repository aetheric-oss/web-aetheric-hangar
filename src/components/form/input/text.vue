<template>
    <div>
        <label class="form-label" :for="id">{{ label }}</label>
        <div class="input-box d-flex mb-2">
            <div class="btn-icon ps-1">
                <slot name="icon-left"></slot>
            </div>
            <input
                class="form-control flex-grow-1"
                :id="id"
                :type="type"
                v-model.trim.lazy="inputValue"
                :placeholder="placeholder"
            />
            <div class="btn-icon pe-1">
                <slot name="icon-right"></slot>
            </div>
            <div class="text-error" v-if="errorValue">{{ errorValue }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
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
        placeholder: {
            type: String,
            required: true,
        },
    });

    // Reactive vars
    const inputValue = defineModel("inputValue", { default: "" });
    const errorValue = defineModel("errorValue");
</script>
