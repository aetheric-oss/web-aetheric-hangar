<template>
    <div
        class="shadow card justify-content-center z-0 position-relative"
        @mouseover="showButton"
        @mouseleave="hideButton"
    >
        <!--card layers and overlays-->
        <div
            v-if="cardState === 'inactive'"
            class="rounded position-absolute top-0 start-0 h-100 w-100 z-1 bg-light opacity-75"
        ></div>
        <div
            v-if="viewButton"
            class="rounded position-absolute top-0 start-0 h-100 w-100 z-2 bg-dark opacity-75"
        ></div>
        <button
            v-if="viewButton"
            class="btn btn-primary rounded position-absolute top-50 start-50 translate-middle z-2"
        >
            View
        </button>
        <div class="position-absolute top-0 end-0 z-3">
            <PortalAssetsVtolSettings v-bind:menu="menu" @closeMenu="updateMenu" />
        </div>
        <!--end card layers and overlays-->

        <section class="card-body rounded d-flex flex-column bg-white p-1 p-lg-2">
            <div class="p-1 battery d-none">
                <span class="battery-bar"></span>
            </div>
            <header class="hstack">
                <div class="flex-grow-1 z-1">
                    <span :class="badgeColor" class="badge rounded-pill">{{
                        formattedStatus
                    }}</span>
                </div>
                <IconDotsThreeOutline
                    class="btn btn-link pe-auto fill-orange position-relative z-2"
                    size="3rem"
                    weight="fill"
                    @click="updateMenu"
                />
            </header>
            <div class="d-flex justify-content-center flex-grow-1">
                <img
                    class="align-self-center"
                    :src="image"
                    alt="Login Arrow Background"
                    loading="lazy"
                />
            </div>
            <div class="card-title rounded-0 gap-1 text-center text-uppercase">
                {{ name }}
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
    import { getCardState, getBadgeColor } from "@/utils/product-state";

    const props = defineProps({
        status: { type: String, required: true },
        image: { type: String, default: null },
        name: { type: String, default: null },
        menu: { type: Boolean, default: false },
    });

    const formatStatus = (status: string): string => {
        return status
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
    };

    const formattedStatus = formatStatus(props.status);
    const cardState = ref<string>(getCardState(formattedStatus));
    const badgeColor = getBadgeColor(formatStatus(formattedStatus));
    const viewButton = ref(false);
    const menu = ref(false);

    const showButton = () => {
        viewButton.value = true;
    };

    const hideButton = () => {
        viewButton.value = false;
    };

    const updateMenu = (value: boolean) => {
        menu.value = value;
    };
</script>

<style lang="scss" scoped>
    .badge {
        --bs-badge-padding-x: 0.85em;
        --bs-badge-padding-y: 1em;
        text-transform: uppercase;
    }
    .text-bg-warning,
    .text-bg-300 {
        color: white !important;
    }

    .battery {
        background-color: var(--bs-blue-150);
        height: 8px;
    }

    .battery-bar {
        background-color: var(--bs-battery-green);
    }
</style>
