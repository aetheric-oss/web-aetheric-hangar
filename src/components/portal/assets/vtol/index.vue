<template>
    <div class="container-fluid overflow-auto p-3">
        <div
            class="row row-cols-2 row-cols-sm-3 lg-2 xl-3 row-cols-xxl-4 g-2 g-xl-3 g-xxl-2"
        >
            <div v-for="(item, index) in aircraft" :key="index">
                <PortalAssetsVtolCard
                    :status="item.status"
                    :image="item.imgSrc"
                    :name="item.name"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { IAircraft } from "~/modules/aetheric-api";
    import {
        PredicateOperator,
        SortOrder,
    } from "~/modules/aetheric-api/runtime/types";

    import { useProfileStore } from "~/store/profile";

    const profileStore = useProfileStore();
    const user = ref(await profileStore.getUser());
    const currentCompany = useCurrentCompany();
    const $api = useAethericApi(currentCompany.value);

    // Reactive vars
    const { data: aircraft } = await useAsyncData<IAircraft[]>(
        "aircraft",
        async () => {
            let [data, success] = await $api.aircraft.filter({
                filters: [
                    {
                        search_field: "owner",
                        search_value: [currentCompany.value],
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
            watch: [currentCompany],
        }
    );
</script>
