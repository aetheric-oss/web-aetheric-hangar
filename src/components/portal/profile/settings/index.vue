<template>
    <!--Page popups-->
    <PortalProfileSettingsAddressesPopup
        class="h-100"
        :address-info="selectedAddress"
        @update="updateAddress"
        @add="addAddress"
    />
    <PortalProfileSettingsContactPopup
        class="h-100"
        :contact-info="selectedContact"
        @update="updateContact"
        @add="addContact"
    />
    <!--End Page popups-->

    <PortalProfileSettingsUser class="px-3" />

    <!-------------------------->
    <hr class="my-2 my-md-3" />
    <!-------------------------->

    <PortalProfileSettingsContact
        class="px-3"
        :contacts="contacts"
        @selectContact="selectContact"
    />

    <!-------------------------->
    <hr class="my-2 my-md-3" />
    <!-------------------------->

    <PortalProfileSettingsAddresses
        class="px-3"
        :addresses="addresses"
        @selectAddress="selectAddress"
    />
</template>

<script setup lang="ts">
    const profileStore = useProfileStore();

    // Reactive vars
    const addresses = ref(profileStore.getAddresses());
    const contacts = ref(profileStore.getContacts());
    const selectedAddressIndex = ref(-1);
    const selectedContactIndex = ref(-1);
    const selectedAddress: Ref<IAddressInfo | undefined> = computed(() => {
        if (selectedAddressIndex.value >= 0) {
            return addresses.value[selectedAddressIndex.value];
        }
        return undefined;
    });
    const selectedContact: Ref<IContact | undefined> = computed(() => {
        if (selectedContactIndex.value >= 0) {
            return contacts.value[selectedContactIndex.value];
        }
        return undefined;
    });

    // Functions
    const selectAddress = (addressIndex: number) => {
        selectedAddressIndex.value = addressIndex;
    };
    const addAddress = (address: IAddressInfoCreate) => {
        profileStore.addAddress(address);
    };
    const updateAddress = (address: IAddressInfo) => {
        profileStore.updateAddress(address);
    };

    const selectContact = (contactIndex: number) => {
        selectedContactIndex.value = contactIndex;
    };
    const addContact = (contact: IContactCreate) => {
        profileStore.addContact(contact);
    };
    const updateContact = (contact: IContact) => {
        profileStore.updateContact(contact);
    };
</script>
