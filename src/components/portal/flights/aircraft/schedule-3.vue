<template>
    <PortalContentBlock
        title="3. Flight"
        subtitle="Booked"
        v-model:error="error"
    >
        Your flight has been booked successfully. Thank you for choosing
        Aetheric!
        <div class="shadow rounded bg-white p-2">
            <div class="fw-bold">
                {{ form?.itinerary?.origin_vertiport }} -
                {{ form?.itinerary?.origin_vertipad }}
                <IconArrowRight size="1.5rem" />
                {{ form?.itinerary?.target_vertiport }} -
                {{ form?.itinerary?.target_vertipad }}
            </div>
            <div class="fw-bold">
                {{ form?.itinerary?.origin_start_time }} &euro;{{
                    form?.itinerary?.total_cost
                }}
                <span class="fw-normal text-muted">incl VAT</span>
            </div>
        </div>
    </PortalContentBlock>
    <PortalContentFooter>
        <div class="align-self-end">
            <div class="btn btn-primary shadow align-self-center">
                <IconSearch size="1rem" class="me-1" />Finish
            </div>
        </div>
        <div class="hstack gap-2">
            <hr
                class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
            />
            <hr
                class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
            />
            <hr
                class="border border-2 border-secondary flex-grow-1 opacity-100 mb-0"
            />
        </div>
    </PortalContentFooter>
</template>

<script setup lang="ts">
    // Reactive vars
    const step = defineModel("step", { default: 1 });
    const form = defineModel<IBookFlight>("form");
    const error = ref("");
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
