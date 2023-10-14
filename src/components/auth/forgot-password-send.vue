<template>
    <section>
        <div class="m-0.5">
            <p class="text-white justify-content-left welcome-login-text fw-normal fs-3 lh-base">Check your mail</p>
            <p class="text-white text-left font-family-poppins">Please check the inbox of <i>{{ email }}</i> for instructions to reset your password.</p>
        </div>
        <div class="justify-content-center m-0.5">
            <div class="justify-content-center p-1 text-center text-white">
                <button type="button" class="btn forgot-password-button bg-inherit" @click="resendPassword">Resend password</button>
            </div>
            <div class="py-3 px-0 text-center">
                <p class="text-white">Keep having troubles?
                    <a href="#" class="font-weight-bold text-decoration-underline text-white">Get Help</a>
                </p>
            </div>
        </div>
        <div v-if="isMobile">
            <div class="divider-container">
                <div class="divider-line"></div>
                <div class="divider-text">OR</div>
                <div class="divider-line"></div>
            </div>
        </div>
        <div class="text-center py-3 px-0">
            <nuxt-link
                to="/login"
                class="text-white text-decoration-none font-rubic"> <PhArrowLeft class="text-white" :size="24" /> Go to login
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import { useAuthStore } from '@/store/auth';
import { PhArrowLeft } from "@phosphor-icons/vue";


export default {
    components: {
        PhArrowLeft,
    },
    computed: {
        email() {
            const store = useAuthStore();
            return store.email;
        }
    },
    methods: {
        resendPassword() {
            // TODO: Replace with actual login logic using Axios
            console.log(`Sending reset email to: ${this.email}`);
        }
    }
};


</script>

<style  scoped lang="scss">
.forgot-password-button {
    color: $coral-red;
    border: 2px solid $coral-red;
    width: 95%;
    display: block;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
}

.login-button:hover
.login-button:active {
    background-color:  $coral-red!important;
}

</style>
