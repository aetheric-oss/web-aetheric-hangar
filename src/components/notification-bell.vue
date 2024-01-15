<template>
    <button class="btn btn-icon notification-bell-container" @click="openNotificationPopup">
        <IconBell :size="14" />
    </button>
</template>

<script setup>
const emit = defineEmits(['openNotificationsPopupEvent']);
function openNotificationPopup() {
    emit('openNotificationsPopupEvent', ['.notifications-popup', true]);
}
</script>

<style scoped lang="scss">
.notification-bell-container {
    justify-content: center;
    align-items: center;
    padding: 9px 11px;
    width: 36px;
    height: 36px;
    color: var(--bs-white);
    background: var(--bs-gray-700);
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
