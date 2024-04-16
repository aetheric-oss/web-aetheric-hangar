<template>
    <div
        data-bs-theme="default"
        class="d-flex flex-column flex-grow-1 pt-2 px-lg-2 px-xxl-3 pt-xxl-3"
    >
        <header class="px-2">
            <div class="hstack mb-3 gap-2 py-1 fs-5">
                <nuxt-link class="btn btn-icon" to="/flights/aircraft">
                    <IconArrowLeft size="1.5rem" class="text-primary" />
                </nuxt-link>
                <div
                    class="text-uppercase text-primary text-decoration-underline"
                >
                    flights
                </div>
                <IconCaretRight size="1.5rem" />
                <div
                    class="text-uppercase text-primary text-decoration-underline"
                >
                    aircraft
                </div>
                <IconCaretRight size="1.5rem" />
                <div class="text-uppercase">schedule flight</div>
            </div>
        </header>
        <Component :is="activePage" v-model:step="step" v-model:form="form" />
    </div>
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
        let minutes = (Math.ceil(date.getMinutes() / 5) * 5) + 10;
        let hours = date.getHours();
        if(minutes >= 60) {
            minutes -= 60;
            hours += 1;
        }
        return reactive({
            user_id: current_user.uuid,
            date: $moment(date).format('L'),
            start_hour: usePaddedZeros(hours),
            start_minute: usePaddedZeros(minutes),
            origin_vertiport: "",
            target_vertiport: "",
            cargo_weight_g: 1000,
        } as IBookFlight);
    });
    const step = ref(1);
    const activePage = computed(() => {
        // it doesn't like it when we just append the step value to the component string
        // like this: resolveComponent(`portal-flights-aircraft-schedule-flight${step.value}`);
        // we'll just check for each step option instead
        if (step.value == 3) {
            return resolveComponent("portal-flights-aircraft-schedule-flight-3");
        }
        if (step.value == 2) {
            return resolveComponent("portal-flights-aircraft-schedule-flight-2");
        }
        return resolveComponent("portal-flights-aircraft-schedule-flight-1");
    });
</script>
