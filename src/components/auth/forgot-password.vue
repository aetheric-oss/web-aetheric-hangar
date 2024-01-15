<template>
    <section>
        <h1 class="fs-3">Forgot your password?</h1>
        <p class="pb-3">
            Enter your email address and we will send you instructions to reset
            your password.
        </p>
        <form>
            <p v-if="error" class="text-warning text-center" v-html="error"></p>
            <FormInputText
                id="email"
                label="E-mail address"
                type="email"
                placeholder="Type your e-mail address"
                modelValue="form.email"
            >
                <template #icon-left
                    ><IconUserCircle size="1.5rem" class="text-light"
                /></template>
            </FormInputText>
            <button
                class="btn btn-primary w-100 shadow my-3"
                type="button"
                @click="resetPassword"
            >
                Reset password
            </button>
            <div class="text-center">
                <nuxt-link
                    to="/login"
                    class="text-white text-decoration-none font-rubik"
                >
                    <IconArrowLeft class="text-white" :size="24" /> Back
                </nuxt-link>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
    import { useAuthStore } from "@/store/auth";

    const store = useAuthStore();
    const emit = defineEmits<{
        (e: "sendMail", value: boolean): void;
    }>();

    // Reactive vars
    const error = ref("");
    const email = ref("");

    // Functions
    const resetPassword = () => {
        // TODO: Replace with actual login logic using Axios
        console.log(email.value);
        store.setEmail(email.value);
        emit('sendMail', true);
    };
</script>
