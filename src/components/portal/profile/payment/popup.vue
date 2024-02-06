<template>
    <PortalPopup
        :popupId="popupId"
        position="end"
        ref="paymentPopup"
        @close="onClose"
    >
        <template #title> {{ displayTitle }} </template>
        <template #content>
            <div v-if="error" class="text-warning text-center">
                {{ error }}
            </div>
            <form class="container">
                <FormInputDropdown
                    id="paymentType"
                    label="Choose Payment Type"
                    type="text"
                    v-model:input-value="form.type"
                    placeholder="Select a Payment Type"
                    :items="paymentTypes"
                />
                <div v-show="form.type === 'bank'">
                    <FormInputText
                        id="account"
                        label="Bank Account"
                        type="text"
                        v-model:input-value="form.value"
                        placeholder="Type your bank account"
                    >
                        <template #icon-left>
                            <IconBank size="20" color="#fff" />
                        </template>
                    </FormInputText>
                </div>
                <div v-show="form.type === 'credit'">
                    <FormInputText
                        id="credit"
                        label="Credit Card Number"
                        type="text"
                        v-model:input-value="form.value"
                        placeholder="Type your Credit Card number"
                    >
                        <template #icon-left>
                            <IconCreditCard size="20" color="#fff" />
                        </template>
                    </FormInputText>
                </div>
            </form>
        </template>
        <template #footer>
            <button
                type="button"
                class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                @click="handleSubmit"
            >
                Save Changes
            </button>
        </template>
    </PortalPopup>
</template>

<script setup lang="ts">
    import type { PortalPopup } from "#build/components";

    const dropdownValues = useDropdownValuesStore();
    const { $bootstrap } = useNuxtApp();

    const props = defineProps({
        popupId: {
            type: String,
            default: "popupProfilePaymentMethod",
        },
        paymentMethod: {
            type: Object as PropType<IPaymentMethod>,
            required: false,
        },
    });

    const paymentTypes = dropdownValues.paymentTypes;

    // Reactive vars
    const paymentPopup = ref<typeof PortalPopup>();
    const error = ref<string | undefined>(undefined);
    const displayTitle = computed(() => {
        return props.paymentMethod ? "Edit Payment Method" : "Add Payment Method";
    });
    const form = computed(() => {
        return reactive(
            props.paymentMethod
                ? props.paymentMethod
                : ({
                    type: "",
                    value: "",
                    isPrimary: false,
                    isVerified: false,
                } as IPaymentMethodCreate)
        );
    });

    // Functions
    const handleSubmit = () => {
        if (props.paymentMethod) {
            updatePaymentMethod();
        } else {
            addPaymentMethod();
        }
    };

    const resendEmail = () => {
        // TODO
        console.log("resend email");
    };

    const close = () => {
        // close offcanvas
        if (paymentPopup.value) {
            paymentPopup.value.close();
        }
    };

    const onClose = () => {
        error.value = undefined;
    };

    const submit = () => {
        resendEmail();
        close();
    };

    function addPaymentMethod() {
        emit("add", form.value as IPaymentMethodCreate);
        close();
    }
    function updatePaymentMethod() {
        const method: IPaymentMethod = props.paymentMethod as IPaymentMethod;
        if (method && method.uuid) {
            emit("update", method);
            close();
        } else {
            error.value = "Something went wrong";
        }
    }

    // Emits
    const emit = defineEmits<{
        (e: "add", method: IPaymentMethodCreate): void;
        (e: "update", method: IPaymentMethod): void;
    }>();

    // Exposed functions
    defineExpose({
        close,
    });
</script>
