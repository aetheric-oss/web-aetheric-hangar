<template>
    <GenericModal
        :modalId="'contact-verify-modal-'+index"
        :title="`contact verification`"
        :handleSubmit="handleSubmit"
        :submitDetails="submitDetails"
    >
        <template #activation-button>
            <slot></slot>
        </template>
        <template #content>
            <div class="stepper__container d-flex align-items-end flex-column h-100">
                <form class="container">
                    <div v-if="contactForm.type === 'Email Address'">
                        <h3 class="fs-2 mt-3">Verify your e-mail</h3>
                        <div>We have sent you an e-mail with instructions to verify your new e-mail address.</div>
                        <div class="w-100 align-items-center d-flex flex-column justify-content-center mt-3">
                            <button type="button" class="btn btn-outline-primary" @click="handleSubmit">Resend e-mail</button>
                            <div class="text-center">
                                Keep having troubles? <a href="#">GET HELP</a>.
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </template>
    </GenericModal>
</template>

<script setup lang="ts">
import GenericModal from '../../../generic-modal.vue';
const props = defineProps({
    contactForm: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});
const contactForm = props.contactForm;
const handleSubmit = () => {
    console.log('handle submit');
}
const submitDetails = {
    showSubmitButton: false
}
</script>

<style scoped lang="scss">
.stepper__container {
    height: -webkit-fill-available!important;
}
</style>
