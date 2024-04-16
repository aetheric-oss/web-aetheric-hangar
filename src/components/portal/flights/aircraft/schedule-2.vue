<template>
    <PortalContentBlock
        title="2. Choose"
        subtitle="Flight"
        v-model:error="error"
    >
        <div class="vstack gap-3 mx-5 mx-lg-3 mx-xl-5 px-md-5 px-lg-0 px-xl-5">
            <div
                class="shadow rounded bg-white"
                v-for="(itinerary, index) in displayData"
            >
                <div class="hstack m-3 p-2 bg-light-subtle">
                    <div class="col-5 vstack text-center">
                        <div class="fw-bold">
                            {{ itinerary.origin_start_time }}
                        </div>
                        <div class="h4 pt-2">
                            {{ itinerary.origin_vertiport }} -
                            {{ itinerary.origin_vertipad }}
                        </div>
                    </div>
                    <IconArrowRight class="col-2" size="1.5rem" />
                    <div class="col-5 vstack text-center">
                        <div class="fw-bold">
                            {{ itinerary.target_start_time }}
                        </div>
                        <div class="h4 pt-2">
                            {{ itinerary.target_vertiport }} -
                            {{ itinerary.target_vertipad }}
                        </div>
                    </div>
                </div>
                <div class="px-3 pb-3 fs-4">
                    &euro;{{ itinerary.total_cost }}
                    <span class="text-gray">incl VAT</span>
                </div>
                <div
                    v-if="
                        selectedItinerary &&
                        selectedItinerary.id == itinerary.id
                    "
                    class="bg-secondary rounded-bottom text-center text-white py-2"
                >
                    <IconCheck size="1.5rem" /> Selected
                </div>
                <div v-else class="text-center py-2">
                    <button
                        class="btn btn-primary btn-lg shadow py-0"
                        @click="selectItinerary(itinerary)"
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    </PortalContentBlock>
    <PortalContentFooter>
        <template v-if="selectedItinerary">
            <div>Selected flight</div>
            <div class="fw-bold">
                {{ selectedItinerary?.origin_vertiport }} -
                {{ selectedItinerary?.origin_vertipad }}
                <IconArrowRight size="1.5rem" />
                {{ selectedItinerary?.target_vertiport }} -
                {{ selectedItinerary?.target_vertipad }}
            </div>
            <div class="fw-bold">
                {{ selectedItinerary?.origin_start_time }} &euro;{{
                    selectedItinerary?.total_cost
                }}
                <span class="fw-normal text-muted">incl VAT</span>
            </div>
        </template>
        <template v-else> Please select a flight </template>
        <div class="align-self-end">
            <button
                class="btn btn-primary shadow align-self-center"
                :disabled="!selectedItinerary"
                @click="handleSubmit"
            >
                <IconSearch size="1rem" class="me-1" />Book Flight
            </button>
        </div>
        <div class="hstack gap-2">
            <hr
                class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
            />
            <hr
                class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
            />
            <hr
                class="border border-2 border-light flex-grow-1 opacity-100 mb-0"
            />
        </div>
    </PortalContentFooter>
</template>

<script setup lang="ts">
    import type { IVertiport, IVertipad } from "~/modules/aetheric-api";
    import { computedAsync } from "@vueuse/core";

    const runtimeConfig = useRuntimeConfig();
    const { $moment } = useNuxtApp();

    // Functions
    const handleSubmit = async () => {
        form.value!.itinerary = selectedItinerary.value;
        await useFetch<IItinerary[]>("/cargo/create", {
            method: "PUT",
            body: {
                user_id: form.value!.user_id,
                id: form.value!.itinerary?.id,
            },
            baseURL: runtimeConfig.public.api.backends.cargo,
        });
        step.value = 3;
    };
    const getVertiport = async (vertiport_id: string) => {
        const { data: vertiport } = await useFetch<IVertiport>(
            "/assets/vertiports/" + vertiport_id,
            { baseURL: runtimeConfig.public.api.backends.assets }
        );
        return vertiport;
    };
    const getVertiportName = async (vertiport_id: string) => {
        let pad = await getVertiport(vertiport_id);
        if (pad.value) {
            return pad.value.basics.name;
        }
        return "Unknown";
    };

    const getVertipad = async (vertipad_id: string) => {
        const { data: vertipad } = await useFetch<IVertipad>(
            "/assets/vertipads/" + vertipad_id,
            { baseURL: runtimeConfig.public.api.backends.assets }
        );
        return vertipad;
    };
    const getVertipadName = async (vertipad_id: string) => {
        let pad = await getVertipad(vertipad_id);
        if (pad.value) {
            return pad.value.basics.name;
        }
        return "Unknown";
    };
    const selectItinerary = async (itinerary: IItineraryDisplayData) => {
        selectedItinerary.value = itinerary;
    };
    const totalItineraryPrice = (invoice: IInvoiceItem[]) => {
        let total_cost = 0;
        invoice.forEach((item: IInvoiceItem) => {
            total_cost += item.cost;
        });
        return total_cost;
    };
    const getDisplayDate = (timestamp: number) => {
        let date = new Date(timestamp);
        let dateTimeStr = "";
        dateTimeStr =
            usePaddedZeros(date.getDate()) +
            "-" +
            usePaddedZeros(date.getMonth() + 1) +
            "-" +
            date.getUTCFullYear();
        return dateTimeStr;
    };

    const getDisplayDateTime = (timestamp: number) => {
        let date = new Date(timestamp);
        let dateTimeStr = getDisplayDate(timestamp);
        dateTimeStr +=
            " " +
            usePaddedZeros(date.getHours()) +
            ":" +
            usePaddedZeros(date.getMinutes());

        return dateTimeStr;
    };

    // Reactive vars
    const step = defineModel("step", { default: 1 });
    const form = defineModel<IBookFlight>("form");
    const error = ref("");

    const selectedOrigin = ref<string>(
        await getVertiportName(form.value!.origin_vertiport)
    );
    const selectedTarget = ref<string>(
        await getVertiportName(form.value!.target_vertiport)
    );
    const selectedItinerary = ref<IItineraryDisplayData>();
    const { data: itineraries } = await useFetch<IItinerary[]>(
        "/cargo/request",
        {
            method: "POST",
            body: {
                user_id: form.value!.user_id,
                origin_vertiport_id: form.value!.origin_vertiport,
                target_vertiport_id: form.value!.target_vertiport,
                time_depart_window: {
                    timestamp_min:
                        $moment(form.value!.date, "MM/DD/YYYY").format(
                            "YYYY-MM-DD"
                        ) +
                        "T" +
                        form.value!.start_hour +
                        ":" +
                        form.value!.start_minute +
                        ":00+02:00",
                    timestamp_max: $moment(
                        $moment(form.value!.date, "MM/DD/YYYY").format(
                            "YYYY-MM-DD"
                        ) +
                            "T" +
                            form.value!.start_hour +
                            ":" +
                            form.value!.start_minute +
                            ":00+02:00"
                    )
                        .add("30", "m")
                        .format(),
                },
                cargo_weight_g: form.value!.cargo_weight_g,
            },
            baseURL: runtimeConfig.public.api.backends.cargo,
        }
    );

    const displayData = computedAsync(async () => {
        let result: IItineraryDisplayData[] = [];
        if (itineraries.value) {
            for (const itinerary of itineraries.value) {
                const total_cost = totalItineraryPrice(
                    itinerary.itinerary.invoice
                );
                let origin_vertiport = "";
                let origin_vertipad = "";
                let origin_start_time = "";
                let target_vertiport = "";
                let target_vertipad = "";
                let target_start_time = "";
                for (const flight_plan of itinerary.itinerary.flight_plans) {
                    if (
                        flight_plan.origin_vertiport_id ==
                        form.value?.origin_vertiport
                    ) {
                        origin_vertiport = await getVertiportName(
                            flight_plan.origin_vertiport_id
                        );
                        origin_vertipad = await getVertipadName(
                            flight_plan.origin_vertipad_id
                        );
                        origin_start_time = getDisplayDateTime(
                            Date.parse(flight_plan.origin_timeslot_start)
                        );
                    }
                    if (
                        flight_plan.target_vertiport_id ==
                        form.value?.target_vertiport
                    ) {
                        target_vertiport = await getVertiportName(
                            flight_plan.target_vertiport_id
                        );
                        target_vertipad = await getVertipadName(
                            flight_plan.target_vertipad_id
                        );
                        target_start_time = getDisplayDateTime(
                            Date.parse(flight_plan.target_timeslot_end)
                        );
                    }
                }
                result.push({
                    id: itinerary.id,
                    origin_vertiport,
                    origin_vertipad,
                    target_vertiport,
                    target_vertipad,
                    origin_start_time,
                    target_start_time,
                    total_cost:
                        Math.round((total_cost + Number.EPSILON) * 100) / 100,
                } as IItineraryDisplayData);
            }
        }
        return result;
    });
</script>
<style>
    .calendar .vc-container {
        --vc-bg: var(--bs-secondary-bg);
        --vc-color: var(--bs-secondary-color);
    }
    .vc-teal {
        --vc-accent-600: var(--bs-secondary);
    }
    .vc-orange {
        --vc-accent-600: var(--bs-primary);
    }
</style>
