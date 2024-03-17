<template>
    <!--Page popups-->
    <PortalProfilePrivacyAndSecurityPasswordPopup class="h-100" />
    <PortalProfilePrivacyAndSecurityPassword class="px-3" />

    <!-------------------------->
    <hr class="my-2 my-md-3" />
    <!-------------------------->

    <PortalProfilePrivacyAndSecurityPrivacy
        class="px-3"
        :privacySettings="privacySettings"
        @updateSettings="updatePrivacySettings"
    />
</template>

<script setup lang="ts">
    import { useProfileStore } from "~/store/profile";
    import type { IPrivacySettings } from "~/modules/aetheric-api";

    const profileStore = useProfileStore();
    const $api = useAethericApi();

    // Reactive vars
    const user = ref(await profileStore.getUser());
    const { data: privacySettings } = await useAsyncData(
        "privacySettings",
        async () => {
            let [data, success] = await $api.users.getPrivacySettings({
                uuid: user.value.uuid,
            });
            if (success) {
                return data;
            } else {
                return {} as IPrivacySettings;
            }
        },
        {
            default: () => {
                return {}
            },
        }
    );

    // Functions
    const updatePrivacySettings = async (privacySettings: IPrivacySettings) => {
        await $api.users.updatePrivacySettings({ uuid: user.value.uuid, privacySettings });
        refreshNuxtData("privacySettings");
    };
</script>

<style lang="scss" scoped>
    .form-check-input[type="checkbox"] {
        width: 3rem !important;
    }
</style>
