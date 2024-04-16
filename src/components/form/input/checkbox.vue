<template>
    <div class="d-flex">
        <div class="form-check form-switch">
            <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="id"
                :checked="inputValue"
                v-model="inputValue"
            />
            <label class="form-check-label" :for="id">{{ label }}</label>
        </div>

        <div class="text-error" v-if="errorValue">{{ errorValue }}</div>
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
    });

    // Reactive vars
    const inputValue = defineModel("inputValue", { default: false });
    const errorValue = defineModel("errorValue");
</script>
