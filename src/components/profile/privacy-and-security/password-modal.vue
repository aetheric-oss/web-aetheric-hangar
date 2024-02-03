<template>
    <div>
        <button
            type="button"
            class="btn btn-icon text-primary"
            @click="showModal"
        >
            <IconPencil size="30" />
        </button>
        <client-only>
            <Teleport to="#modal-container" key="password-modal">
                <div
                    v-show="visibility.modal"
                    :class="{
                        'modal-box': true,
                        'd-block': visibility.modal,
                        'd-none': !visibility.modal,
                    }"
                    id="password-modal"
                >
                    <div
                        class="modal-content d-flex align-items-end flex-column"
                    >
                        <div class="modal-header-box d-grid w-100">
                            <div
                                class="modal-heading sidenav-text my-auto mx-0 align-self-center"
                            >
                                password
                            </div>
                            <button
                                class="btn btn-icon text-white fs-3"
                                @click="toggleVisibility('modal')"
                            >
                                <PhX size="22" />
                            </button>
                        </div>
                        <div class="w-100 mb-1" style="overflow-y: scroll">
                            <div
                                class="stepper__container d-flex align-items-end flex-column h-100"
                            >
                                <form class="container">
                                    <div v-show="step === 1">
                                        <h3 class="fs-2 mt-3">
                                            Change password
                                        </h3>
                                        <div>
                                            We will send you a code with which
                                            you can change your password.
                                        </div>
                                    </div>
                                    <div v-show="step === 2">
                                        <h3 class="fs-2 mt-3">
                                            Get your activation code.
                                        </h3>
                                        <div
                                            class="w-100 align-items-center d-flex flex-column justify-content-center"
                                        >
                                            <button
                                                class="btn btn-outline-primary"
                                                @click="submit"
                                            >
                                                Resend e-mail
                                            </button>
                                            <div class="text-center">
                                                Keep having troubles?
                                                <a href="#">GET HELP</a>.
                                            </div>
                                        </div>
                                        <hr />
                                        <div>
                                            <div class="mb-2 text-center">
                                                We sent you an e-mail with a
                                                verification code.
                                            </div>
                                            <FormInputText
                                                id="verification-code"
                                                label="Verification code"
                                                type="text"
                                                placeholder="Type in your code"
                                                v-model="form.verificationCode"
                                            />
                                            <FormInputPassword
                                                id="new-password"
                                                label="New password"
                                                type="text"
                                                placeholder="Type in your new password"
                                                v-model="form.newPass"
                                            />
                                            <FormInputPassword
                                                id="confirm-password"
                                                label="Confirm password"
                                                type="text"
                                                placeholder="Confirm your new password"
                                                v-model="form.confirmPass"
                                            />
                                            <div
                                                class="input__error"
                                                v-if="errorValue"
                                            >
                                                {{ errorValue }}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <button
                            type="button"
                            class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                            v-show="step === 1"
                            @click="sendVerificationCode"
                        >
                            Send verification code
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                            v-show="step === 2"
                            @click="submit"
                        >
                            Save new password
                        </button>
                    </div>
                </div>
            </Teleport>
        </client-only>
    </div>
</template>

<script setup lang="ts">
    // Reactive State Variables
    const form = reactive({
        verificationCode: "",
        newPass: "",
        confirmPass: "",
    });
    const visibility: { [key: string]: boolean } = reactive({
        modal: false,
    });
    let step = ref(1);

    // Computed Properties
    const errorValue = computed(() => {
        if (!form.verificationCode || !form.newPass || !form.confirmPass) {
            return "All fields must be filled";
        }
        if (form.newPass !== form.confirmPass) {
            return "Passwords do not match";
        }
        return "";
    });

    // Component Methods/Functions
    const toggleVisibility = (key: string) => {
        visibility[key] = !visibility[key];
    };
    const resetData = () => {
        form.verificationCode = "";
        form.newPass = "";
        form.confirmPass = "";
        step.value = 1;
    };
    const sendVerificationCode = () => {
        step.value = 2;
    };
    const showModal = () => {
        toggleVisibility("modal");
        resetData();
    };
    const submit = () => {
        if (errorValue.value !== "") {
            return;
        }
        changePassword();
        toggleVisibility("modal");
    };
    const changePassword = () => {
        console.log("change password");
    };
</script>

<style scoped lang="scss">
    .stepper__container {
        height: -webkit-fill-available !important;
    }
    .modal-box {
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: var(--bs-blue-900);
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
