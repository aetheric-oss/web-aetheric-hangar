<template>
    <button type="button" class="btn btn-outline-primary align-self-center" @click="showModal">
        <slot></slot>
    </button>
    <client-only>
        <Teleport to="#modal-container" key="contact-info-modal">
            <div
                v-show="open"
                :class="{ 'modal-box': true, 'd-block': open, 'd-none': !open }"
                id="contact-info-modal"
            >
                <div class="modal-content d-flex align-items-end flex-column">
                    <div class="modal-header-box d-grid w-100">
                        <div class="modal-heading sidenav-text my-auto mx-0 align-self-center">
                            contact
                        </div>
                        <div class="modal-close-btn m-auto d-block" @click="closeModal">
                            <PhX size="22" color="white"/>
                        </div>
                    </div>
                    <div class="w-100 mb-1" style="overflow-y: scroll">
                        <div class="stepper__container d-flex align-items-end flex-column h-100">
                            <form class="container">
                                <InputDropdown
                                    id="contactType"
                                    label="Choose contact type"
                                    type="text"
                                    :inputValue="selectedContactType"
                                    placeholder="Select a Contact Type"
                                    @dropdownInput="onContactTypeInput"
                                    :items="contactTypes"
                                    v-show="step === 1"
                                />
                                <div v-show="selectedContactType.value && step === 1">
                                    <div v-if="selectedContactType.value === 'email'">
                                        <h3 class="fs-2 mt-3">Add new email address</h3>
                                        <div>Enter a new email address and we will send you instructions to verify your new email adress.</div>
                                        <InputText
                                            id="email"
                                            label="Email address"
                                            type="text"
                                            :inputValue="form.value"
                                            placeholder="Type your email address"
                                            @input="form.value = $event"
                                        >
                                            <template #left-icon>
                                                <PhUserCircle size="20" color="#fff" />
                                            </template>
                                        </InputText>
                                    </div>
                                </div>
                                <div v-show="step === 2">
                                    <div v-if="selectedContactType.value === 'email'">
                                        <h3 class="fs-2 mt-3">Verify your e-mail</h3>
                                        <div>We have sent you an e-mail with instructions to verify your new e-mail address.</div>
                                        <div class="w-100 align-items-center d-flex flex-column justify-content-center mt-3">
                                            <button class="btn btn-outline-primary" @click="submit">Resend e-mail</button>
                                            <div class="text-center">
                                                Keep having troubles? <a href="#">GET HELP</a>.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-submit w-100 m-0 mt-auto text-light" v-show="selectedContactType.value && step === 1" @click="addContactSubmit">
                        Add New Contact
                    </button>
                </div>
            </div>
        </Teleport>
    </client-only>
</template>

<script setup>
import { PhPencil, PhUserCircle, PhX } from "@phosphor-icons/vue";
import InputText from '@/components/input-fields/input-text.vue';
import InputDropdown from "@/components/input-fields/input-dropdown.vue";
const props = defineProps({
    contactInfo: {
        type: Array,
        required: false
    },
});
const contactInfo = props.contactInfo;
let step = ref(1);
const emit = defineEmits(['add', 'update']);
function addContact() {
    emit('add', form.value);
}
function updateContact() {
    emit('update', form.value);
}
let form = ref({
    type: '',
    value: ''
});
const contactTypes = ref([
    {
        'name': 'Email Address',
        'value': 'email',
    },
    {
        'name': 'Phone Number',
        'value': 'phone',
    }
])
let selectedContactType = ref({});
const onContactTypeInput = (selectedItem) => {
    selectedContactType.value = selectedItem ? selectedItem : {};
    form.value.type = selectedItem ? selectedItem.value : '';
};
const addContactSubmit = () => {
    if (props.contactInfo) {
        updateContact();
    } else {
        addContact();
    }
    step.value = 2;
};
const open = ref(false);
const showModal = () => {
    open.value = true;
    resetData();
};
const closeModal = () => {
    open.value = false;
};
const submit = () => {
    resendEmail();
    closeModal();
};
const resendEmail = () => {
    console.log('resend email');
};
const resetData = () => {
    form.value = {
        type: '',
        value: ''
    };
    selectedContactType.value = {};
    step.value = 1;
};
</script>

<style scoped lang="scss">
.stepper__container {
    height: -webkit-fill-available!important;
}
.modal-box {
    display: none;
    position: fixed;
    z-index: 999;
    top: 0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: $primary-dark;

}
.modal-header-box {
    grid-template-columns: 1fr auto;
    grid-template-areas: "heading close-btn";
    padding: 6.5px 12px;

    .modal-heading {
        grid-area: heading;
        justify-self: center;
    }

    .close-btn {
        grid-area: close-btn;
    }
}
</style>
