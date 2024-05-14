<template>
    <!--Page popups-->
    <PortalProfilePaymentPopup
        class="h-100"
        :paymentMethod="selectedPaymentMethod"
        @update="updatePaymentMethod"
        @add="addPaymentMethod"
    />

    <div class="m-auto w-100">
        <div class="vstack mb-2">
            <h5 class="text-muted">Payment Methods</h5>
            <div
                v-for="(info, index) in paymentMethods"
                :key="index"
                class="mb-1"
            >
                <div class="text-muted text-uppercase small">
                    {{ info.type }}
                </div>
                <div class="hstack gap-1">
                    {{ valueToDisplay(index) }}
                    <PortalProfileMaskToggle
                        ref="maskToggle"
                        :key="index"
                        :maskedValue="maskedInfo(info)"
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
                        target="popupProfilePaymentMethod"
                        @click="selectPaymentMethod(index)"
                    />
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <PortalPopupButton
                class="btn-outline-primary"
                title="Add New"
                target="popupProfilePaymentMethod"
                @click="selectPaymentMethod(-1)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useProfileStore } from "~/store/profile";
    import type { PortalProfileMaskToggle } from "#build/components";
    import type { IPaymentMethod, IPaymentMethodCreate } from "~/modules/aetheric-api";

    const profileStore = useProfileStore();
    const $api = useAethericApi(useCurrentCompany().value);

    // Reactive vars
    const user = ref(await profileStore.getUser());
    const maskToggle = ref<Array<typeof PortalProfileMaskToggle>>([]);
    const { data: paymentMethods } = await useAsyncData(
        "paymentMethods",
        async () => {
            let [data, success] = await $api.users.getPaymentMethods({
                uuid: user.value.uuid,
            });
            if (success) {
                return data;
            } else {
                return [] as IPaymentMethod[];
            }
        },
        {
            default: () => {
                return [];
            },
        }
    );
    const selectedPaymentMethodIndex = ref(-1);
    const selectedPaymentMethod = computed(() => {
        if (selectedPaymentMethodIndex.value >= 0) {
            return paymentMethods.value[selectedPaymentMethodIndex.value];
        }
        return undefined;
    });

    // Compute display based on maskToggle state for the given index
    const valueToDisplay = computed(() => {
        return (index: number) => {
            if (maskToggle.value.length && maskToggle.value[index]) {
                const toggle = maskToggle.value[index];
                let method: IPaymentMethod = toggle.getDisplayValue();
                return method.value;
            } else {
                return "Loading...";
            }
        };
    });
    const maskedInfo = computed(() => {
        return (method: IPaymentMethod) => {
            return {
                value: useMask(method.value),
            };
        };
    });

    // Functions
    const selectPaymentMethod = (index: number) => {
        selectedPaymentMethodIndex.value = index;
    };
    const addPaymentMethod = async (method: IPaymentMethodCreate) => {
        await $api.users.addPaymentMethod({ uuid: user.value.uuid, method });
        refreshNuxtData("paymentMethods");
    };
    const updatePaymentMethod = async (method: IPaymentMethod) => {
        await $api.users.updatePaymentMethod({ uuid: user.value.uuid, method });
        refreshNuxtData("paymentMethods");
    };
</script>
