<template>
    <PortalHeader
        parent="flights/aircraft"
        :menu-items="[]"
        :active-page="activePage"
    />
    <Component :is="activePage?.component" v-model:form="form" />
</template>

<script setup lang="ts">
    useHead({ title: "My Flights" });
    definePageMeta({ layout: "portal" });

    import { useProfileStore } from "~/store/profile";

    const { $moment } = useNuxtApp();
    const current_user = await useProfileStore().getUser();

    // Reactive vars
    const form = useState<IBookFlight>("bookFlight", () => {
        let date = new Date();
        let minutes = Math.ceil(date.getMinutes() / 5) * 5 + 10;
        let hours = date.getHours();
        if (minutes >= 60) {
            minutes -= 60;
            hours += 1;
        }
        return reactive({
            user_id: current_user.uuid,
            date: $moment(date).format("L"),
            start_hour: usePaddedZeros(hours),
            start_minute: usePaddedZeros(minutes),
            origin_vertiport: "",
            target_vertiport: "",
            cargo_weight_g: 1000,
        } as IBookFlight);
    });
    const route = useRoute();
    const scheduleMenu: ISubMenuItem[] = [
        {
            name: "schedule",
            path: "1",
            component: resolveComponent("portal-flights-aircraft-schedule-1"),
        },
        {
            name: "schedule",
            path: "2",
            component: resolveComponent("portal-flights-aircraft-schedule-2"),
        },
        {
            name: "schedule",
            path: "3",
            component: resolveComponent("portal-flights-aircraft-schedule-3"),
        },
    ];

    const activePage = computed(() => {
        for (const item of scheduleMenu) {
            if (item.path === route.params.page) {
                return item;
            }
        }
    });
</script>
