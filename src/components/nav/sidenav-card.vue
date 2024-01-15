<template>
    <router-link :to="path" class="sidenav-links">
        <div :class="{'sidenav-card':true, 'highlight-bg': highlightBg, 'no-background': noBackground}">
            <div class="card-left-icon">
                <slot name="left-icon">
                    <div class="sidenav-profile-icon"></div>
                </slot>
            </div>
            <div class="card-text sidenav-text">
                {{ cardText }}
            </div>
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

<style scoped lang="scss">
.sidenav-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    grid-template-areas: "card-left-icon card-text card-right-icon";
    gap: 12px;
    width: 100%;
    background-color: var(--bs-gray-600);
    border-radius: 12px;
    color: var(--bs-white);
    padding: 12px;

    &.highlight-bg {
        background-color: var(--bs-gray-700);
    }

    &.no-background {
        background-color: transparent!important;
    }

    .card-left-icon {
        grid-area: card-left-icon;
        margin: auto 0;
        font-size: 22px;
    }

    .card-text {
        grid-area: card-text;
        margin: auto 0;
        line-height: 1.5em;
    }

    .card-right-icon {
        grid-area: card-right-icon;
        margin: auto 0;

        &.highlight-text {
            text-decoration: none;
            text-transform: capitalize;
            font-family: Poppins;
            font-size: 12px;
            font-weight: 400;
            line-height: 40px;
            letter-spacing: 0.1em;
            text-align: left;
            color: var(--bs-blue-100);
        }
    }
}
</style>
