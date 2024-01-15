<template>
    <label class="form-label" :for="id">Password</label>
    <div class="input-box d-flex mb-2">
        <div class="btn-icon ps-1">
            <slot name="icon-left"></slot>
        </div>
        <input
            class="form-control flex-grow-1"
            :id="id"
            :type="showPassword ? 'text' : 'password'"
            v-model="modelValue"
            @input="(input) => $emit('update:modelValue', input.target.value)"
            placeholder="Type your password"
        />
        <button type="button" class="btn btn-icon pe-1" @click="toggleEvent">
            <IconEye v-if="!showPassword" class="text-primary" size="1.5rem" />
            <IconEyeSlash
                v-if="showPassword"
                class="text-primary"
                size="1.5rem"
            />
        </button>
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
            default: "Password",
        },
        modelValue: {
            type: String,
            required: true,
            default: "",
        },
        errorValue: {
            type: String,
            required: false,
        },
    });

    const emit = defineEmits(["update:modelValue", "update:errorValue"]);
    const modelValue = computed({
        get: () => props.modelValue,
        set: (value) => emit("update:modelValue", value),
    });
    const errorValue = computed({
        get: () => props.errorValue,
        set: (value) => emit("update:errorValue", value),
    });
    const showPassword = ref(false);
    const toggleEvent = (event) => {
        event.preventDefault();
        showPassword.value = !showPassword.value;
    };
</script>
