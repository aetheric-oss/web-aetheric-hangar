<template>
    <div data-bs-theme="default" class="h-100 bg-muted-blue">
        <PortalAssetsMenu
            :menu-items="assetsMenu"
            @menu-clicked="changePage"
        />
        <Component :is="activePage" class="bg-main"/>
        <PortalProfileConfigBar />
        <ProductProducts />
    </div>
</template>

<script setup lang="ts">

    useHead({title: "My Assets"})
    definePageMeta({ layout: "portal" });
    const route = useRoute();
    const assetsMenu = [
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

    const activePage = shallowRef(assetsMenu[0].component);
    for (const item of assetsMenu) {
        if (item.path === route.params.page) {
            activePage.value = item.component;
        }
    }

    const changePage = (index: number) => {
        activePage.value = assetsMenu[index].component;
    };
</script>
