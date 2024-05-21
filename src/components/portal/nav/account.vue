<template>
    <PortalNavPopup popupId="popupAccount" position="left" :key="user.uuid" @close="selectAccount(unref(currentCompany))">
        <template #title> Select an Account </template>
        <template #content>
            <template
                v-if="companyCardData"
                v-for="(letterCompanies, letter) in sortCompanies(
                    Array.from(companyCardData.values())
                )"
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
                        v-model:text-color="company.text_color"
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
                textHeading="Company"
                :key="selectedCompany.uuid"
                :text="selectedCompany.name"
            >
                <template #left>
                    <img
                        class="btn-icon pe-2"
                        :src="selectedCompany.imgSrc"
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
    import type { PortalNavPopupCard } from "#build/components";
    import type { ICompany, IUser } from "~/modules/aetheric-api";

    interface ICompanyCardProps extends ICompany {
        text_color: string;
    }

    const { $bootstrap } = useNuxtApp();
    const $api = useAethericApi(useCurrentCompany().value);

    // Reactive vars
    const user = defineModel<IUser>("user", {
        default: {},
    });
    const currentCompany = defineModel<ICompany>("currentCompany", {
        default: { uuid: "", name: "", imgSrc: "" } as ICompany,
    });
    let selectedCompany: ICompany = unref(currentCompany);

    const currentCompanyBtnClass = ref("disabled border-0");
    const { data: companies } = await useAsyncData<ICompany[]>(
        "companies",
        async () => {
            let [data, success] = await $api.users.getCompanies({
                uuid: user.value.uuid,
            });
            if (success) {
                return data;
            } else {
                return [] as ICompany[];
            }
        },
        {
            watch: [user.value],
        }
    );
    const companyCardData = computed<Map<string, ICompanyCardProps>>(() => {
        let companyCardProps: Map<string, ICompanyCardProps> = new Map();
        if (companies.value) {
            companies.value.forEach((company: ICompany) => {
                companyCardProps.set(
                    company.uuid,
                    reactive({
                        text_color: getTextColor(company.uuid),
                        ...company,
                    })
                );
            });
        }
        return companyCardProps;
    });

    // Functions
    const getTextColor = (uuid: string) => {
        if (selectedCompany) {
            return uuid === selectedCompany.uuid ? "secondary" : "white";
        }
        return "white";
    };

    const isCurrentCompany = (uuid: string) => {
        if (currentCompany.value) {
            return uuid === currentCompany.value.uuid;
        }
        return false;
    };

    const selectAccount = (company: ICompany) => {
        if (companyCardData.value) {
            companyCardData.value.forEach((element: ICompanyCardProps) => {
                element.text_color = "white";
            });
            let cardProps = companyCardData.value.get(company.uuid);
            if (cardProps) {
                cardProps.text_color = "secondary";
            }
        }
        selectedCompany = company;

        // Check if we should activate the switch button
        if(currentCompany.value.uuid !== company.uuid) {
            currentCompanyBtnClass.value = "btn-primary";
        } else {
            currentCompanyBtnClass.value = "disabled border-0";
        }
    };

    const switchAccount = async () => {
        if (selectedCompany) {
            // update store to switch to our new account
            const storeSelectedCompany = useCurrentCompany();
            storeSelectedCompany.value = selectedCompany.uuid;

            // emit switch account event for potential listeners
            emit("switchAccount", selectedCompany);

            // set current component values to reflect new account selection
            currentCompany.value = selectedCompany;
            currentCompanyBtnClass.value = "disabled border-0";

            // close offcanvas
            let popupAccount = document.getElementById("popupAccount")!;
            let offcanvas = $bootstrap.Offcanvas.getInstance(popupAccount)!;
            offcanvas.hide();
        }
    };

    function sortCompanies(companies: ICompanyCardProps[]) {
        const sortedcompaniesList: { [key: string]: ICompanyCardProps[] } = {};
        // return an alphabetically sorted list
        companies
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((company) => {
                let firstLetter = company.name[0].toUpperCase();
                if (sortedcompaniesList[firstLetter]) {
                    sortedcompaniesList[firstLetter].push(company);
                } else {
                    sortedcompaniesList[firstLetter] = [company];
                }
            });
        return sortedcompaniesList;
    }
    // Emits
    const emit = defineEmits<{
        (e: "switchAccount", value: ICompany): void;
    }>();
</script>
