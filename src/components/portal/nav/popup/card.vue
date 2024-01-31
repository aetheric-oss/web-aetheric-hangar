<template>
    <div class="d-flex p-2 align-items-center text-uppercase rounded">
        <slot name="left"></slot>
        <div class="flex-grow-1 text-start" :class="'text-' + textColor">
            <div class="text-muted fw-semibold" v-if="textHeading">
                {{ textHeading }}
            </div>
            {{ text }}
        </div>
        <component
            v-if="icon"
            :is="icon"
            weight="fill"
            size="1.5rem"
            class="ms-2"
            :class="iconColor !== '' ? ['text-' + iconColor] : [] "
        ></component>
        <slot name="right"></slot>
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: {
            type: String,
            required: false,
        },
        iconColor: {
            type: String,
            default: "",
        },
        textHeading: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: true,
        },
        textColor: {
            type: String,
            default: "white",
        },
    });
</script>
