<template>
    <div>
        <img
            src="~/assets/icons/login/arrow-icon.svg"
            alt="Mobile Login Arrow Menu"
        />
        <main>
            <ForgotPassword @sendMail="handleMail" v-if="!sendMail"/>
            <ForgotPasswordSend v-else />
        </main>
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
