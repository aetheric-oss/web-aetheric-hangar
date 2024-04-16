<template>
    <div data-bs-theme="default" class="d-flex flex-column flex-grow-1 px-2 p-lg-2 p-xxl-3">
        <PortalSubMenu
            parent="flights"
            :menu-items="flightsMenu"
            :active-page="activePage"
        />
        <Component :is="activePage?.component" />
    </div>
</template>

<script setup lang="ts">
    useHead({title: "My Flights"})
    definePageMeta({ layout: "portal" });
    const route = useRoute();
    const flightsMenu: ISubMenuItem[] = [
        {
            name: "Aircraft",
            path: "aircraft",
            component: resolveComponent("portal-flights-aircraft"),
        },
        {
            name: "Vertiports",
            path: "vertiports",
            component: resolveComponent("portal-flights-vertiports"),
        },
        {
            name: "Hangars",
            path: "hangars",
            component: resolveComponent("portal-flights-hangars"),
        },
    ];

    const activePage = computed(() => {
        for (const item of flightsMenu) {
            if (item.path === route.params.page) {
                return item ;
            }
        }
    });
</script>
