<template>
    <PortalNavPopup popupId="popupAccount" position="left">
        <template #title> Select an Account </template>
        <template #content>
            <template
                v-for="(letterCompanies, letter) in companies"
                :key="letter"
            >
                <div class="py-2 mb-1 border-bottom border-dark">
                    {{ letter }}
                </div>
                <div class="d-grid gap-1">
                    <PortalNavPopupCard
                        v-for="company in letterCompanies"
                        class="btn btn-gray"
                        @click="selectAccount(company)"
                        :key="company.uuid"
                        :text="company.name"
                        :text-color="
                            isSelectedCompany(company.uuid)
                                ? 'secondary'
                                : 'white'
                        "
                        :class="isCurrentCompany(company.uuid) ? 'active' : ''"
                    >
                        <template #left v-if="company.imgSrc">
                            <img class="btn-icon pe-2" :src="company.imgSrc" />
                        </template>
                        <template #right v-if="isCurrentCompany(company.uuid)">
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
                key="currentCompany"
                class="mt-auto align-items-center text-uppercase"
                textHeading="Company"
                :text="currentCompany.name"
            >
                <template #left>
                    <img
                        class="btn-icon pe-2"
                        :src="currentCompany.imgSrc"
                        alt="Company Image"
                    />
                </template>
                <template #right>
                    <div
                        class="btn"
                        :class="currentCompanyBtnClass"
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
    const { $bootstrap } = useNuxtApp();

    const profileStore = useProfileStore();
    const companies = profileStore.getSortedCompanies();
    const profile = ref(profileStore.user);

    // Reactive vars
    const currentCompanyBtnClass = ref("disabled border-0");
    const selectedCompany: Ref<ICompany | undefined> = ref(
        profileStore.getCurrentCompany()
    );
    const currentCompany: Ref<ICompany> = computed(() => {
        let company = profileStore.getCurrentCompany();
        if (company !== undefined) {
            return company;
        } else {
            return {
                uuid: "",
                name: "",
                imgSrc: "",
            } as ICompany;
        }
    });

    // Functions
    const isCurrentCompany = (uuid: string) => {
        if (currentCompany.value) {
            return uuid === currentCompany.value.uuid;
        }
        return false;
    };
    const isSelectedCompany = (uuid: string) => {
        if (selectedCompany.value) {
            return uuid === selectedCompany.value.uuid;
        }
        false;
    };

    const selectAccount = (company: ICompany) => {
        if (!isCurrentCompany(company.uuid)) {
            selectedCompany.value = company;
            currentCompany.value = {
                uuid: "",
                name: company.name,
                imgSrc: company.imgSrc,
            };
            console.log(selectedCompany);
            currentCompanyBtnClass.value = "btn-primary";
        }
    };

    const switchAccount = async () => {
        if (selectedCompany.value) {
            // update store to switch to our new account
            profileStore.switchAccount(selectedCompany.value.uuid);

            // emit switch account event for potential listeners
            emit("switchAccount", selectedCompany.value);

            // set current component values to reflect new account selection
            currentCompany.value = selectedCompany.value;
            currentCompanyBtnClass.value = "disabled border-0";

            // close offcanvas
            let popupAccount = document.getElementById("popupAccount")!;
            let offcanvas = $bootstrap.Offcanvas.getInstance(popupAccount)!;
            offcanvas.hide();
        }
    };

    // Emits
    const emit = defineEmits<{
        (e: "switchAccount", value: ICompany): void;
    }>();
</script>
