<template>
    <button class="btn align-self-center m-0"  @click="showModal">
        <slot name="activation-button"></slot>
    </button>
    <client-only>
        <Teleport to="#modal-container" :key="modalId">
            <div
                v-show="open"
                :class="{ 'modal-box': true, 'd-block': open, 'd-none': !open }"
                :id="modalId"
            >
                <div class="modal-content">
                    <div class="modal-header-box d-grid">
                        <div class="modal-heading sidenav-text my-auto mx-0 align-self-center">
                            {{ title }}
                        </div>
                        <div class="modal-close-btn m-auto d-block" @click="closeModal">
                            <PhX size="22" color="white"/>
                        </div>
                    </div>
                    <slot name="content"></slot>
                </div>
            </div>
        </Teleport>
    </client-only>
</template>

<script setup>
import { PhX } from "@phosphor-icons/vue";
const props = defineProps({
    modalId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    }
});
const modalId = props.modalId;
const open = ref(false);
const showModal = () => {
    open.value = true;
};
const closeModal = () => {
    open.value = false;
};
</script>


<style scoped lang="scss">
.modal-box {
    display: none;
    position: fixed;
    z-index: 999;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    padding: 10px;
}
.modal-header-box {
    grid-template-columns: 1fr auto;
    grid-template-areas: "heading close-btn";
    padding: 6.5px 12px;

    .modal-heading {
        grid-area: heading;
        justify-self: center;
    }

    .close-btn {
        grid-area: close-btn;
    }
}
</style>
