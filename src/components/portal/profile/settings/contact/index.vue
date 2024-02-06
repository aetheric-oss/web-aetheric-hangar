<template>
    <div class="m-auto w-100">
        <div class="vstack mb-2">
            <h5 class="text-muted">Contact Info</h5>
            <div v-for="(info, index) in contacts" :key="index" class="mb-1">
                <div class="text-muted text-uppercase small">
                    {{ info.type }}
                </div>
                <div class="hstack gap-1">
                    {{ valueToDisplay(index) }}
                    <PortalProfileMaskToggle
                        ref="maskToggle"
                        :key="index"
                        :maskedValue="maskedContact(info)"
                        :clearValue="info"
                    />
                    <span title="Needs verification" v-if="!info.isVerified">
                        <IconWarning size="1rem" class="text-warning" />
                    </span>
                    <span title="Is verified" v-if="info.isVerified">
                        <IconCheck size="1rem" class="text-success" />
                    </span>
                    <PortalPopupIcon
                        class="ms-auto text-primary"
                        icon="IconPencil"
                        target="popupProfileSettingsContact"
                        @click="selectContact(index)"
                    />
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <PortalPopupButton
                class="btn-outline-primary"
                title="Add New"
                target="popupProfileSettingsContact"
                @click="selectContact(-1)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { PortalProfileMaskToggle } from "#build/components";

    const props = defineProps({
        contacts: {
            type: Array as PropType<IContact[]>,
            required: true,
        },
    });

    // Reactive vars
    const maskToggle = ref<Array<typeof PortalProfileMaskToggle>>([]);

    // Compute display based on maskToggle state for the given index
    const valueToDisplay = computed(() => {
        return (index: number) => {
            if (maskToggle.value.length && maskToggle.value[index]) {
                let contact = maskToggle.value[index].getDisplayValue();
                return contact.value;
            } else {
                return "Loading...";
            }
        };
    });

    const maskedContact = computed(() => {
        return (info: IContact) => {
            return { value: useMask(info.value, info.type) };
        };
    });

    // Functions
    const selectContact = (index: number) => {
        emit("selectContact", index);
    };

    // Emits
    const emit = defineEmits<{
        (e: "selectContact", index: number): void;
    }>();
</script>
