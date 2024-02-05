<template>
    <PortalNavPopup popupId="popupAccount" position="left">
        <template #title> Select an Account </template>
        <template #content>
            <template
                v-for="(letterBusinesses, letter) in businesses"
                :key="letter"
            >
                <div class="py-2 mb-1 border-bottom border-dark">
                    {{ letter }}
                </div>
                <div class="d-grid gap-1">
                    <PortalNavPopupCard
                        v-for="business in letterBusinesses"
                        class="btn btn-gray"
                        @click="selectAccount(business)"
                        :key="business.uuid"
                        :text="business.name"
                        :text-color="isSelectedBusiness(business.uuid) ? 'secondary' : 'white'"
                        :class="isCurrentBusiness(business.uuid) ? 'active' : ''"
                    >
                        <template #left v-if="business.imgSrc">
                            <img class="btn-icon pe-2" :src="business.imgSrc" />
                        </template>
                        <template
                            #right
                            v-if="isCurrentBusiness(business.uuid)"
                        >
                            <span class="text-muted small text-capitalize pe-1"
                                >Current</span
                            >
                        </template>
                    </PortalNavPopupCard>
                </div>
            </template>
        </template>
        <template #footer>
            <PortalNavPopupCard
                key="currentBusiness"
                class="mt-auto align-items-center text-uppercase"
                textHeading="Business"
                :text="currentBusiness.name"
            >
                <template #left>
                    <img
                        class="btn-icon pe-2"
                        :src="currentBusiness.imgSrc"
                        alt="Business Image"
                    />
                </template>
                <template #right>
                    <div
                        class="btn"
                        :class="currentBusinessBtnClass"
                        @click="switchAccount"
                    >
                        <IconArrowsLeftRight size="1.5rem" />
                    </div>
                </template>
            </PortalNavPopupCard>
        </template>
    </PortalNavPopup>
</template>

<script setup lang="ts">
    import type { Offcanvas } from "bootstrap";
    const { $bootstrap } = useNuxtApp();

    const profileStore = useProfileStore();
    const businesses = profileStore.getBusinesses;

    // Reactive vars
    const currentBusiness = ref(profileStore.getCurrentBusiness);
    const currentBusinessBtnClass = ref("disabled border-0");
    const selectedBusiness = ref(profileStore.getCurrentBusiness);

    // Functions
    const isCurrentBusiness = (uuid: string) => {
        return uuid === currentBusiness.value.uuid;
    };
    const isSelectedBusiness = (uuid: string) => {
        return uuid === selectedBusiness.value.uuid;
    };

    const selectAccount = (business: Business) => {
        if (!isCurrentBusiness(business.uuid)) {
            selectedBusiness.value = business;
            currentBusiness.value = {uuid: '', name: business.name, imgSrc: business.imgSrc};
            console.log(selectedBusiness);
            currentBusinessBtnClass.value = "btn-primary";
        }
    };

    const switchAccount = () => {
        // update store to switch to our new account
        profileStore.switchAccount(selectedBusiness.value.uuid);

        // emit switch account event for potential listeners
        emit("switchAccount", selectedBusiness.value);

        // set current component values to reflect new account selection
        currentBusiness.value = profileStore.getCurrentBusiness;
        currentBusinessBtnClass.value = "disabled border-0";

        // close offcanvas
        let popupAccount = document.getElementById('popupAccount')!;
        let offcanvas = $bootstrap.Offcanvas.getInstance(popupAccount)!;
        offcanvas.hide();
    };

    // Emits
    const emit = defineEmits<{
        (e: "switchAccount", value: Business): void;
    }>();
</script>
