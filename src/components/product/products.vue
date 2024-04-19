<template>
    <div class="container-fluid overflow-auto p-3">
        <div v-for="(item, index) in aircrafts" :key="index">
            <div v-if="index % 4 === 0" class="row my-3">
                <div v-for="innerIndex in 4" :key="innerIndex" class="col-12 col-md-6 col-lg-3">
                    <ProductCard
                        :status="aircrafts[index + innerIndex - 1].status"
                        :image="aircrafts[index + innerIndex - 1].imgSrc"
                        :name="aircrafts[index + innerIndex - 1].name"
                    />
                </div>
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

const aircrafts = ref<Aircraft[]>([]);

const retrieveAircraftData = () => {
    const aircraftData = localStorage.getItem('mock/store/aircraft');
    if (aircraftData) {
        const parsedData = JSON.parse(aircraftData);
        aircrafts.value = Object.values(parsedData);
    }
}

onMounted(() => {
    retrieveAircraftData();
});

</script>
