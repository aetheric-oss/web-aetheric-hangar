<template>
    <button
        type="button"
        class="btn btn-icon text-primary fs-5"
        @click="showModal"
    >
        <slot name="activation-button"></slot>
    </button>
    <client-only>
        <Teleport to="#modal-container" :key="modalId">
            <div
                v-show="open"
                :class="{ 'modal-box': true, 'd-block': open, 'd-none': !open }"
                :id="modalId"
            >
                <div class="modal-content d-flex align-items-end flex-column">
                    <div class="modal-header-box d-grid w-100">
                        <div
                            class="modal-heading sidenav-text my-auto mx-0 align-self-center"
                        >
                            {{ title }}
                        </div>
                        <div class="modal-close-btn m-auto d-block">
                            <button
                                class="btn btn-icon text-white fs-3"
                                @click="closeModal"
                            >
                                <IconClose size="22" />
                            </button>
                        </div>
                    </div>
                    <div class="w-100 mb-1" style="overflow-y: scroll">
                        <slot name="content"></slot>
                    </div>
                    <button
                        type="button"
                        class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                        v-if="submitDetails.showSubmitButton === true"
                        @click="submit"
                    >
                        {{ submitDetails.title }}
                    </button>
                </div>
            </div>
        </Teleport>
    </client-only>
</template>

<script setup lang="ts">
    const props = defineProps({
        modalId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        handleSubmit: {
            type: Function,
            required: false,
        },
        submitDetails: {
            type: Object,
            required: false,
        },
    });

    const modalId = props.modalId;

    // Reactive vars
    const open = ref(false);

    // Functions
    const showModal = () => {
        open.value = true;
    };
    const closeModal = () => {
        open.value = false;
    };
    const submit = () => {
        if (props.handleSubmit) {
            props.handleSubmit();
        }
        closeModal();
    };
    const submitDetails = ref(
        props.submitDetails
            ? props.submitDetails
            : { showSubmitButton: true, title: "Submit" }
    );
</script>

<style scoped lang="scss">
    .modal-box {
        display: none;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--bs-dark);
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
