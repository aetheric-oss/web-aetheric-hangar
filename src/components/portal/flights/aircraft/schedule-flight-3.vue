<template>
    <div class="d-flex flex-column flex-grow-1">
        <h1 class="px-3 py-2 text-uppercase d-flex align-items-center">
            <span class="fw-bold pe-1">3. Flight</span>
            <span class="fw-light flex-grow-1">Booked</span>
        </h1>
        <article class="flex-grow-1 vstack gap-3">
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
        </article>
        <footer
            data-bs-theme="dark"
            class="d-flex align-self-bottom p-2 rounded-top mt-3"
        >
            <div class="vstack gap-2">
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
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
    // Reactive vars
    const step = defineModel("step", { default: 1 });
    const form = defineModel<IBookFlight>("form");
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
