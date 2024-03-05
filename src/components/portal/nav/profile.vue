<template>
    <LazyPortalNavPopup
        popupId="popupProfile"
        position="bottom"
        ref="portalNavPopup"
    >
        <template #title>
            Hello <span class="fw-bold">{{ user.name }}</span>
        </template>
        <template #content>
            <div class="d-grid gap-1">
                <router-link
                    to="/profile/settings/"
                    class="btn btn-gray text-start"
                    @click="close"
                >
                    <IconUserGear size="1.5rem" weight="fill" class="me-1" />
                    Profile Settings
                </router-link>
                <router-link
                    to="/profile/privacy-and-security/"
                    class="btn btn-gray text-start"
                    @click="close"
                >
                    <IconShieldCheck size="1.5rem" weight="fill" class="me-1" />
                    Privacy & Security
                </router-link>
                <router-link
                    to="/profile/payment/"
                    class="btn btn-gray text-start"
                    @click="close"
                >
                    <IconCreditCard size="1.5rem" weight="fill" class="me-1" />
                    Payment
                </router-link>
                <router-link
                    to="/profile/logout/"
                    class="btn btn-gray text-start"
                    @click="close"
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
                        class="btn-icon rounded-pill border border-white me-2"
                        alt="Profile image"
                        :src="user.profilePicture"
                    />
                </template>
            </PortalNavPopupCard>
        </template>
    </LazyPortalNavPopup>
</template>

<script setup lang="ts">
    import type { LazyPortalNavPopup } from "#build/components";
    import { useProfileStore } from "~/store/profile";

    const profileStore = useProfileStore();
    const user = ref(await profileStore.getUser());
    const portalNavPopup = ref<typeof LazyPortalNavPopup>();

    const close = () => {
        if (portalNavPopup.value) {
            portalNavPopup.value.close();
        }
    };
</script>
