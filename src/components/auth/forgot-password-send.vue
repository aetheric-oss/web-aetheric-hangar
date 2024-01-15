<template>
    <section>
        <h1 class="fs-3">Check your e-mail</h1>
        <p class="pb-3">
            Please check the inbox of <i>{{ email }}</i> for instructions to
            reset your password.
        </p>
        <button
            class="btn btn-outline-primary w-100 justify-content-center"
            @click="resendPassword"
        >
            Resend e-mail
        </button>
        <div class="my-3 text-center">
            Keep having troubles? <a href="#" class="font-weight-bold">Get Help</a>
        </div>
        <div class="d-flex">
            <hr class="flex-grow-1 border border-1 border-light" />
            <span class="align-self-center px-2">OR</span>
            <hr class="flex-grow-1 border border-1 border-light" />
        </div>
        <div class="my-3 text-center">
            <nuxt-link
                to="/login"
                class="text-decoration-none"
            >
                <IconArrowLeft class="text-white" size="1.5rem" /> Go to login
            </nuxt-link>
        </div>
    </section>
</template>
<script setup lang="ts">
    import { useAuthStore } from "@/store/auth";

    const store = useAuthStore();

    // Reactive vars
    const email = ref(store.email);

    // Functions
    const resendPassword = () => {
        // TODO: Replace with actual login logic using Axios
        console.log(`Sending reset email to: ${email.value}`);
    };
</script>
