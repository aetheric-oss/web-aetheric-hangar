<template>
    <div class="container-fluid overflow-auto p-3">
        <div class="row row-cols-2 row-cols-sm-3 lg-2 xl-3 row-cols-xxl-4 g-2 g-xl-3 g-xxl-2">
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

interface Aircraft {
    uuid: string;
    name: string;
    imgSrc: string;
    status: string;
}

const aircraft = ref<Aircraft[]>([]);

const retrieveAircraftData = () => {
    const aircraftData = localStorage.getItem('mock/store/aircraft');
    if (aircraftData) {
        const parsedData = JSON.parse(aircraftData);
        aircraft.value = Object.values(parsedData);
    }
}

onMounted(() => {
    retrieveAircraftData();
});

</script>
