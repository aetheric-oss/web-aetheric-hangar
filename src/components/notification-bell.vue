<template>
    <div class="notification-bell-container" @click="openNotificationPopup">
        <PhBell :size="14" />
    </div>
</template>

<script setup>
import { PhBell } from "@phosphor-icons/vue";
const emit = defineEmits(['openNotificationsPopupEvent']);
function openNotificationPopup() {
    emit('openNotificationsPopupEvent', ['.notifications-popup', true]);
}
</script>

<style scoped lang="scss">
.notification-bell-container {
    justify-content: center;
    align-items: center;
    padding: 4px 11px;
    width: 36px;
    height: 36px;
    color: var(--bs-white);
    background: $gray-dark4;
    border-radius: 4px;

    .notification-bell-icon {
        align-self: center;
        justify-self: center;
        color: var(--bs-white);
        margin: auto;
        display: block;
    }
}
</style>
