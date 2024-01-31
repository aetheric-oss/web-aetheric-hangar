<template>
    <PortalNavPopup popupId="popupProfile" position="bottom">
        <template #title>
            Hello <span class="fw-bold">{{ username }}</span>
        </template>
        <template #content>
            <div class="d-grid gap-1">
                <router-link
                    to="/profile/settings/"
                    class="btn btn-gray text-start"
                >
                    <IconUserGear size="1.5rem" weight="fill" class="me-1" />
                    Profile Settings
                </router-link>
                <router-link
                    to="/profile/privacy-and-security/"
                    class="btn btn-gray text-start"
                >
                    <IconShieldCheck size="1.5rem" weight="fill" class="me-1" />
                    Privacy & Security
                </router-link>
                <router-link
                    to="/profile/payment/"
                    class="btn btn-gray text-start"
                >
                    <IconCreditCard size="1.5rem" weight="fill" class="me-1" />
                    Payment
                </router-link>
                <router-link
                    to="/profile/logout/"
                    class="btn btn-gray text-start"
                >
                    <IconSignOut size="1.5rem" weight="fill" class="me-1" />
                    Log out
                </router-link>
            </div>
        </template>
        <template #footer>
            <PortalNavPopupCard
                class="mt-auto align-items-center text-uppercase"
                text="My Profile"
            >
                <template #left>
                    <img
                        class="pe-2"
                        src="/img/demo/my-profile.png"
                        alt="Profile image"
                    />
                </template>
            </PortalNavPopupCard>
        </template>
    </PortalNavPopup>
</template>

<script setup lang="ts">
    const profileStore = useProfileStore();
    const username = profileStore.getUsername;
</script>
