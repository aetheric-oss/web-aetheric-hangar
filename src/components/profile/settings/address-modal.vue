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
                <InputDropdown
                    id="type"
                    label="Type"
                    type="text"
                    :inputValue="selectedType"
                    placeholder="Enter Type"
                    @dropdownInput="onTypeInput"
                    :items="types"
                />
                <InputText
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Enter Name"
                    v-model="form.name"
                />
                <InputText
                    id="address"
                    label="Address Line"
                    type="text"
                    placeholder="Enter Address"
                    v-model="form.address.address"
                />
                <InputText
                    id="postalCode"
                    label="Postal Code"
                    type="text"
                    placeholder="Enter Postal Code"
                    v-model="form.address.postalCode"
                />
                <InputText
                    id="town"
                    label="Town"
                    type="text"
                    placeholder="Enter Town"
                    v-model="form.address.town"
                />
                <InputDropdown
                    id="country"
                    label="Country"
                    type="text"
                    :inputValue="selectedCountry"
                    placeholder="Enter Country"
                    @dropdownInput="onCountryInput"
                    :items="countries"
                />
                <InputText
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
import { computed, onMounted, ref, watch } from "vue";
import { PhPencil } from "@phosphor-icons/vue";
import GenericModal from '../../generic-modal.vue';
import InputText from '@/components/input-fields/input-text.vue';
import InputDropdown from "@/components/input-fields/input-dropdown.vue";
const props = defineProps({
    addressInfo: {
        type: Object,
        required: false
    }
});
const displayTitle = computed(() => {
    return props.contactInfo ? 'Edit Address Info' : 'Add Address Info';
});
let form = ref( props.addressInfo ? props.addressInfo : {
    type: '',
    name: '',
    address: {
        address: '',
        postalCode: '',
        town: '',
        country: '',
        state: ''
    }
});
const types = ref([
    {
        'name': 'Shipping Address',
        'value': 'shipping',
    },
    {
        'name': 'Billing Address',
        'value': 'billing',
    },
    {
        'name': 'Residence Address',
        'value': 'residence',
    }
]);
let selectedType = ref({});
const onTypeInput = (selectedItem) => {
    selectedType.value = selectedItem ? selectedItem : {};
    form.value.type = selectedItem ? selectedItem.value : '';
};
const countries = ref([
    {
        'name': 'United States',
        'value': 'US',
    },
    {
        'name': 'Canada',
        'value': 'CA',
    },
    {
        'name': 'United Kingdom',
        'value': 'GB',
    },
    {
        'name': 'India',
        'value': 'IN',
    }
]);
let selectedCountry = ref({});
const onCountryInput = (selectedItem) => {
    selectedCountry.value = selectedItem ? selectedItem : {};
    form.value.address.country = selectedItem ? selectedItem.value : '';
};
const handleSubmit = () => {
    if (props.addressInfo) {
        updateAddress();
    } else {
        addAddress();
    }
};
const submitDetails = ref({
    showSubmitButton: true,
    title: 'Save changes'
});
const emit = defineEmits(['add', 'update']);
function addAddress() {
    emit('add', form.value);
};
function updateAddress() {
    emit('update', form.value);
};
</script>
