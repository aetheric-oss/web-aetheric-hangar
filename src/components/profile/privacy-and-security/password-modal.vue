<template>
    <div>
        <button type="button" class="btn btn-icon text-primary" @click="showModal">
            <PhPencil size="30" />
        </button>
        <client-only>
            <Teleport to="#modal-container" key="password-modal">
                <div
                    v-show="open"
                    :class="{ 'modal-box': true, 'd-block': open, 'd-none': !open }"
                    id="password-modal"
                >
                    <div class="modal-content d-flex align-items-end flex-column">
                        <div class="modal-header-box d-grid w-100">
                            <div class="modal-heading sidenav-text my-auto mx-0 align-self-center">
                                password
                            </div>
                            <button class="btn btn-icon text-white fs-3" @click="closeModal">
                                <PhX size="22" />
                            </button>
                        </div>
                        <div class="w-100 mb-1" style="overflow-y: scroll">
                            <div class="stepper__container d-flex align-items-end flex-column h-100">
                                <form class="container">
                                    <div v-show="step === 1">
                                        <h3 class="fs-2 mt-3">Change password</h3>
                                        <div>We will send you a code with which you can change your password.</div>
                                    </div>
                                    <div v-show="step === 2">
                                        <h3 class="fs-2 mt-3">Get your activation code.</h3>
                                        <div class="w-100 align-items-center d-flex flex-column justify-content-center">
                                            <button class="btn btn-outline-primary" @click="submit">Resend e-mail</button>
                                            <div class="text-center">
                                                Keep having troubles? <a href="#">GET HELP</a>.
                                            </div>
                                        </div>
                                        <hr>
                                        <div>
                                            <div class="mb-2 text-center">We sent you an e-mail with a verification code.</div>
                                            <InputText
                                                id="verification-code"
                                                label="Verification code"
                                                type="text"
                                                :inputValue="verificationCode"
                                                placeholder="Type in your code"
                                                @input="verificationCode = $event"
                                            />
                                            <InputPassword
                                                id="new-password"
                                                label="New password"
                                                type="text"
                                                :inputValue="newPass"
                                                placeholder="Type in your new password"
                                                @input="newPass = $event"
                                            />
                                            <InputPassword
                                                id="confirm-password"
                                                label="Confirm password"
                                                type="text"
                                                :inputValue="confirmPass"
                                                placeholder="Confirm your new password"
                                                @input="confirmPass = $event"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light" v-show="step === 1" @click="sendVerificationCode">
                            Send verification code
                        </button>
                        <button type="button" class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light" v-show="step === 2" @click="submit">
                            Save new password
                        </button>
                    </div>
                </div>
            </Teleport>
        </client-only>
    </div>
</template>

<script setup>
import { PhPencil, PhUserCircle, PhX } from "@phosphor-icons/vue";
import InputText from '@/components/input-fields/input-text.vue';
import InputPassword from "@/components/input-fields/input-password.vue";
const verificationCode = ref('');
const newPass = ref('');
const confirmPass = ref('');
let step = ref(1);
const sendVerificationCode = () => {
    step.value = 2;
};
const open = ref(false);
const showModal = () => {
    open.value = true;
    resetData();
};
const closeModal = () => {
    open.value = false;
};
const submit = () => {
    if (!verificationCode.value || !newPass.value || !confirmPass.value) {
        console.log('all fields must be filled');
        return;
    }
    if (newPass.value !== confirmPass.value) {
        console.log('passwords do not match');
        return;
    }
    changePassword();
    closeModal();
};
const changePassword = () => {
    console.log('change password');
};
const resetData = () => {
    verificationCode.value = '';
    newPass.value = '';
    confirmPass.value = '';
    step.value = 1;
};
</script>

<style scoped lang="scss">
.stepper__container {
    height: -webkit-fill-available!important;
}
.modal-box {
    display: none;
    position: fixed;
    z-index: 999;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: $primary-dark;

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
