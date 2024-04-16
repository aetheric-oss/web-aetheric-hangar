<template>
    <ClientOnly>
        <form class="vstack gap-2">
            <p
                v-show="error"
                class="text-warning text-center"
                v-html="error"
            ></p>
            <FormInputText
                id="name"
                label="Name"
                type="text"
                placeholder="Type your name"
                v-model:input-value="name"
            >
                <template #icon-left>
                    <IconUserCircle size="1.5rem" class="text-light" />
                </template>
            </FormInputText>
            <FormInputText
                id="email"
                label="Email"
                type="text"
                placeholder="Type your email address"
                v-model:input-value="email"
            >
                <template #icon-left>
                    <IconAt size="1.5rem" class="text-light" />
                </template>
            </FormInputText>
            <div class="py-3">
                <FormInputRadiobox
                    id="allow-for-marketing-false"
                    name="allow-for-marketing"
                    value="false"
                    label="Only use my information for this demo's purpose"
                    type="text"
                    v-model:input-value="checked"
                />
                <FormInputRadiobox
                    id="allow-for-marketing-true"
                    name="allow-for-marketing"
                    value="true"
                    label="Please keep me up to date with Aetheric's progress"
                    type="text"
                    v-model:input-value="checked"
                />
            </div>
            <button
                class="btn btn-primary w-100 shadow"
                type="button"
                :disabled="!checked"
                @click="customLogin"
            >
                Start demo
            </button>
        </form>
    </ClientOnly>
</template>

<script setup lang="ts">
    import handleDemoLogin from "~/composables/demoLogin";
    import { useAuthStore } from "~/store/auth";

    const router = useRouter();
    const $api = useAethericApi(useCurrentCompany());
    const authStore = useAuthStore();

    // Reactive vars
    const name = ref<string>("");
    const email = ref<string>("");
    const checked = ref<boolean>(false);
    const error = ref<string | undefined>(undefined);

    // Functions
    const customLogin = async () => {
        if (await handleDemoLogin(name.value, email.value)) {
            router.push("/flights/aircraft");
        }
    };
</script>
