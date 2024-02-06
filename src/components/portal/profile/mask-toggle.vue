<template>
    <button class="btn btn-icon" @click="toggleMasked">
        <IconEye size="1rem" v-show="isMasked" />
        <IconEyeSlash size="1rem" v-show="!isMasked" />
    </button>
</template>

<script setup>
    const props = defineProps({
        maskedValue: {
            type: Object,
            required: true,
        },
        clearValue: {
            type: Object,
            required: true,
        },
        isMasked: {
            type: Boolean,
            default: true,
        },
    });

    const displayValue = ref(
        props.isMasked ? props.maskedValue : props.clearValue
    );
    const isMasked = ref(props.isMasked);

    const toggleMasked = () => {
        if (isMasked.value) {
            displayValue.value = props.clearValue;
        } else {
            displayValue.value = props.maskedValue;
        }
        isMasked.value = !isMasked.value;
    };

    const getDisplayValue = () => {
        return displayValue.value;
    };

    defineExpose({
        getDisplayValue,
        isMasked
    });
</script>
