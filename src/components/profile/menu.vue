<template>
    <!-- Page content -->
    <div id="profile-app">
        <div class="profile-base">
            <h3 class="m-0">My Profile</h3>
            <div class="profile-menu d-flex gap-1 w-100 py-1">
                <router-link :to="item.path" v-for="(item, index) in profileMenu" :key="index">
                    <div class="profile-menu-item rounded-pill" :class="{ 'active-profile': activePageIndex == index}">
                        <h5 class="profile-menu-item-text text-light">
                            {{ item.name }}
                        </h5>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="profile-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import Settings from '../../pages/profile/settings.vue';
import PrivacyAndSecurity from '../../pages/profile/privacy-and-security.vue';
import Payment from '../../pages/profile/payment.vue';
import { onMounted } from "vue";
const props = defineProps({
    activePageIndex: {
        type: Number,
        required: false,
        default: 0
    }
});
const profileMenu = [
    {
        name: 'Profile Settings',
        path: '/profile/settings',
        component: Settings
    },
    {
        name: 'Privacy & Security',
        path: '/profile/privacy-and-security',
        component: PrivacyAndSecurity
    },
    {
        name: 'Payment',
        path: '/profile/payment',
        component: Payment
    }
];
onMounted(() => {
    const main = document.getElementById('main');
    main.classList.add('dark-bg');
});
</script>

<style scoped lang="scss">
.profile-base {
    h2 {
        margin:0;
    }
    .profile-menu {
        /* Enable horizontal scroll if content overflows */
        overflow-x: auto;
        overflow-y: hidden;

        a {
            text-decoration: none!important;
        }

        .profile-menu-item {
            background-color: $gray-dark;
            padding: 8px 16px;
            height: 34px;
            white-space: nowrap; /* Prevent text wrapping */
            min-width: 50px; /* Set a fixed width for the items */
        }

        .active-profile {
            background-color: $gray-dark-mild3;
        }
    }
}
</style>
