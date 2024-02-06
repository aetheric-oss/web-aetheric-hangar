<template>
    <div data-bs-theme="dark" class="h-100 px-2 p-xxl-3">
        <PortalProfileMenu
            :menu-items="profileMenu"
            @menu-clicked="changePage"
        />
        <Component :is="activePage" />
    </div>
</template>

<script setup lang="ts">
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
