<template>
    <div class="m-auto w-100">
        <div class="d-flex">
            <h5 class="m-0 flex-grow-1 align-self-center">contact</h5>
            <button class="btn align-self-center m-0 p-0 me-2" @click="showModal">
                <PhPencil size="30" color="#ff5e45" />
            </button>
        </div>
        <div class="pe-2">
            <div v-for="(info, index) in formattedContactInfo" :key="index">
                <div class="d-flex gap-1 mb-1 align-items-start">
                    <div class="d-flex flex-column">
                        <h6>{{ info.type }}</h6>
                        <div class="d-flex gap-1">
                            <div>{{ valueToDisplay(index) }}</div>
                            <h5>{{ info.isPrimary }}</h5>
                        </div>
                    </div>
                    <div class="d-flex ms-auto my-auto me-0">
                        <ContactVerificationModal :contactForm="info" :index="index" v-if="!info.isVerified">
                            <div class="my-auto mx-0 align-self-center ms-1 me-2">
                                <PhWarning :size="24" color="#f31b65" weight="fill"/>
                            </div>
                        </ContactVerificationModal>
                        <button class="btn m-0 p-0 lh-1" @click="toggleMaskedStatus(index)">
                            <PhEye :size="20" color="#ff5e45" v-show="info.isMasked"/>
                            <PhEyeSlash :size="20" color="#ff5e45" v-show="!info.isMasked"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <ContactModal @add="addContact">
                <span>Add New</span>
            </ContactModal>
        </div>
    </div>

</template>

<script setup>
import { reactive, computed } from 'vue'
import { PhPencil, PhEye, PhEyeSlash, PhWarning } from "@phosphor-icons/vue";
import ContactModal from './contact-modal.vue';
import ContactVerificationModal from './contact-verification-modal.vue';
const maskedInfo = (value, type) => {
    if (type === 'email') {
        let maskedEmail = "";
        const parts = value.split("@");
        if (parts.length === 2) {
            const maskedUsername = parts[0];
            const domain = "***.**";
            maskedEmail = maskedUsername + "@" + domain;
        } else {
            maskedEmail = value;
        }
        return maskedEmail;
    }
    else if (type === 'phone') {
        let [countryCode, ...rest] = value.split(' ');
        rest = rest.join(' ');
        const restLength = rest.length;
        const maskedRest = rest.replace(/\d/g, '*').replace(/\s/g, ' ');
        const maskedPhoneNumber = `${countryCode} ${maskedRest}${rest[restLength - 1]}`;
        return maskedPhoneNumber;
    }
    return value;
}
const contactInfo =  [
    {
        type: 'email',
        value: 'patricia.hale@gmail.com',
        isPrimary: true,
        isMasked: true,
        isVerified: true
    },
    {
        type: 'email',
        value: 'patricia.hale@yahoo.com',
        isPrimary: false,
        isMasked: true,
        isVerified: true
    },
    {
        type: 'phone',
        value: '+1 123 456 7890',
        isPrimary: true,
        isMasked: true,
        isVerified: true
    }
]
const formattedContactInfo = reactive(contactInfo.map((info) => {
    let infoDict = {
        ...info,
        isPrimary: info.isPrimary === true? 'Primary' : 'Back Up',
        maskedValue: maskedInfo(info.value, info.type)
    }
    if (info.type === 'email') {
        return {
            ...infoDict,
            type: 'Email Address',
        }
    }
    if (info.type === 'phone') {
        return {
            ...infoDict,
            type: 'Phone Number',
        }
    }
    else {
        return {
            ...infoDict,
            type: info.type
        }
    }
}))
const valueToDisplay = computed(() => {
    return (index) => {
        return formattedContactInfo[index].isMasked ? formattedContactInfo[index].maskedValue : formattedContactInfo[index].value;
    };
});
const toggleMaskedStatus = (index) => {
    formattedContactInfo[index].isMasked = !formattedContactInfo[index].isMasked;
};
const addContact = (contact) => {
    if (contact.type && contact.value) {
        formattedContactInfo.push({
            type: contact.type === 'email' ? 'Email Address' : 'Phone Number',
            value: contact.value,
            isMasked: true,
            isVerified: false,
            maskedValue: maskedInfo(contact.value, contact.type)
        })
    }
};
const updateContact = (contact, index) => {
    if (contact.type && contact.value) {
        formattedContactInfo[index] = {
            type: contact.type === 'email' ? 'Email Address' : 'Phone Number',
            value: contact.value,
            isMasked: true,
            isVerified: false,
            maskedValue: maskedInfo(contact.value, contact.type)
        };
    }
};
</script>
