<template>
    <!--Page popups-->
    <PortalProfileSettingsAddressesPopup
        class="h-100"
        :address="selectedAddress"
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
        :contacts="contacts"
        @selectContact="selectContact"
        class="px-3"
    />

    <!-------------------------->
    <hr class="my-2 my-md-3" />
    <!-------------------------->

    <PortalProfileSettingsAddresses
        :addresses="addresses"
        @selectAddress="selectAddress"
        class="px-3"
    />
</template>

<script setup lang="ts">
    import type {
        IAddress,
        IAddressCreate,
        IContact,
        IContactCreate,
    } from "~/modules/aetheric-api";

    import { useProfileStore } from "~/store/profile";

    const profileStore = useProfileStore();
    const user = ref(await profileStore.getUser());
    const $api = useAethericApi(useCurrentCompany().value);

    // Reactive vars
    const { data: addresses } = await useAsyncData<IAddress[]>(
        "addresses",
        async () => {
            let [data, success] = await $api.users.getAddresses({
                uuid: user.value.uuid,
            });
            if (success) {
                return data;
            } else {
                return [] as IAddress[];
            }
        },
        {
            default: () => {
                return [];
            },
            watch: [user.value],
        }
    );
    const { data: contacts } = await useAsyncData<IContact[]>(
        "contacts",
        async () => {
            let [data, success] = await $api.users.getContacts({
                uuid: user.value.uuid,
            });
            if (success) {
                return data;
            } else {
                return [] as IContact[];
            }
        },
        {
            default: () => {
                return [];
            },
            watch: [user.value],
        }
    );

    const selectedAddressIndex = ref(-1);
    const selectedContactIndex = ref(-1);
    const selectedAddress = computed(() => {
        if (selectedAddressIndex.value >= 0 && addresses.value) {
            return addresses.value![selectedAddressIndex.value];
        }
        return undefined;
    });
    const selectedContact = computed(() => {
        if (selectedContactIndex.value >= 0 && contacts.value) {
            return contacts.value[selectedContactIndex.value];
        }
        return undefined;
    });

    // Functions
    const selectAddress = (addressIndex: number) => {
        selectedAddressIndex.value = addressIndex;
    };
    const addAddress = async (address: IAddressCreate) => {
        await $api.users.addAddress({ uuid: user.value.uuid, address });
        refreshNuxtData("addresses");
    };
    const updateAddress = async (address: IAddress) => {
        await $api.users.updateAddress({ uuid: user.value.uuid, address });
        refreshNuxtData("addresses");
    };

    const selectContact = (contactIndex: number) => {
        selectedContactIndex.value = contactIndex;
    };
    const addContact = async (contact: IContactCreate) => {
        await $api.users.addContact({ uuid: user.value.uuid, contact });
        refreshNuxtData("contacts");
    };
    const updateContact = async (contact: IContact) => {
        await $api.users.updateContact({ uuid: user.value.uuid, contact });
        refreshNuxtData("contacts");
    };
</script>
