<template>
    <PortalHeader
        parent="assets/my-assets"
        :menu-items="assetsMenu"
        :active-page="activePage"
    />
    <Component :is="activePage?.component" />
</template>

<script setup lang="ts">
    useHead({ title: "My Assets" });
    definePageMeta({ layout: "portal" });
    const route = useRoute();
    const assetsMenu: ISubMenuItem[] = [
        {
            name: "(e)VTOL Aircraft",
            path: "vtol",
            component: resolveComponent("portal-assets-vtol"),
        },
        {
            name: "Vertipods & Pads",
            path: "vertipods-and-pads",
            component: resolveComponent("portal-assets-pods-and-pads"),
        },
        {
            name: "Pilots",
            path: "pilots",
            component: resolveComponent("portal-assets-pilots"),
        },
        {
            name: "Hangar",
            path: "hangar",
            component: resolveComponent("portal-assets-hangar"),
        },
        {
            name: "Rechargers",
            path: "rechargers",
            component: resolveComponent("portal-assets-hangar"),
        },
    ];

    const activePage = computed(() => {
        for (const item of assetsMenu) {
            if (item.path === route.params.page) {
                return item;
            }
        }
    });
</script>
