<template>
    <div class="popup" id="business-popup">
        <div class="popup-container business-popup">
            <div class="acc-popup-container">
                <div class="acc-popup-header">
                    <div class="acc-popup-heading sidenav-text">
                        Select an Account
                    </div>
                    <div
                        class="acc-popup-close-btn"
                        @click="closeBusinessPopup"
                    >
                        <IconClone size="22" color="white" />
                    </div>
                </div>
                <div class="businesses-list">
                    <template
                        v-for="(letterBusinesses, letter) in businesses"
                        :key="letter"
                    >
                        <div class="letter sidenav-text">
                            {{ letter }}
                        </div>
                        <div class="businesses-card-list">
                            <hr />
                            <template
                                v-for="business in letterBusinesses"
                                :key="business"
                            >
                                <NavSidenavCard
                                    :cardText="business.name"
                                    :highlightBg="
                                        business.name.toLowerCase() ===
                                        currentBusiness.name.toLowerCase()
                                    "
                                >
                                    <template #left-icon>
                                        <img
                                            :src="business.imgSrc"
                                            alt="Current Business Image"
                                            v-if="business.imgSrc"
                                        />
                                    </template>
                                    <template
                                        #right-icon
                                        v-if="
                                            business.name.toLowerCase() ===
                                            currentBusiness.name.toLowerCase()
                                        "
                                    >
                                        <span class="highlight-text"
                                            >Current</span
                                        >
                                    </template>
                                </NavSidenavCard>
                            </template>
                        </div>
                    </template>
                </div>
                <div class="current-account-component">
                    <NavCurrentBusinessAccount
                        :mildBackground="true"
                        :business="currentBusiness"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(["closeBusinessChangePopup"]);
    function closeBusinessPopup() {
        emit("closeBusinessChangePopup", [".business-popup", false]);
    }
    const profileStore = useProfileStore();
    const currentBusiness = profileStore.getCurrentBusiness;
    const businesses = profileStore.getBusinesses;
</script>

<style scoped lang="scss">
    .business-popup {
        // display: none;
        height: 100%;
        background: var(--bs-gray-400);
        border-radius: 16px;
        padding: 11px 9px;
        width: 100%;

        .acc-popup-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: inherit;

            .acc-popup-header {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-areas: "heading close-btn";
                // gap: 12px;
                padding: 6.5px 12px;

                .acc-popup-heading {
                    grid-area: heading;
                    margin: auto 0;
                    align-self: center;
                    justify-self: center;
                }

                .close-btn {
                    grid-area: close-btn;
                    margin: auto;
                    display: block;
                }
            }

            .businesses-list {
                flex-grow: 1;
                .letter {
                    padding: 0 12px;
                }
                hr {
                    margin: 0;
                }
                .businesses-card-list {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 12px;
                    padding-bottom: 12px;
                }
            }

            .current-account-component {
                grid-area: current-account-component;
                margin-top: 0;
            }
        }
    }
</style>
