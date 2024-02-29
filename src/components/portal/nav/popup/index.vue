<template>
    <div
        class="offcanvas p-2 p-xxl-3"
        tabindex="-1"
        :class="['offcanvas-' + position]"
        :id="popupId"
        :aria-labelledby="popupId + 'Label'"
    >
        <div
            class="d-flex flex-column bg-light-subtle rounded"
            :class="{ 'flex-grow-1': position === 'start' }"
        >
            <div class="offcanvas-header">
                <h5
                    class="offcanvas-title text-center w-100 text-uppercase"
                    :id="popupId + 'Label'"
                >
                    <slot name="title"></slot>
                </h5>
                <button
                    type="button"
                    class="btn pe-0"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <IconClose size="1.5rem" />
                </button>
            </div>
            <div class="offcanvas-body gap-1 overflow-x-auto">
                <div>
                    <slot name="content"></slot>
                </div>
            </div>
            <div class="offcanvas-footer mt-auto align-content-bottom">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { $bootstrap } = useNuxtApp();

    const props = defineProps({
        popupId: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
    });

    const close = () => {
        // close offcanvas
        let popup = document.getElementById(props.popupId)!;
        let offcanvas = $bootstrap.Offcanvas.getInstance(popup)!;
        offcanvas.hide();
    };

    // Exposed functions
    defineExpose({
        close,
    });
</script>
