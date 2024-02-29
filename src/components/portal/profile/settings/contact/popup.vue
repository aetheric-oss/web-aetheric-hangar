<template>
    <PortalPopup
        :popupId="popupId"
        position="end"
        ref="contactPopup"
        @close="onClose"
    >
        <template #title> {{ displayTitle }} </template>
        <template #content>
            <div v-if="error" class="text-warning text-center">
                {{ error }}
            </div>
            <form class="container">
                <FormInputDropdown
                    v-show="step === 1"
                    id="contactType"
                    label="Choose contact type"
                    type="text"
                    v-model:input-value="form.type"
                    placeholder="Select a Contact Type"
                    :items="contactTypes"
                />
                <div v-show="step === 1 && form.type === 'email'">
                    <h3 class="mt-3">Add new email address</h3>
                    <div>
                        Enter a new email address and we will send you
                        instructions to verify your new email address.
                    </div>
                    <FormInputText
                        id="email"
                        label="Email address"
                        type="text"
                        v-model:input-value="form.value"
                        placeholder="Type your email address"
                    >
                        <template #icon-left>
                            <IconAt size="20" color="#fff" />
                        </template>
                    </FormInputText>
                </div>
                <div v-show="form.type === 'phone'">
                    <h3 class="mt-3">Add new phone number</h3>
                    <FormInputText
                        id="phone"
                        label="Telephone number"
                        type="text"
                        v-model:input-value="form.value"
                        placeholder="Type your telephone number"
                    >
                        <template #icon-left>
                            <IconPhone size="20" color="#fff" />
                        </template>
                    </FormInputText>
                </div>
                <div v-show="step === 2 && form.type === 'email'">
                    <h3 class="mt-3">Verify your e-mail</h3>
                    <div>
                        We have sent you an e-mail with instructions to verify
                        your new e-mail address.
                    </div>
                    <div
                        class="w-100 align-items-center d-flex flex-column justify-content-center mt-3"
                    >
                        <button class="btn btn-outline-primary" @click="submit">
                            Resend e-mail
                        </button>
                        <div class="text-center">
                            Keep having troubles?
                            <a href="#">GET HELP</a>.
                        </div>
                    </div>
                </div>
            </form>
        </template>
        <template #footer>
            <button
                type="button"
                class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light"
                v-if="step === 1"
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
            default: "popupProfileSettingsContact",
        },
        contactInfo: {
            type: Object as PropType<IContact>,
            required: false,
        },
    });

    const contactTypes = dropdownValues.contactTypes;

    // Reactive vars
    const contactPopup = ref<typeof PortalPopup>();
    const step = ref<number>(1);
    const error = ref<string | undefined>(undefined);
    const displayTitle = computed(() => {
        return props.contactInfo ? "Edit Contact Info" : "Add Contact Info";
    });
    const form = computed(() => {
        return reactive(
            props.contactInfo
                ? props.contactInfo
                : ({
                    type: "",
                    value: "",
                    isPrimary: false,
                    isVerified: false,
                } as IContactCreate)
        );
    });

    // Functions
    const handleSubmit = () => {
        if (props.contactInfo) {
            updateContact();
        } else {
            addContact();
        }
    };

    const resendEmail = () => {
        // TODO
        console.log("resend email");
    };

    const close = () => {
        // close offcanvas
        if (contactPopup.value) {
            contactPopup.value.close();
        }
    };

    const onClose = () => {
        step.value = 1;
        error.value = undefined;
    };

    const submit = () => {
        resendEmail();
        close();
    };

    function addContact() {
        emit("add", form.value as IContactCreate);
        if (form.value.type === "email") {
            step.value = 2;
        } else {
            close();
        }
    }
    function updateContact() {
        const contact: IContact = props.contactInfo as IContact;
        if (contact && contact.uuid) {
            emit("update", contact);
            close();
        } else {
            error.value = "Something went wrong";
        }
    }

    // Emits
    const emit = defineEmits<{
        (e: "add", contact: IContactCreate): void;
        (e: "update", contact: IContact): void;
    }>();

    // Exposed functions
    defineExpose({
        close,
    });
</script>
