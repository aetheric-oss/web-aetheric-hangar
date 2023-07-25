<template>
    <div
        :class="{'side-nav': true, 'mobile-nav':isMobile}">
        <slot></slot>
        <!-- for loop over pages and make a accordion component for each dict object -->
        <div :class="{'menu-accordians': true, 'dark-bg-menu':isMobile}">
            <div v-for="(category, index) in pages" :key="index">
                <Accordion
                    :id="index"
                    :title="category.name"
                    :icon="category.icon"
                    :items="category.pages"
                />
            </div>
        </div>
        <div class="nav-footer">
            <NeedHelp />
            <CurrentBusinessAccount @openBusinessChangePopup="toggleAccountPopup" :business="currentBusiness"/>
            <MyProfileCard @openProfilePopupEvent="toggleProfilePopup" />
        </div>
        <!-- Popups -->
        <AccountPopup @closeBusinessChangePopup="toggleAccountPopup" v-if="navPopupStore.accountPopup" />
        <ProfilePopup @closeProfilePopupEvent="toggleProfilePopup" v-if="navPopupStore.profilePopup"/>
        <NotificationsPopup @closeNotificationsPopupEvent="toggleNotificationsPopup" v-if="navPopupStore.notificationsPopup"/>
    </div>
</template>

<script setup>
import { isMobile } from 'mobile-device-detect';
import Accordion from '@/components/nav/accordion.vue';
import NeedHelp from '@/components/nav/need-help.vue';
import CurrentBusinessAccount from '@/components/nav/current-business-account.vue';
import MyProfileCard from '@/components/nav/my-profile-card.vue';
import AccountPopup from '@/components/nav/nav-popups/account-popup.vue';
import ProfilePopup from '@/components/nav/nav-popups/profile-popup.vue';
import NotificationsPopup from '@/components/nav/nav-popups/notifications-popup.vue';

const props = defineProps({
    isMobileNavVisible: Boolean
});
const pagesStore = usePagesMenuStore();
const pages = pagesStore.getCategories;

const profileStore = useProfileStore();
const currentBusiness = profileStore.getCurrentBusiness;

const navPopupStore = useNavPopupStore();
const toggleAccountPopup = () => {
    navPopupStore.togglePopup('business-popup');
};
const toggleProfilePopup = () => {
    navPopupStore.togglePopup('profile-popup');
};
const toggleNotificationsPopup = () => {
    navPopupStore.togglePopup('notifications-popup');
};
</script>

<style scoped lang="scss">
.mobile-nav {
    height: inherit;
    width: inherit;
    background-color: $primary-dark !important;
}
.side-nav {
    width: 100%;
    height: 100%;
    padding: 0 28px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background-color: $primary-dark;

    .header {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "navbar-brand-logo notification-bell";
        grid-gap: 16px;
        margin-bottom: 32px;

        .navbar-brand {
            grid-area: navbar-brand-logo;
        }

        .notification-bell-container {
            grid-area: notification-bell;
            margin: auto 0;
        }
    }

    .menu-accordians {
        flex-grow: 1; /* Allow the section to grow and occupy remaining space */
        overflow-y: auto; /* Enable vertical scroll if content overflows */
        margin: 10px 0;
    }

    .dark-bg-menu {
        background-color: var(--bs-black);
    }

    .nav-footer {
        // push to bottom
        margin-top: auto;
        display: grid;
        gap: 12px;

    }
    .popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 11px 9px;
        width: 100%;
    }
}
</style>
