<template>
    <div>
        <InputText
            id="first-name"
            label="First Name"
            type="text"
            :inputValue="firstName"
            placeholder="First Name"
            :error="firstNameError"
            @input="firstName = $event"
        >
            <template #left-icon>
                <PhPencil size="20" color="#fff" />
            </template>
            <template #right-icon>
                <PhCaretRight size="20" color="#fff" />
            </template>
        </InputText>
        <span>{{ firstName }}</span>
        <InputPassword
            id="password"
            :inputValue="password"
            :error="passwordError"
            @input="password = $event"
        />
        <span class="text-light">{{ password }}</span>
        <InputDropdown
            id="dropdown"
            label="Dropdown"
            type="text"
            :inputValue="dropdown"
            placeholder="Dropdown"
            :error="dropdownError"
            @dropdownInput="onDropdownInput"
            :items="items"
        />
        <span class="text-light">{{ dropdown.value }}</span>
        <InputDigits
            id="digits"
            :inputValue="1"
            digitLabel="Digits"
            @input="console.log($event)"
        />
        <span class="text-light">{{ inputValueObj.value }}</span>
    </div>
</template>

<script setup>
import { PhPencil, PhCaretRight, PhCheck, PhWarning } from "@phosphor-icons/vue";
import InputText from '@/components/profile/input-fields/input-text.vue';
import InputPassword from "@/components/profile/input-fields/input-password.vue";
import InputDropdown from "@/components/profile/input-fields/input-dropdown.vue";
import InputDigits from "@/components/profile/input-fields/input-digits.vue";
import { computed, ref } from 'vue';
const firstName = ref('');
const firstNameError = ref('Enter Valid');
const password = ref('');
const passwordError = ref('Enter Valid');
const items = ref([
    {
        id: 1,
        name: 'One',
        value: 1
    },
    {
        id: 2,
        name: 'Two',
        value: 2
    },
    {
        id: 3,
        name: 'Three',
        value: 3
    },
    {
        id: 4,
        name: 'Four',
        value: 4
    },
    {
        id: 5,
        name: 'Five',
        value: 5
    }
])
let dropdown = ref({});
let dropdownError = ref('Enter Valid');
const onDropdownInput = (selectedItem) => {
    dropdown.value = selectedItem ? { ...selectedItem } : {};
};
const inputValueObj = ref(1);
</script>
