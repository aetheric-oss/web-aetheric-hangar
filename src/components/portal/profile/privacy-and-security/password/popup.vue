<template>
    <LazyPortalPopup :popupId="popupId" position="end" ref="passwordPopup">
        <template #title> Change password </template>
        <template #content>
            <form class="container">
                <div v-show="step === 1">
                    <h3 class="fs-2 mt-3">Change password</h3>
                    <div>
                        We will send you a code with which you can change your
                        password.
                    </div>
                </div>
                <div v-show="step === 2">
                    <h3 class="fs-2 mt-3">Get your activation code.</h3>
                    <div
                        class="w-100 align-items-center d-flex flex-column justify-content-center"
                    >
                        <button class="btn btn-outline-primary" @click="submit">
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
                            We sent you an e-mail with a verification code.
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
                        <div class="input__error" v-if="errorValue">
                            {{ errorValue }}
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template #footer>
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
        </template>
    </LazyPortalPopup>
</template>

<script setup lang="ts">
    import type { LazyPortalPopup } from "#build/components";

    const props = defineProps({
        popupId: {
            type: String,
            default: "popupProfilePrivacyAndSecurity",
        },
    });

    interface IResetPassword {
        verificationCode: string;
        newPass: string;
        confirmPass: string;
    }
    // Reactive State Variables
    const form: Ref<IResetPassword> = ref({
        verificationCode: "",
        newPass: "",
        confirmPass: "",
    });
    let step = ref(1);
    const passwordPopup = ref<typeof LazyPortalPopup>();

    // Computed Properties
    const errorValue = computed(() => {
        if (
            !form.value.verificationCode ||
            !form.value.newPass ||
            !form.value.confirmPass
        ) {
            return "All fields must be filled";
        }
        if (form.value.newPass !== form.value.confirmPass) {
            return "Passwords do not match";
        }
        return "";
    });

    // Functions
    const close = () => {
        if (passwordPopup.value) {
            passwordPopup.value.close();
        }
    };
    const sendVerificationCode = () => {
        step.value = 2;
    };
    const submit = () => {
        if (errorValue.value !== "") {
            return;
        }
        changePassword();
        close();
    };
    const changePassword = () => {
        console.log("change password");
    };

    // Exposed functions
    defineExpose({
        close,
    });
</script>
