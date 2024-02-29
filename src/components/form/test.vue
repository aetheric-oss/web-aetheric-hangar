<template>
    <div>
        <FormInputText
            id="first-name"
            label="First Name"
            type="text"
            placeholder="First Name"
            v-model="firstName"
            v-model:errorValue="firstNameError"
        >
            <template #left-icon>
                <IconPencil size="20" color="#fff" />
            </template>
            <template #right-icon>
                <IconCaretRight size="20" color="#fff" />
            </template>
        </FormInputText>
        <span>{{ firstName }}</span>
        <FormInputPassword
            id="password"
            v-model="password"
            v-model:errorValue="passwordError"
        />
        <span class="text-light">{{ password }}</span>
        <FormInputDropdown
            id="dropdown"
            label="Dropdown"
            type="text"
            :inputValue="dropdown"
            placeholder="Dropdown"
            :error="dropdownError"
            @dropdownInput="onDropdownInput"
            :items="items"
        />
        <span class="text-light">{{ dropdown }}</span>
        <FormInputDigits
            id="digits"
            :inputValue="1"
            digitLabel="Digits"
            @input="console.log($event)"
        />
        <span class="text-light">{{ inputValueObj }}</span>
    </div>
</template>

<script setup lang="ts">
    // Reactive vars
    const firstName = ref("");
    const firstNameError = ref("Enter Valid");
    const password = ref("");
    const passwordError = ref("Enter Valid");
    const items = ref({
        "1": "One",
        "2": "Two",
        "3": "Three",
        "4": "Four",
        "5": "Five",
    });
    const inputValueObj = ref(1);

    let dropdown = ref("");
    let dropdownError = ref("Enter Valid");

    // Functions
    const onDropdownInput = (selectedItem: string) => {
        dropdown.value = selectedItem;
    };
</script>
