<template>
    <nav
        id="sidebar"
        class="nav p-3 flex-column"
        data-bs-theme="dark"
    >
        <div class="nav-item d-flex">
            <router-link
                :to="'/dashboard'"
                class="btn btn-link flex-grow-1 text-start"
            >
                <img src="/img/logo-services.svg" alt="Arrow Logo" />
            </router-link>
            <NotificationBell
                @openNotificationsPopupEvent="toggleNotificationsPopup"
            />
        </div>

        <PortalNavAccordion class="accordion" />

        <div class="nav-footer">
            <PortalNavNeedHelp />
            <PortalNavCurrentBusinessAccount
                @openBusinessChangePopup="toggleAccountPopup"
                :business="currentBusiness"
            />
            <PortalNavMyProfileCard
                @openProfilePopupEvent="toggleProfilePopup"
            />
        </div>

        <!-- Popups -->
        <PortalNavPopupsAccount
            @closeBusinessChangePopup="toggleAccountPopup"
            v-if="navPopupStore.accountPopup"
        />
        <PortalNavPopupsProfile
            @closeProfilePopupEvent="toggleProfilePopup"
            v-if="navPopupStore.profilePopup"
        />
        <PortalNavPopupsNotifications
            @closeNotificationsPopupEvent="toggleNotificationsPopup"
            v-if="navPopupStore.notificationsPopup"
        />
    </nav>
</template>

<script setup>
    const profileStore = useProfileStore();
    const currentBusiness = profileStore.getCurrentBusiness;

    const navPopupStore = useNavPopupStore();
    const toggleAccountPopup = () => {
        navPopupStore.togglePopup("business-popup");
    };
    const toggleProfilePopup = () => {
        navPopupStore.togglePopup("profile-popup");
    };
    const toggleNotificationsPopup = () => {
        navPopupStore.togglePopup("notifications-popup");
    };
</script>
