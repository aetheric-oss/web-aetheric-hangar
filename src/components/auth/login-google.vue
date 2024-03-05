<template>
    <p v-show="error" class="text-warning text-center" v-html="error"></p>
    <button
        class="btn btn-outline-light btn-dark rounded-pill w-100 justify-content-center"
        style="cursor: pointer"
        :disabled="!gsiLoaded"
        @click="login"
    >
        <img class="google" src="/icons/login/google.svg" alt="Google" />
        Login with Google
    </button>
</template>

<script setup lang="ts">
    /// <reference types='gsi' />
    import { useRouter } from "vue-router";
    import handleGoogleLogin from "~/composables/googleLogin";

    useHead({
        script: [
            {
                defer: true,
                hid: "google-gsi",
                src: "https://accounts.google.com/gsi/client",
                onload: () => {
                    initializeGoogleSignIn();
                }
            },
        ],
    });

    const router = useRouter();
    const runtimeConfig = useRuntimeConfig();
    const gsiLoaded = ref<boolean>(false);
    const error = ref<string | undefined>(undefined);

    const login = () => {
        google?.accounts.id.prompt((notification) => {
            if (
                notification.isNotDisplayed() ||
                notification.isSkippedMoment()
            ) {
                // continue with another identity provider.
            }
        });
    };

    const handleOnSuccess = async (response: CredentialResponse) => {
        if (await handleGoogleLogin(response)) {
            router.push("/dashboard/");
        }
    };

    function initializeGoogleSignIn() {
        let client_id = runtimeConfig.public.GOOGLE_CLIENTID;
        if (client_id && client_id !== "") {
            try {
            google.accounts.id.initialize({
                client_id: client_id,
                callback: handleOnSuccess, //method to run after user clicks the Google sign in button
                context: "signin",
            });
            gsiLoaded.value = true;
            } catch(e) {
                error.value = "Could not load Google plugin"
            }
        }
    }
    const nuxtApp = useNuxtApp();
</script>

<style lang="scss">
    img.google {
        height: calc(var(--bs-body-line-height) * 1em);
        margin-top: 0.25em;
        margin-bottom: 0.25em;
    }
</style>
