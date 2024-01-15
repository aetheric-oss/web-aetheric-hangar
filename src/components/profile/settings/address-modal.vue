<template>
    <GenericModal
        modalId="address-info-modal"
        :title="displayTitle"
        :handleSubmit="handleSubmit"
        :submitDetails="submitDetails"
        ref="addressModalRef"
    >
        <template #activation-button>
            <slot></slot>
        </template>
        <template #content>
            <form class="container">
                <FormInputDropdown
                    id="type"
                    label="Type"
                    type="text"
                    :inputValue="selectedType"
                    placeholder="Enter Type"
                    @dropdownInput="onTypeInput"
                    :items="types"
                />
                <FormInputText
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Enter Name"
                    v-model="form.name"
                />
                <FormInputText
                    id="address"
                    label="Address Line"
                    type="text"
                    placeholder="Enter Address"
                    v-model="form.address.address"
                />
                <FormInputText
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    placeholder="Enter Postal Code"
                    v-model="form.address.postalCode"
                />
                <FormInputText
                    id="town"
                    label="Town"
                    type="text"
                    placeholder="Enter Town"
                    v-model="form.address.town"
                />
                <FormInputDropdown
                    id="country"
                    label="Country"
                    type="text"
                    :inputValue="selectedCountry"
                    placeholder="Enter Country"
                    @dropdownInput="onCountryInput"
                    :items="countries"
                />
                <FormInputText
                    id="state"
                    label="State"
                    type="text"
                    placeholder="Enter State"
                    v-model="form.address.state"
                />
            </form>
        </template>
    </GenericModal>
</template>

<script setup>
    import { computed } from "vue";
    const props = defineProps({
        addressInfo: {
            type: Object,
            required: false,
        },
    });
    const displayTitle = computed(() => {
        return props.contactInfo ? "Edit Address Info" : "Add Address Info";
    });

    const emit = defineEmits(["add", "update"]);

    // Reactive vars
    let form = ref({
        type: "",
        name: "",
        address: {
            address: "",
            postalCode: "",
            town: "",
            country: "",
            state: "",
        },
    });
    if (props.addressInfo) {
        form = props.addressInfo;
    }

    const types = ref([
        {
            name: "Shipping Address",
            value: "shipping",
        },
        {
            name: "Billing Address",
            value: "billing",
        },
        {
            name: "Residence Address",
            value: "residence",
        },
    ]);
    let selectedType = ref({});

    const countries = ref([
        {
            name: "United States",
            value: "US",
        },
        {
            name: "Canada",
            value: "CA",
        },
        {
            name: "United Kingdom",
            value: "GB",
        },
        {
            name: "India",
            value: "IN",
        },
    ]);
    const selectedCountry = ref({});

    const submitDetails = ref({
        showSubmitButton: true,
        title: "Save changes",
    });

    // functions
    const onTypeInput = (selectedItem) => {
        selectedType.value = selectedItem ? selectedItem : {};
        form.value.type = selectedItem ? selectedItem.value : "";
    };
    const onCountryInput = (selectedItem) => {
        selectedCountry.value = selectedItem ? selectedItem : {};
        form.value.address.country = selectedItem ? selectedItem.value : "";
    };
    const handleSubmit = () => {
        if (props.addressInfo) {
            updateAddress();
        } else {
            addAddress();
        }
    };

    function addAddress() {
        emit("add", form.value);
    }
    function updateAddress() {
        emit("update", form.value);
    }
</script>
