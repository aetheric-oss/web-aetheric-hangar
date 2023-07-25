<template>
    <div>
        <div :class="{'current-business-component':true, 'mild-background': mildBackground}">
            <div class="business-acc-logo">
                <img :src="business.imgSrc" alt="Current Business Image">
            </div>
            <div class="business-text">
                <div class="sidenav-text heading">Business</div>
                <div class="company-name">{{ business.name }}</div>
            </div>
            <div class="interchange-button" @click="openBusinessPopup">
                <PhArrowsLeftRight :size="22" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhArrowsLeftRight } from "@phosphor-icons/vue";
const emit = defineEmits(['openBusinessChangePopup']);
function openBusinessPopup() {
    emit('openBusinessChangePopup', ['.business-popup', true]);
}
const props = defineProps({
    mildBackground: {
        type: Boolean,
        required: false,
        default: false
    },
    business: {
        type: Object,
        required: true
    }
});
</script>

<style scoped lang="scss">
.current-business-component{
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    grid-template-areas: "business-acc-logo business-text interchange-button";
    gap: 16px;
    width: 100%;
    background-color: $gray-dark4;
    border-radius: 8px;
    color: var(--bs-white);
    padding: 12px;

    &.mild-background {
        background-color: $gray-dark-mild2;
    }

    .business-acc-logo {
        width: 37px;
        height: 37px;
        border-radius: 50%;
        border: 1px solid var(--bs-white);
        grid-area: business-acc-logo;
    }

    .business-text {
        grid-area: business-text;
        .heading {
            line-height: 12px!important;
            color: #8E8EA3!important;
        }
        .company-name {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 24px;
            /* identical to box height, or 200% */
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--bs-white);
        }
    }

    .interchange-button {
        grid-area: interchange-button;
        margin: auto 0;
    }
}
</style>
