<template>
    <div class="m-auto w-100">
        <div class="vstack mb-2">
            <h5 class="text-muted">Privacy settings</h5>
            <div class="mb-1">
                <div class="text-muted text-uppercase small">
                    Current password
                </div>
                <div class="vstack gap-1">
                    <div
                        v-for="(
                            permissionType, permissionTypeName
                        ) in privacySettings"
                        :key="permissionTypeName"
                    >
                        <h6 class="py-2 fs-7">{{ privacyTypes[permissionTypeName] }}</h6>
                        <div
                            v-for="(permission, idx) in privacySettings[
                                permissionTypeName
                            ]"
                            :key="idx"
                        >
                            <div class="form-check form-switch d-flex px-0">
                                <label
                                    class="form-check-label mx-0 my-auto w-100"
                                    :for="permissionTypeName + '-' + idx"
                                    >{{ permission.name }}</label
                                >
                                <input
                                    class="form-check-input bg-primary"
                                    type="checkbox"
                                    role="switch"
                                    :id="permissionTypeName + '-' + idx"
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

<script setup lang="ts">
    import { useDropdownValuesStore } from "~/store/dropdown_values";
    import type { IPrivacySettings } from "~/modules/aetheric-api";

    const dropdownValues = useDropdownValuesStore();

    const props = defineProps({
        privacySettings: {
            type: Object as PropType<IPrivacySettings>,
            required: true,
        },
    });

    const privacyTypes = dropdownValues.privacyTypes;
</script>
