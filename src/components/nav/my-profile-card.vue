<template>
    <div class="my-profile-card-component">
        <div class="my-profile-logo">
            <img src="/img/demo/my-profile.png" alt="Profile Image" />
        </div>
        <div class="my-profile-text sidenav-text">My Profile</div>
        <div class="interchange-button" @click="openProfilePopup">
            <IconCaretDown :size="22" />
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(["openProfilePopupEvent"]);
    function openProfilePopup() {
        emit("openProfilePopupEvent", [".profile-popup", true]);
    }
</script>

<style scoped lang="scss">
    .my-profile-card-component {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: 1fr;
        grid-template-areas: "my-profile-logo my-profile-text interchange-button";
        gap: 16px;
        width: 100%;
        background-color: var(--bs-gray-900);
        border-radius: 8px;
        color: var(--bs-white);
        padding: 12px;

        .my-profile-logo {
            width: 37px;
            height: 37px;
            border-radius: 50%;
            border: 1px solid var(--bs-white);
            grid-area: my-profile-logo;
        }

        .my-profile-text {
            grid-area: my-profile-text;
            margin: auto 0;
            .my-profile-name {
                font-family: "Poppins";
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 24px;
                /* identical to box height, or 200% */
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: var(--bs-white);
            }
        }

        .interchange-button {
            grid-area: interchange-button;
            margin: auto 0;
        }
    }
</style>
