<template>
    <PortalPopup :popupId="popupId" position="end" ref="addressPopup">
        <template #title>{{ displayTitle }}</template>
        <template #content>
            <form class="vstack gap-2">
                <FormInputDropdown
                    id="type"
                    label="Type"
                    placeholder="Enter Type"
                    v-model:input-value="form.type"
                    :items="addressTypes"
                />
                <FormInputText
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Enter Name"
                    v-model:input-value="form.name"
                />
                <FormInputDropdown
                    id="country"
                    label="Country"
                    placeholder="Enter Country"
                    v-model:input-value="form.country_code"
                    :items="countries"
                />
                <FormInputText
                    v-show="form.country_code == 'US'"
                    id="state"
                    label="State"
                    type="text"
                    placeholder="Enter State"
                    v-model:input-value="form.state"
                />
                <FormInputText
                    v-show="form.postalCode !== ''"
                    id="street"
                    label="Street"
                    type="text"
                    placeholder="Enter Street name"
                    v-model:input-value="form.street"
                />
                <FormInputText
                    id="street_number"
                    label="Street number"
                    type="text"
                    placeholder="Enter Street number"
                    v-model:input-value="form.street_number"
                />

                <FormInputText
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    placeholder="Enter Postal Code"
                    v-model:input-value="form.postalCode"
                />
                <FormInputText
                    v-show="form.postalCode !== ''"
                    id="city"
                    label="City"
                    type="text"
                    placeholder="Enter City name"
                    v-model:input-value="form.city"
                />
                <div class="my-2" v-show="form.postalCode == ''">
                    We'll try to get your address data with the provided details
                    above..
                </div>
            </form>
        </template>
        <template #footer>
            <button
                type="button"
                class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                @click="handleSubmit"
            >
                Save changes
            </button>
        </template>
    </PortalPopup>
</template>

<script setup lang="ts">
    import type { PortalPopup } from "#build/components";
    import type { IAddress, IAddressCreate } from "~/modules/aetheric-api";
    import { useDropdownValuesStore } from "~/store/dropdown_values";

    const dropdownValues = useDropdownValuesStore();
    const { $bootstrap } = useNuxtApp();

    const props = defineProps({
        popupId: {
            type: String,
            default: "popupProfileSettingsAddresses",
        },
        address: {
            type: Object as PropType<IAddress>,
            required: false,
        },
    });

    const addressTypes = dropdownValues.addressTypes;
    const countries = dropdownValues.countries;

    // Reactive vars
    const addressPopup = ref<typeof PortalPopup>();
    const displayTitle = computed(() => {
        return props.address ? "Edit Address Info" : "Add Address Info";
    });
    const form: ComputedRef<IAddress | IAddressCreate> = computed(() => {
        return props.address
            ? reactive({ ...props.address })
            : reactive({
                type: undefined,
                name: undefined,
                city: "",
                street: "",
                street_number: "",
                postalCode: "",
                country_code: "",
            } as IAddressCreate);
    });

    // Functions
    const handleSubmit = () => {
        if (props.address) {
            updateAddress();
        } else {
            addAddress();
        }
        close();
    };

    const close = () => {
        if (addressPopup.value) {
            addressPopup.value.close();
        }
    };

    function addAddress() {
        emit("add", form.value);
    }
    function updateAddress() {
        const address: IAddress = form.value as IAddress;
        if (address && address.uuid) {
            emit("update", address);
        }
    }

    // Emits
    const emit = defineEmits<{
        (e: "add", value: IAddressCreate): void;
        (e: "update", value: IAddress): void;
    }>();

    // Exposed functions
    defineExpose({
        close,
    });
</script>
