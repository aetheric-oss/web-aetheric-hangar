<template>
    <button
        class="btn btn-outline-light btn-dark rounded-pill w-100 justify-content-center"
        style="cursor: pointer"
        :disabled="!isReady"
        @click="login"
    >
        <img
            class="google"
            src="~/assets/icons/login/google.svg"
            alt="Google"
        />
        Login with Google
    </button>
</template>

<script setup lang="ts">
    import { useAuthStore } from "@/store/auth";
    import { useRouter } from "vue-router";
    import {
        useTokenClient,
        type AuthCodeFlowSuccessResponse,
        type AuthCodeFlowErrorResponse,
    } from "vue3-google-signin";
    import { computed } from "vue";

    const router = useRouter();

    const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
        const authStore = useAuthStore();
        authStore.login();

        router.push("/dashboard/");
    };

    const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
        console.log("Error: ", errorResponse);
    };

    const { isReady, login } = useTokenClient({
        onSuccess: handleOnSuccess,
        onError: handleOnError,
    });
</script>

<style lang="scss">
    img.google {
        height: calc(var(--bs-body-line-height) * 1em);
        margin-top: 0.25em;
        margin-bottom: 0.25em;
    }
</style>
