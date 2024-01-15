<template #default>
    <div class="full-cover">
        <div class="nav-header" id="fixed-mobile-header">
            <router-link :to="'/dashboard'" class="navbar-brand">
                <div class="logo-svg">
                    <img src="/img/arrow-logo.png" alt="Arrow Logo"/>
                </div>
            </router-link>
            <div class="nav-buttons">
                <NotificationBell @openNotificationsPopupEvent="toggleNotificationsPopup"/>
                <div class="mobile-nav-close-btn" @click="showMobileNav">
                    <PhList size="22" color="white" />
                </div>
            </div>
        </div>
        <div class="nav" id="fullbar">
            <DashboardNavContent :isMobileNavVisible="isMobileNavVisible">
                <div class="nav-header">
                    <router-link :to="'/dashboard'" class="navbar-brand">
                        <div class="logo-svg">
                            <img src="/img/arrow-logo.png" alt="Arrow Logo" />
                        </div>
                    </router-link>
                    <div class="nav-buttons">
                        <NotificationBell @openNotificationsPopupEvent="toggleNotificationsPopup"/>
                        <div class="mobile-nav-close-btn" @click="hideMobileNav">
                            <PhX size="22" color="white" />
                        </div>
                    </div>
                </div>
            </DashboardNavContent>
        </div>
        <div class="portal-container-mobile overflow-y-scroll" id="main">
            <div>
                <!-- Page content -->
                <slot></slot>
            </div>
            <div id="modal-container" class="position-absolute">
            </div>
        </div>
    </div>
</template>


<script setup>
import { isMobile } from 'mobile-device-detect';
import { PhX, PhList } from "@phosphor-icons/vue";

const isMobileNavVisible = ref(false);
const showMobileNav = () => {
    isMobileNavVisible.value = true;
    const fullbar = document.getElementById('fullbar');
    fullbar.style.display = 'block';
};
const hideMobileNav = () => {
    isMobileNavVisible.value = false;
    const fullbar = document.getElementById('fullbar');
    fullbar.style.display = 'none';
};
const navPopupStore = useNavPopupStore();
const toggleNotificationsPopup = () => {
    navPopupStore.togglePopup('notifications-popup');
};
</script>

<style scoped lang="scss">
.full-cover {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-areas: "nav" "main";
    padding: 0;
    margin: 0;
    gap: 0;
    overflow: hidden;

    #fixed-mobile-header {
        grid-area: nav;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 500;
        padding-left: 28px;
        padding-right: 28px;
    }

    #fullbar {
        display: none;
        z-index: 1000;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw!important;
        height: 100vh!important;
    }

    #main {
        grid-area: main;
        overflow: auto;
        margin-top: 50px;
    }
}
.nav-header {
    background-color: var(--bs-dark);
    margin: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;

    .logo-svg {
        width: 100%;
        height: 100%;

        img {
            width: 80%;
            max-width: 150px;
            height: 100%;
            object-fit: contain;
            margin: 0 auto;
        }
    }

    .nav-buttons {
        display: flex;

        .notification-bell-container {
            margin: auto 0;
        }

        .mobile-nav-close-btn {
            margin: auto 0;
            padding: 4px 11px;
        }
    }
}
.portal-container-mobile {
    width: 100vw;
    height: 100vh;

    #main {
        grid-area: main;
    }
}
</style>
