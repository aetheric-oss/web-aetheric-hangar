<template>
    <div class="row row-no-gutters mb-4">
        <section class="col-sm-4">
            <img
                class="d-flex justify-content-top align-items-start desktop-login-menu-svg"
                src="~/assets/icons/login/arrow-icon.svg"
                alt="Desktop Login Arrow Menu"
            />
            <main class="justify-content-center p-2">
                <ForgotPassword @sendMail="handleMail" v-if="!sendMail"/>
                <ForgotPasswordSend true v-else />
            </main>
        </section>
        <section class="col-sm-8">
            <div class="d-flex justify-content-end">
                <img
                    class="login-background-svg"
                    src="~/assets/icons/login/forgot-password-background.svg"
                    alt="Login Forgot Password Arrow Background"
                    loading="lazy"
                />
            </div>
        </section>
    </div>
</template>

<script>
import ForgotPassword from '@/components/auth/forgot-password.vue';
import ForgotPasswordSend from '@/components/auth/forgot-password-send.vue';

export default {
    components: {
    ForgotPassword,
    ForgotPasswordSend
},
    data() {
        return {
            sendMail: false
        };
    },
    methods: {
        handleMail(mailSend) {
            this.sendMail = mailSend;
        }
    }
}

</script>

<style>


.custom-input-field {
    width: 80%;
    height: 80%;
    padding: 8px 0px 8px 0px; /* Adjusted padding */
    border-radius: 25px;
    display: flex;
    gap: 5px;
}


.poppins-style {
    font-family: Poppins, sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.1em;
    text-align: center;
}

.rubik-style {
    font-family: Rubik, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.1em;
    text-align: center;
}

</style>
