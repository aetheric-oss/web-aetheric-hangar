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
    const profileStore = useProfileStore();

    // Reactive vars
    const privacySettings = ref<IPrivacySettings>(profileStore.privacySettings);

    // Functions
    const updatePrivacySettings = (settings: IPrivacySettings) => {
        privacySettings.value = settings;
    };
</script>

<style lang="scss" scoped>
    .form-check-input[type="checkbox"] {
        width: 3rem !important;
    }
</style>
