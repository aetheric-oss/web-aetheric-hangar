<template>
    <PortalPopup :popupId="popupId" position="end" ref="addressPopup">
        <template #title>{{ displayTitle }}</template>
        <template #content>
            <form class="container">
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
                <FormInputText
                    id="address"
                    label="Address Line"
                    type="text"
                    placeholder="Enter Address"
                    v-model:input-value="form.address.address"
                />
                <FormInputText
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    placeholder="Enter Postal Code"
                    v-model:input-value="form.address.postalCode"
                />
                <FormInputText
                    id="town"
                    label="Town"
                    type="text"
                    placeholder="Enter Town"
                    v-model:input-value="form.address.town"
                />
                <FormInputDropdown
                    id="country"
                    label="Country"
                    placeholder="Enter Country"
                    v-model:input-value="form.address.country"
                    :items="countries"
                />
                <FormInputText
                    id="state"
                    label="State"
                    type="text"
                    placeholder="Enter State"
                    v-model:input-value="form.address.state"
                />
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

    const dropdownValues = useDropdownValuesStore();
    const { $bootstrap } = useNuxtApp();

    const props = defineProps({
        popupId: {
            type: String,
            default: "popupProfileSettingsAddresses",
        },
        addressInfo: {
            type: Object as PropType<IAddressInfo>,
            required: false,
        },
    });

    const addressTypes = dropdownValues.addressTypes;
    const countries = dropdownValues.countries;

    // Reactive vars
    const addressPopup = ref<typeof PortalPopup>();
    const displayTitle = computed(() => {
        return props.addressInfo ? "Edit Address Info" : "Add Address Info";
    });
    const form: Ref<IAddressInfo | IAddressInfoCreate> = computed(() => {
        return reactive(
            props.addressInfo
                ? props.addressInfo
                : ({
                    type: "",
                    name: "",
                    address: {
                        address: "",
                        town: "",
                        postalCode: "",
                        state: "",
                        country: "",
                    },
                } as IAddressInfoCreate)
        );
    });

    // Functions
    const handleSubmit = () => {
        if (props.addressInfo) {
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
        if (form.value) {
            emit("add", form.value);
        }
    }
    function updateAddress() {
        const address: IAddressInfo = form.value as IAddressInfo;
        if (address && address.uuid) {
            emit("update", address);
        }
    }

    // Emits
    const emit = defineEmits<{
        (e: "add", value: IAddressInfoCreate): void;
        (e: "update", value: IAddressInfo): void;
    }>();

    // Exposed functions
    defineExpose({
        close,
    });
</script>
