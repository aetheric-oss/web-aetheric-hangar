<template>
    <div class="popup" id="notifications-popup">
        <div class="notifications-popup popup-container">
            <div class="notification-popup-container">
                <div class="notification-popup-header">
                    <div class="notification-popup-heading sidenav-text">
                        Notifications
                    </div>
                    <div class="notification-popup-close-btn" @click="closeNotificationPopup">
                        <PhX size="22" color="white"/>
                    </div>
                </div>
                <div class="notification-links">
                    <SidenavCard :cardText="'Document is Awaiting Upload'">
                        <template #left-icon>
                            <PhArrowsInSimple size="22" fill="white" />
                        </template>
                    </SidenavCard>
                    <SidenavCard :cardText="'Teammate Added'">
                        <template #left-icon>
                            <PhUserCircle size="22" fill="white" />
                        </template>
                    </SidenavCard>
                    <SidenavCard :cardText="'New VTOL Asset Added'">
                        <template #left-icon>
                            <nuxt-icon name="vtol" />
                        </template>
                    </SidenavCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SidenavCard from '@/components/nav/sidenav-card.vue';
import { PhX, PhArrowsInSimple, PhUserCircle, PhDiscordLogo } from "@phosphor-icons/vue";

const emit = defineEmits(['closeNotificationsPopupEvent']);
function closeNotificationPopup() {
    emit('closeNotificationsPopupEvent', ['.notifications-popup', false]);
}
</script>

<style scoped lang="scss">
.notifications-popup {
    background: $gray-dark-mild;
    border-radius: 16px;
    padding: 11px 9px;
    width: 100%;

    .notification-popup-container {
        display: flex;
        flex-direction: column;
        height: inherit;

        .notification-popup-header {
            display: grid;
            grid-template-columns: 1fr auto;
            grid-template-areas: "heading close-btn";
            // gap: 12px;
            padding: 6.5px 12px;


            .notification-popup-heading {
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

        .notification-links {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
        }
    }
}
</style>
