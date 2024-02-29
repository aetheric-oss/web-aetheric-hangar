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
            v-model.lazy="inputValue"
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

<script setup lang="ts">
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
    });

    // Reactive vars
    const inputValue = defineModel("inputValue", { default: "" });
    const errorValue = defineModel("errorValue");
    const showPassword = ref(false);

    // Functions
    const toggleEvent = (event: any) => {
        event.preventDefault();
        showPassword.value = !showPassword.value;
    };
</script>
