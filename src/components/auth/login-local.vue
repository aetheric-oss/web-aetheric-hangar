<template>
    <form>
        <p v-if="error" class="text-warning text-center" v-html="error"></p>
        <FormInputText
            id="username"
            label="Username"
            type="text"
            placeholder="Type username"
            v-model="username"
        >
            <template #icon-left
                ><IconUserCircle size="1.5rem" class="text-light"
            /></template>
        </FormInputText>
        <FormInputPassword id="password" v-model="password">
            <template #icon-left
                ><IconLock size="1.5rem" class="text-light"
            /></template>
        </FormInputPassword>
        <div class="p-1 mb-2 d-flex justify-content-end">
            <nuxt-link to="/login/forgot-password" class="font-weight-bold p-0"
                >FORGOT PASSWORD?
            </nuxt-link>
        </div>
        <button
            class="btn btn-primary w-100 shadow"
            type="button"
            @click="customLogin"
        >
            Login
        </button>
    </form>
</template>

<script setup lang="ts">
    import { useAuthStore } from "~/store/auth";

    const credentials = useCredentialStore(); // Temporary store to provide test data
    const router = useRouter();
    const store = useAuthStore();
    const userData = credentials.credentials;

    // Reactive vars
    const username = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const error = ref("");

    // Functions
    const toggleShow = () => {
        showPassword.value = !showPassword.value;
    };
    const customLogin = () => {
        // TODO: Replace with actual login logic using Axios
        let user = userData.find(
            (el) =>
                el.username === username.value && el.password === password.value
        );

        if (!user) {
            error.value =
                "The password and/or username is wrong. <br>We can't log you into the platform.";
        } else {
            store.login(user.username);
            router.push("/dashboard");
        }
    };
</script>
