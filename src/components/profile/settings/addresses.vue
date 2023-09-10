<template>
    <div class="m-auto w-100">
        <div class="d-flex">
            <h5 class="mx-0 my-2 flex-grow-1 align-self-center">Addresses</h5>
        </div>
        <div class="pe-2">
            <div v-for="(addr, index) in formattedAddresses" :key="index" class="pb-2">
                <div class="d-flex gap-1">
                    <h6 class="fs-7 my-auto mx-0">{{ addr.type }}</h6>
                    <div class="ms-auto">
                        <button class="btn m-0 p-0" @click="toggleMaskedStatus(index)">
                            <PhEye :size="20" color="#ff5e45" v-show="addr.isMasked"/>
                            <PhEyeSlash :size="20" color="#ff5e45" v-show="!addr.isMasked"/>
                        </button>
                        <button class="btn m-0 p-0" @click="toggleMaskedStatus(index)">
                            <PhPencil :size="20" color="#ff5e45" />
                        </button>
                    </div>
                </div>
                <div class="d-flex gap-1">
                    <div v-html="valueToDisplay(index)"></div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-outline-primary">Add New</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { PhPencil, PhEye, PhEyeSlash } from "@phosphor-icons/vue";
const maskedAddress = (address) => {
    return {
        line1: address.line1.slice(0, 2) + '*'.repeat(address.line1.length - 3) + address.line1.slice(-1),
        line2: '*'.repeat(address.line2.length),
        city: address.city[0] + '*'.repeat(address.city.length - 1),
        state: address.state[0] + '*'.repeat(address.state.length - 1),
        zip: address.zip.slice(0, 2) + '*'.repeat(address.zip.length - 2)
    };
}
const addresses =  [
    {
        type: 'residence',
        address: {
            line1: '1234 Main St',
            line2: 'Apt 123',
            city: 'San Francisco',
            state: 'CA',
            zip: '94111'
        },
        isMasked: true
    },
    {
        type: 'shipping',
        name: 'NAME',
        address: {
            line1: '1234 Main St',
            line2: 'Apt 123',
            city: 'San Francisco',
            state: 'CA',
            zip: '94111'
        },
        isMasked: true
    }
]
const formattedAddresses = reactive(addresses.map((info) => {
    return {
        ...info,
        maskedAddress: maskedAddress(info.address),
        type: info.type.replace(/\b\w/g, l => l.toUpperCase()) + ' Address'
    }
}))
const valueToDisplay = computed(() => {
    return (index) => {
        let address = formattedAddresses[index].isMasked ? formattedAddresses[index].maskedAddress : formattedAddresses[index].address;
        return `${address.line1} <br>
        ${address.line2}, ${address.city}, ${address.state} <br>
        ${address.zip}`;
    };
});
const toggleMaskedStatus = (index) => {
    formattedAddresses[index].isMasked = !formattedAddresses[index].isMasked;
};
</script>

