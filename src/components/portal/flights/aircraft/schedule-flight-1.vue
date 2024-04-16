<template>
    <div class="d-flex flex-column flex-grow-1">
        <h1 class="px-3 py-2 text-uppercase d-flex align-items-center">
            <span class="fw-bold pe-1">1. Schedule</span>
            <span class="fw-light flex-grow-1">Flight</span>
        </h1>
        <article class="px-2 flex-grow-1">
            <div class="alert alert-warning" v-show="error">{{ error }}</div>
            <form class="vstack gap-2">
                <div class="hstack gap-2">
                    <div class="fw-bold">Departure time</div>
                    <div class="calendar d-relative">
                        <v-date-picker
                            v-model="selected_date"
                            mode="date"
                            :min-date="Date.now()"
                            :masks="{ input: 'DD-MM-YYYY' }"
                        >
                            <template v-slot="{ inputValue, inputEvents }">
                                <div class="input-box d-flex">
                                    <div class="btn-icon ps-1">
                                        <IconCalendar size="2rem" />
                                    </div>
                                    <input
                                        class="form-control flex-grow-1"
                                        type="text"
                                        id="start_date"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                    />
                                </div>
                            </template>
                        </v-date-picker>
                    </div>
                    <IconClock size="2rem" />
                    <FormInputDropdown
                        id="hour"
                        placeholder="Hour"
                        v-model:input-value="form!.start_hour"
                        :items="hours"
                    />
                    <FormInputDropdown
                        id="minute"
                        placeholder="Minute"
                        v-model:input-value="form!.start_minute"
                        :items="minutes"
                    />
                </div>

                <div class="fw-bold">Shipping locations</div>
                <FormInputDropdown
                    id="origin_vertiport"
                    placeholder="Choose location"
                    v-model:input-value="form!.origin_vertiport"
                    label="Departure vertiport"
                    :items="vertiports"
                    left-icon="IconUser"
                />
                <FormInputDropdown
                    id="target_vertiport"
                    placeholder="Choose location"
                    v-model:input-value="form!.target_vertiport"
                    label="Arrival vertiport"
                    :items="vertiports"
                    left-icon="IconUser"
                />
                <FormInputText
                    id="cargo_weight_g"
                    type="number"
                    placeholder="Weight"
                    v-model:input-value="form!.cargo_weight_g"
                    label="Cargo Weight in grams"
                />
            </form>
        </article>
        <footer
            data-bs-theme="dark"
            class="d-flex align-self-bottom p-2 rounded-top"
        >
            <div class="vstack">
                <div class="fw-bold">
                    {{ selected_origin
                    }}<IconArrowRight class="mx-1" size="1.5rem" />{{
                        selected_target
                    }}
                </div>
                <div>{{ selected_date_time }}</div>
                <div class="align-self-end">
                    <button
                        class="btn btn-primary shadow align-self-center"
                        :disabled="!form || !form.origin_vertiport || !form.target_vertiport || !form.date"
                        @click="handleSubmit"
                    >
                        <IconSearch size="1rem" class="me-1" />Show Flights
                    </button>
                </div>
                <div class="hstack gap-2">
                    <hr
                        class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
                    />
                    <hr
                        class="border border-2 border-light flex-grow-1 opacity-100 mb-0"
                    />
                    <hr
                        class="border border-2 border-light flex-grow-1 opacity-100 mb-0"
                    />
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
    import type { IVertiport } from "~/modules/aetheric-api";

    const runtimeConfig = useRuntimeConfig();

    // TODO, this should be handled by a date module
    const hours = [...Array(24).keys()].reduce(function (
        map: IDropdownValues,
        index: number
    ) {
        map[("0" + (index + 1)).slice(-2)] = ("0" + (index + 1)).slice(-2);
        return map;
    },
    {});
    const minutes = {
        "0": "00",
        "5": "05",
        "10": "10",
        "15": "15",
        "20": "20",
        "25": "25",
        "30": "30",
        "35": "35",
        "40": "40",
        "45": "45",
        "50": "50",
        "55": "55",
    };

    // Reactive vars
    const step = defineModel("step", { default: 1 });
    const form = defineModel<IBookFlight>("form");
    const error = ref("");

    const { data: vertiports_list } = await useFetch<IVertiport[]>(
        "/assets/demo/vertiports",
        { baseURL: runtimeConfig.public.api.backends.assets }
    );
    const vertiports = computed<IDropdownValues>(() => {
        let values: IDropdownValues = {};
        if (vertiports_list.value) {
            vertiports_list.value.forEach((vertiport: IVertiport) => {
                values[vertiport.basics.id] = vertiport.basics.name;
            });
        }
        return values as IDropdownValues;
    });

    const selected_origin = computed<string>(() => {
        if (!form.value || form.value.origin_vertiport == "") {
            return "Choose departure vertiport";
        } else {
            return vertiports.value[form.value.origin_vertiport];
        }
    });
    const selected_target = computed<string>(() => {
        if (!form.value || form.value.target_vertiport == "") {
            return "Choose arrival vertiport";
        } else {
            return vertiports.value[form.value.target_vertiport];
        }
    });
    const selected_date = ref<string>(form.value!.date.toLocaleString());
    const selected_date_time = computed<string>(() => {
        let dateTimeStr = "";
        let timestamp = Date.parse(selected_date.value);
        if (timestamp) {
            let date = new Date(timestamp);
            dateTimeStr =
                usePaddedZeros(date.getDate()) +
                "-" +
                usePaddedZeros(date.getMonth() + 1) +
                "-" +
                date.getUTCFullYear();
            //add time
        }
        dateTimeStr +=
            " " +
            usePaddedZeros(form.value!.start_hour) +
            ":" +
            usePaddedZeros(form.value!.start_minute);

        return dateTimeStr;
    });

    // Functions
    const handleSubmit = async () => {
        form.value!.date = selected_date.value;
        step.value = 2;
    };
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
