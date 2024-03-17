<template>
    <div class="m-auto w-100">
        <div class="vstack mb-2">
            <h5 class="text-muted text-uppercase">Addresses</h5>
            <div v-for="(addr, index) in addresses" :key="index" class="mb-1">
                <div class="hstack gap-1 text-muted text-uppercase small">
                    {{ addressTypes[addr.type] }}
                    <span v-show="addr.name">: {{ addr.name }}</span>
                    <PortalProfileMaskToggle
                        ref="maskToggle"
                        :key="index"
                        :maskedValue="maskedAddress(addr)"
                        :clearValue="addr"
                    />
                    <PortalPopupIcon
                        class="ms-auto text-primary"
                        icon="IconPencil"
                        target="popupProfileSettingsAddresses"
                        @click="selectAddress(index)"
                    />
                </div>
                <div class="d-flex" v-html="valueToDisplay(index)"></div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <PortalPopupButton
                class="btn-outline-primary"
                title="Add New"
                target="popupProfileSettingsAddresses"
                @click="selectAddress(-1)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useDropdownValuesStore } from "~/store/dropdown_values";
    import type { PortalProfileMaskToggle } from "#build/components";
    import type { IAddress} from "~/modules/aetheric-api";

    const dropdownValues = useDropdownValuesStore();

    const props = defineProps({
        addresses: {
            type: Array as PropType<IAddress[] | null>,
            required: true,
        },
    });

    const addressTypes = toRaw(dropdownValues.addressTypes);
    const countries = toRaw(dropdownValues.countries);

    // Reactive vars
    const maskToggle = ref<Array<typeof PortalProfileMaskToggle>>([]);

    // Compute display based on maskToggle state for the given index
    const valueToDisplay = computed(() => {
        return (index: number) => {
            if (maskToggle.value.length && maskToggle.value[index]) {
                const toggle = maskToggle.value[index];
                let address: IAddress = toggle.getDisplayValue();
                let country = toggle.isMasked
                    ? address.country_code
                    : countries[address.country_code];

                return `${address.street} ${address.street_number}<br/>
                    ${address.postalCode} ${address.city} <br/>
                    ${country} ${address.state ? address.state : ''}`;
            } else {
                return "Loading...";
            }
        };
    });
    const maskedAddress = computed(() => {
        return (addr: IAddress) => {
            return {
                uuid: addr.uuid,
                name: addr.name,
                city: useMask(addr.city),
                street: useMask(addr.street),
                street_number: useMask(addr.street_number),
                postalCode: useMask(addr.postalCode),
                state: useMask(addr.state ? addr.state : ''),
                country_code: useMask(countries[addr.country_code]),
            };
        };
    });

    // Functions
    const selectAddress = (index: number) => {
        emit("selectAddress", index);
    };

    // Emits
    const emit = defineEmits<{
        (e: "selectAddress", index: number): void;
    }>();
</script>
