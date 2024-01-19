<template>
    <router-link :to="path" class="sidenav-links">
        <div :class="{'sidenav-card':true, 'highlight-bg': highlightBg, 'no-background': noBackground}">
            <div class="card-left-icon">
                <slot name="left-icon">
                    <div class="sidenav-profile-icon"></div>
                </slot>
            </div>
            {{ cardText }}
            <div class="card-right-icon highlight-text">
                <slot name="right-icon"></slot>
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    cardText: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: false,
        default: "/"
    },
    noBackground: {
        type: Boolean,
        required: false,
        default: false
    },
    highlightBg: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>
