<template>
    <ClientOnly>
        <form>
            <p
                v-show="error"
                class="text-warning text-center"
                v-html="error"
            ></p>
            <FormInputText
                id="username"
                label="Username"
                type="text"
                placeholder="Type username"
                v-model:input-value="username"
            >
                <template #icon-left>
                    <IconUserCircle size="1.5rem" class="text-light" />
                </template>
            </FormInputText>

            <FormInputPassword id="password" v-model:input-value="password">
                <template #icon-left>
                    <IconLock size="1.5rem" class="text-light" />
                </template>
            </FormInputPassword>
            <div class="p-1 mb-2 d-flex justify-content-end">
                <nuxt-link
                    to="/login/forgot-password"
                    class="font-weight-bold p-0"
                >
                    FORGOT PASSWORD?
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
    </ClientOnly>
</template>

<script setup lang="ts">
    import { useAuthStore } from "~/store/auth";
    import { useProfileStore } from "~/store/profile";

    const router = useRouter();
    const $api = useAethericApi();
    const authStore = useAuthStore();

    // Reactive vars
    const username = ref<string>("");
    const password = ref<string>("");
    const error = ref<string | undefined>(undefined);

    // Functions
    const customLogin = async () => {
        let result = await $api.auth.login({
            login_type: "local",
            username: username.value,
            password: password.value,
        });
        if (!result.success) {
            error.value = $api.auth.error;
        }

        let success = false;
        let user;
        let uuid = result.uuid;
        if (uuid) {
            [user, success] = await $api.users.get({ uuid });
            if (!success) {
                error.value = $api.users.error;
            }
        }

        if (!user) {
            error.value =
                "The password and/or username is wrong. <br>We can't log you into the platform.";
        } else {
            authStore.login(username.value);
            router.push("/dashboard");
            [user, success] = await $api.users.getByUsername({
                username: username.value,
            });
            if (user) {
                useProfileStore().$reset();
            }
        }
    };
</script>
