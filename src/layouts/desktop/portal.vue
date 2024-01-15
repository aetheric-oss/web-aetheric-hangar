<template #default>
    <div class="portal-page">
        <div class="container-fluid portal-container">
            <div class="nav" id="sidebar">
                <!-- Sidebar content -->
                <DashboardNavContent>
                    <div class="nav-header row m-0 d-grid gap-1">
                        <router-link :to="'/dashboard'" class="navbar-brand">
                            <div class="logo-svg w-100 h-100">
                                <img src="/img/arrow-logo.png" alt="Arrow Logo" class="h-100 my-auto mx-0"/>
                            </div>
                        </router-link>
                        <NotificationBell @openNotificationsPopupEvent="toggleNotificationsPopup"/>
                    </div>
                </DashboardNavContent>
            </div>
            <div id="main" class="overflow-y-scroll">
                <div>
                    <!-- Page content -->
                    <slot></slot>
                </div>
                <div id="modal-container" class="position-absolute">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const navPopupStore = useNavPopupStore();
const toggleNotificationsPopup = () => {
    navPopupStore.togglePopup('notifications-popup');
};
</script>

<style scoped lang="scss">
.nav-header {
    background-color: var(--bs-dark);
    padding: 5px 0;
    grid-template-columns: 1fr auto;
    grid-template-areas: "navbar-brand-logo notification-bell";

    .navbar-brand {
        grid-area: navbar-brand-logo;

        .logo-svg {
            // width: 100%;
            // height: 100%;

            img {
                width: 150px;
                max-width: 200px;
                // height: 100%;
                object-fit: contain;
                // margin: 0 auto;
            }
        }
    }

    .notification-bell-container {
        grid-area: notification-bell;
        margin: auto 0;
    }
}
.portal-page {
    height: 100vh;
}
.portal-container {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas: "side-nav main";
    padding: 0;

    #sidebar {
        height: 100vh;
        width: 100%;
        min-width: 300px;
        grid-area: side-nav;
        background-color: var(--bs-dark);

        .side-nav {
            padding-top: 15px;
        }
    }

    #main {
        grid-area: main;
    }
}
</style>
