<template>
    <div class="mb-2">
        <div class="inputs input-2-icon d-grid gap-1 align-items-center py-1">
            <div class="form-label input__label" :for="id">Password</div>
            <div class="input__div d-flex gap-1 rounded-pill align-items-center ">
                <div class="px-1">
                </div>
                <input class="form-control input__field w-100 text-light"
                    :id="id"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="inputValueObj"
                    @input="(input) => $emit('input', input.target.value)"
                    placeholder="Enter Password"
                />
                <div class="ms-auto px-1">
                    <button class="btn btn-icon text-white lh-1" @click="showPassword = !showPassword">
                        <PhEye :size="20" v-show="showPassword"/>
                        <PhEyeSlash :size="20" v-show="!showPassword"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="input__error" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup>
import { PhEye, PhEyeSlash } from "@phosphor-icons/vue";
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    inputValue: {
        type: String,
        required: true,
        default: ''
    },
    error: {
        type: String,
        required: false
    }
});
const emit = defineEmits(['input']);
const showPassword = ref(false);
const inputValueObj = ref(props.inputValue);
</script>
