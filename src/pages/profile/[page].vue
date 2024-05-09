<template>
    <div data-bs-theme="default" class="h-100">
        <PortalProfileMenu
            :menu-items="profileMenu"
            @menu-clicked="changePage"
        />
        <Component :is="activePage" />
    </div>
</template>

<script setup lang="ts">
    useHead({title: "profile"})
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
        },
        {
            name: "Hangar",
            path: "hangar",
            component: resolveComponent("portal-assets-hangar"),
        },
        {
            name: "Rechargers",
            path: "rechargers",
            component: resolveComponent("portal-assets-rechargers"),
        },
    ];

    const activePage = shallowRef(profileMenu[0].component);
    for (const item of profileMenu) {
        if (item.path === route.params.page) {
            activePage.value = item.component;
        }
    }

    const changePage = (index: number) => {
        activePage.value = profileMenu[index].component;
    };
</script>
