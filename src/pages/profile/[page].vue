<template>
    <PortalHeader
        parent="profile"
        :menu-items="profileMenu"
        :active-page="activePage"
    />
    <Component :is="activePage?.component" />
</template>

<script setup lang="ts">
    useHead({ title: "profile" });
    definePageMeta({ layout: "portal" });
    const route = useRoute();
    const profileMenu = [
        {
            name: "Profile Settings",
            path: "settings",
            component: resolveComponent("portal-profile-settings"),
        },
        {
            name: "Privacy & Security",
            path: "privacy-and-security",
            component: resolveComponent("portal-profile-privacy-and-security"),
        },
        {
            name: "Payment",
            path: "payment",
            component: resolveComponent("portal-profile-payment"),
        }
    ];

    const activePage = computed(() => {
        for (const item of profileMenu) {
            if (item.path === route.params.page) {
                return item;
            }
        }
    });
</script>
