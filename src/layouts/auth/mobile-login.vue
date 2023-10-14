<template>
    <div class="bg-color">
        <img
            src="~/assets/icons/login/arrow-icon.svg"
            alt="Mobile Login Arrow Menu"
        />
    <p class="text-white text-left welcome-login-text fw-normal fs-5">Welcome back</p>
        <main>
                <div class="d-flex justify-content-center p-3">
                    <GoogleLogin :is-desktop="false" />
                </div>
            <div class="divider-container">
                <div class="divider-line"></div>
                <div class="divider-text">OR</div>
                <div class="divider-line"></div>
            </div>
            <p v-if="error" class="text-danger text-center" v-html="error"></p>
            <CustomLogin  @error="handleError" :is-desktop="false" />
            <h6 class="poppins-style text-white pt-3 pb-5 mb-5" :class="marginClass">
                Don’t have an account?
            <a href="#" class="font-weight-bold text-decoration-underline">Sign up for FREE</a>
            </h6>
        </main>
    </div>
</template>

<script>
import GoogleLogin from '@/components/auth/google-login-button.vue';
import CustomLogin from '@/components/auth/custom-login.vue';

export default {
    components: {
        GoogleLogin,
        CustomLogin
    },
    data() {
        return {
            error: null
        };
    },
    methods: {
        handleError(errorMessage) {
            this.error = errorMessage;
        }
    }
}
</script>
