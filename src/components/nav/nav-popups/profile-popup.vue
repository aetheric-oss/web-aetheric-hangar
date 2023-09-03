<template>
    <div class="popup" id="profile-popup">
        <div class="profile-popup popup-container">
            <div class="profile-popup-container">
                <div class="profile-popup-header">
                    <div class="profile-popup-heading sidenav-text">
                        Hello <span>{{ username }}</span>
                    </div>
                    <div class="profile-popup-close-btn" @click="closeProfilePopup">
                        <PhX size="22" color="white"/>
                    </div>
                </div>
                <div class="profile-links">
                    <SidenavCard :cardText="'Profile Settings'" :path="`/profile/settings/`">
                        <template #left-icon>
                            <PhDiscordLogo size="22" weight="fill" />
                        </template>
                    </SidenavCard>
                    <SidenavCard :cardText="'Privacy & Security'" :path="`/profile/privacy-and-security/`">
                        <template #left-icon>
                            <PhDiscordLogo size="22" weight="fill" />
                        </template>
                    </SidenavCard>
                    <SidenavCard :cardText="'Logout'">
                        <template #left-icon>
                            <PhDiscordLogo size="22" weight="fill" />
                        </template>
                    </SidenavCard>
                    <SidenavCard :cardText="'My Profile'" :noBackground="true" :path="`/profile/settings/`">
                        <template #left-icon>
                            <img src="/img/demo/my-profile.png" alt="Profile Image">
                        </template>
                    </SidenavCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SidenavCard from '@/components/nav/sidenav-card.vue';
import { PhX, PhDiscordLogo } from "@phosphor-icons/vue";

const emit = defineEmits(['closeProfilePopupEvent']);
function closeProfilePopup() {
    emit('closeProfilePopupEvent', ['.profile-popup', false]);
}

const profileStore = useProfileStore();
const username = profileStore.getUsername;
</script>

<style scoped lang="scss">
.profile-popup {
    background: $gray-dark-mild;
    border-radius: 16px;
    padding: 11px 9px;
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 11px 9px;
    width: 100%;
    background: transparent!important;

    .profile-popup-container {
        display: flex;
        flex-direction: column;
        height: inherit;
        background: #424752;
        border-radius: 16px;
        padding: 11px 9px;

        .profile-popup-header {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-areas: "heading close-btn";
            padding: 6.5px 12px;


            .profile-popup-heading {
                grid-area: heading;
                margin: auto 0;
                align-self: center;
                justify-self: center;

            }

            .close-btn {
                grid-area: close-btn;
                margin: auto;
                display: block;
            }
        }

        .profile-links {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }
}
</style>
