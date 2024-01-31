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
                        :key="business.uuid"
                        :text="business.name"
                        :class="
                            isCurrentBusiness(business.uuid) ? 'active' : ''
                        "
                    >
                        <template #left v-if="business.imgSrc">
                            <img class="btn-icon pe-2" :src="business.imgSrc" />
                        </template>
                        <template
                            #right
                            v-if="isCurrentBusiness(business.uuid)"
                        >
                            <span class="text-muted small text-capitalize pe-1">Current</span>
                        </template>
                    </PortalNavPopupCard>
                </div>
            </template>
        </template>
        <template #footer>
            <PortalNavPopupCard
                class="mt-auto align-items-center text-uppercase"
                textHeading="Business"
                :text="currentBusiness.name"
                icon="IconArrowsLeftRight"
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
    const profileStore = useProfileStore();
    const businesses = profileStore.getBusinesses;

    // Reactive vars
    const currentBusiness = ref(profileStore.getCurrentBusiness);
    const currentBusinessBtnClass = ref("disabled border-0");
    const selectedBusiness = ref(profileStore.getCurrentBusiness);

    const isCurrentBusiness = (uuid: string) => {
        return uuid === currentBusiness.uuid;
    };
</script>
