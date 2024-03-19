<template></template>

<script setup lang="ts">
    import type { IAircraft } from "~/modules/aetheric-api";
    import {
        PredicateOperator,
        SortOrder,
    } from "~/modules/aetheric-api/runtime/types";

    import { useProfileStore } from "~/store/profile";

    const profileStore = useProfileStore();
    const user = ref(await profileStore.getUser());
    const $api = useAethericApi(useCurrentCompany());

    // Reactive vars
    const { data: aircraft } = await useAsyncData<IAircraft[]>(
        "aircraft",
        async () => {
            let [data, success] = await $api.aircraft.filter({
                filters: [
                    {
                        search_field: "owner",
                        search_value: [useCurrentCompany().value],
                        predicate_operator: PredicateOperator.EQUALS,
                    },
                ],
                page_number: 0,
                results_per_page: 50,
                order_by: [{ sort_field: "name", sort_order: SortOrder.ASC }],
            });
            if (success) {
                return data;
            } else {
                return [] as IAircraft[];
            }
        },
        {
            default: () => {
                return [] as IAircraft[];
            },
            watch: [user.value],
        }
    );
</script>
