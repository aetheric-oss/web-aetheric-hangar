<template>
    <div class="popup" id="notifications-popup">
        <div class="notifications-popup popup-container">
            <div class="notification-popup-container">
                <div class="notification-popup-header">
                    <div class="notification-popup-heading sidenav-text">
                        Notifications
                    </div>
                    <div
                        class="notification-popup-close-btn"
                        @click="closeNotificationPopup"
                    >
                        <IconClose size="22" color="white" />
                    </div>
                </div>
                <div class="notification-links">
                    <NavSidenavCard :cardText="'Document is Awaiting Upload'">
                        <template #left-icon>
                            <IconArrowsInSimple size="22" fill="white" />
                        </template>
                    </NavSidenavCard>
                    <NavSidenavCard :cardText="'Teammate Added'">
                        <template #left-icon>
                            <IconUserCircle size="22" fill="white" />
                        </template>
                    </NavSidenavCard>
                    <NavSidenavCard :cardText="'New VTOL Asset Added'">
                        <template #left-icon>
                            <img src="/img/icons/vtol.svg" />
                        </template>
                    </NavSidenavCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(["closeNotificationsPopupEvent"]);
    function closeNotificationPopup() {
        emit("closeNotificationsPopupEvent", [".notifications-popup", false]);
    }
</script>

<style scoped lang="scss">
    .notifications-popup {
        background: var(--bs-gray-400);
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
