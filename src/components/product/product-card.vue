<template #image>
    <div :class="cardColor" class="shadow card d-flex justify-content-center align-items-center position-relative z-0"
        @mouseover="showButton"
        @mouseleave="hideButton">
        <button v-if="viewButton"
            class="btn btn-primary rounded position-absolute start-50 translate-middle z-2">
            View
        </button>
        <div class="position-absolute top-0 end-0 z-3">
            <ProductSettings v-bind:menu="menu" @closeMenu="updateMenu"/>
        </div>
        <article class="pe auto">
            <div class="p-1 battery">
                <span class="battery-bar"></span>
            </div>
            <section class="status gap-1">
                <header class="header">
                    <div class="d-flex justify-content-between align-items-center p-2">
                        <div class="btn-block w-60" :style="{ opacity: viewButton ? '0.5' : '1' }">
                            <span :style="dynamicStatusStyle" :class="textColor" class="btn pe-none btn-block">{{ formattedStatus }}</span>
                        </div>
                        <DotsThreeOutline class="pe-auto fill-orange" size="2.5rem" weight="fill" @click="updateMenu" />
                    </div>
                </header>
                <div class="text-center bg-card">
                    <div class="p-2">
                        <img class="mx-auto z-1"
                            :src="image"
                            alt="Login Arrow Background"
                            loading="lazy"
                            :style="{ opacity: viewButton ? '0.5' : '1', maxWidth: '100%' }">
                    </div>
                    <div class="title">
                        <h6 class="rounded-0 gap-1 text-center drone-title">{{ name }}</h6>
                    </div>
                </div>
            </section>
        </article>
    </div>
</template>

<style lang="scss">

.card {
    width: 218px;
    height: 230px;
}

.card:hover {
    background: #090F29;
    opacity: 0.8;
    cursor: pointer;
}

.active {
    background-color: #ffffff;
    opacity: 1;
}

.inactive {
    background-color: #ECEDFECC;
    opacity: 0.8;
}


.header {
    height: 56px;
}

.battery {
    background-color: var(--bs-blue-150);
    height: 8px;
}

.battery-bar {
    background-color: var(--bs-battery-green);
}

.title {
    width: 218px;
    height: 60px;
    padding: 10px;
    gap: 10px
}

.drone-title {
    font-family:'Libre Baskerville';
}
</style>

<script setup lang="ts">
import { getCardColor, getStatusColor, getTextColor } from '@/utils/product-state';

const props = defineProps({
    status: { type: String, required: true },
    image: { type: String, default: null },
    name: { type: String, default: null },
    menu: { type: Boolean, default: false },
});

const formatStatus = (status: string): string => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

const formattedStatus = formatStatus(props.status);
const cardColor = ref<string>(getCardColor(formattedStatus));
const statusColor = getStatusColor(formatStatus(formattedStatus));
const textColor = getTextColor(formatStatus(formattedStatus));
const viewButton = ref(false);
const menu = ref(false);


const dynamicStatusStyle = computed(() => ({
    'background-color': statusColor.backgroundColor
}));

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

