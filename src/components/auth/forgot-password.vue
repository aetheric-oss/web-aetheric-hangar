<template>
    <section>
        <div class="px-2 pt-3">
                <p class="text-white justify-content-left welcome-login-text fw-normal fs-3 lh-base">Forgot your password?</p>
                <p class="text-white text-left font-family-poppins">Enter your email address and we will send you instructions to reset your password.</p>
        </div>
        <form class="form-group">
            <div class="justify-content-center form-group">
                <div class="p-2 text-white input-group mb-2">
                    <label for="Email" class="text-gray">E-mail address</label>
                    <div class="input-group-addon desktop-button-input border border-white">
                        <PhUserCircle :size="24" />
                        <input
                            type="email"
                            class="desktop-button-input text-white"
                            aria-describedby="email"
                            placeholder="Type your email address"
                            v-model="email"
                            />
                    </div>
                </div>
                <div class="justify-content-center p-1 text-center text-white">
                    <button type="button" class="btn login-button" @click="resetPassword">Reset password</button>
                </div>
            </div>
            <div class="text-center p-3 px-0">
                <nuxt-link
                    to="/login"
                    class="text-white text-decoration-none font-rubik"> <PhArrowLeft class="text-white" :size="24" /> Back
                </nuxt-link>
            </div>
        </form>
    </section>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { PhUserCircle, PhArrowLeft } from "@phosphor-icons/vue";


export default {
    data() {
        return {
            email: "",
            store: useAuthStore(),
        };
    },
    components: {
        PhUserCircle,
        PhArrowLeft
    },
    methods: {
        resetPassword() {
            // TODO: Replace with actual login logic using Axios
            console.log(this.email);
            this.store.setEmail(this.email);
            this.$emit('sendMail', true);
        }
    }
};

</script>

<style  scoped lang="scss">
.login-button {
    background-color: $coral-red;
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
