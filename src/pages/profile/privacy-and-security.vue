<template>
    <Menu :activePageIndex="1"></Menu>
    <hr class="m-1" />
    <div class="m-auto w-100">
        <div class="d-flex pe-2">
            <h5 class="m-0 flex-grow-1 align-self-center">password</h5>
            <PasswordModal />
        </div>
        <div class="pe-2">
            <div class="d-flex gap-1 mb-1 align-items-start">
                <div class="d-flex flex-column">
                    <h6 class="py-2">current password</h6>
                    <div class="d-flex gap-1">
                        <div>*****</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr class="m-0" />
    <div class="m-auto w-100">
        <div class="d-flex pe-2">
            <h5 class="m-0 py-2 flex-grow-1 align-self-center">
                privacy settings
            </h5>
        </div>
        <div class="pe-2">
            <div class="w-100 gap-1 mb-1 align-items-start">
                <div class="d-flex flex-column">
                    <div
                        v-for="(
                            permissionType, permissionTypeName
                        ) in privacySettings"
                        :key="permissionTypeName"
                    >
                        <h6 class="py-2 fs-7">{{ permissionTypeName }}</h6>
                        <div
                            v-for="(permission, idx) in privacySettings[
                                permissionTypeName
                            ]"
                            :key="idx"
                        >
                            <div class="form-check form-switch d-flex px-0">
                                <label
                                    class="form-check-label mx-0 my-auto w-100"
                                    :for="idx"
                                    >{{ permission.name }}</label
                                >
                                <input
                                    class="form-check-input bg-primary"
                                    type="checkbox"
                                    role="switch"
                                    :id="idx"
                                    v-model="permission.checked"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Menu from "@/components/profile/menu.vue";
    import PasswordModal from "@/components/profile/privacy-and-security/password-modal.vue";
    definePageMeta({ layout: "portal" });
    const privacySettings = ref({
        "contact permissions": [
            { name: "Contact me through e-mail", checked: false },
            { name: "Contact me through sms", checked: true },
        ],
        "opt ins": [
            { name: "Receive all FLYARROW newsletters", checked: false },
            { name: "Receive discounts and promotions", checked: true },
        ],
        "email alerts": [
            { name: "All", checked: true },
            {
                name: "Receive message when new team member is added",
                checked: true,
            },
            {
                name: "Receive message when vehicles are added/changed",
                checked: false,
            },
        ],
    });
</script>

<style lang="scss" scoped>
    .form-check-input[type="checkbox"] {
        width: 3rem !important;
    }
</style>
