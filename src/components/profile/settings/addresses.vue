<template>
    <div class="m-auto w-100">
        <div class="d-flex">
            <h5 class="mx-0 my-2 flex-grow-1 align-self-center">Addresses</h5>
        </div>
        <div class="pe-2">
            <div
                v-for="(addr, index) in formattedAddresses"
                :key="index"
                class="pb-2"
            >
                <div class="d-flex gap-1">
                    <h6 class="fs-7 my-auto mx-0">
                        {{ addr.type }}
                        <span v-show="addr.name">: {{ addr.name }}</span>
                    </h6>
                    <div class="ms-auto">
                        <button
                            class="btn btn-icon text-primary"
                            @click="toggleMaskedStatus(index)"
                        >
                            <IconEye v-show="addr.isMasked" />
                            <IconEyeSlash size="20" v-show="!addr.isMasked" />
                        </button>
                        <AddressModal
                            :addressInfo="addr"
                            @update="updateAddress"
                        >
                            <IconPencil size="20" />
                        </AddressModal>
                    </div>
                </div>
                <div class="d-flex gap-1">
                    <div v-html="valueToDisplay(index)"></div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <AddressModal @add="addAddress">
                <span class="btn btn-outline-primary">Add New</span>
            </AddressModal>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, computed } from "vue";
    import AddressModal from "./address-modal.vue";

    const maskAddress = (addr: Address) => {
        return {
            address:
                addr.address.slice(0, 2) +
                "*".repeat(addr.address.length - 3) +
                addr.address.slice(-1),
            town: addr.town[0] + "*".repeat(addr.town.length - 1),
            state: addr.state[0] + "*".repeat(addr.state.length - 1),
            country:
                addr.country.slice(0, 2) + "*".repeat(addr.country.length - 2),
            postalCode:
                addr.postalCode.slice(0, 2) +
                "*".repeat(addr.postalCode.length - 2),
        };
    };
    const addresses: Array<AddressInfo> = [
        {
            type: "residence",
            address: {
                address: "1234 Main St",
                town: "San Francisco",
                state: "CA",
                country: "US",
                postalCode: "94111",
            },
            isMasked: true,
        },
        {
            type: "shipping",
            name: "NAME",
            address: {
                address: "1234 Main St",
                town: "San Francisco",
                state: "CA",
                country: "US",
                postalCode: "94111",
            },
            isMasked: true,
        },
    ];
    const formattedAddresses = reactive(
        addresses.map((info) => {
            return {
                ...info,
                maskedAddress: maskAddress(info.address),
                type:
                    info.type.replace(/\b\w/g, (l) => l.toUpperCase()) +
                    " Address",
            };
        })
    );
    const valueToDisplay = computed(() => {
        return (index: number) => {
            let address = formattedAddresses[index].isMasked
                ? formattedAddresses[index].maskedAddress
                : formattedAddresses[index].address;
            return `${address.address} <br>
        ${address.town}, ${address.state} <br>
        ${address.country} ${address.postalCode}`;
        };
    });
    const toggleMaskedStatus = (index: number) => {
        formattedAddresses[index].isMasked =
            !formattedAddresses[index].isMasked;
    };
    const addAddress = (address: AddressInfo) => {
        formattedAddresses.push({
            ...address,
            isMasked: true,
            maskedAddress: maskAddress(address.address),
        });
    };
    const updateAddress = (address: AddressInfo, index: number) => {
        formattedAddresses[index] = {
            ...address,
            isMasked: true,
            maskedAddress: maskAddress(address.address),
        };
    };
</script>
