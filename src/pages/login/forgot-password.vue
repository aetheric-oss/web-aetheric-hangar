<template>
    <div class="h-100">
        <NuxtLayout name="login">
            <template #content>
                <AuthForgotPassword @sendMail="handleMail" v-if="!sendMail" />
                <AuthForgotPasswordSend true v-else />
            </template>

            <template #image>
                <img
                    src="/img/forgot-password-background.jpg"
                    alt="Login Forgot Password Arrow Background"
                    loading="lazy"
                />
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: false,
    });

    let sendMail = ref(false);

    let handleMail = (mailSend: boolean) => {
        sendMail.value = mailSend;
    };
</script>
