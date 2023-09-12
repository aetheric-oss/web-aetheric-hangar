<template>
    <div class="m-auto w-100">
        <div class="d-flex">
            <h5 class="m-0 flex-grow-1 align-self-center">Contact Info</h5>
            <GenericModal modalId="contact-info-modal" title="contact">
                <template #activation-button>
                    <PhPencil size="30" color="#ff5e45" />
                </template>
                <template #content>
                    <p>Hello from the modal!</p>
                </template>
            </GenericModal>
        </div>
        <div class="pe-2">
            <div v-for="(info, index) in formattedContactInfo" :key="index">
                <h6>{{ info.type }}</h6>
                <div class="d-flex gap-1 mb-1 align-items-start">
                    <div>{{ valueToDisplay(index) }}</div>
                    <h5>{{ info.isPrimary }}</h5>
                    <button class="btn m-0 p-0 ms-auto lh-1" @click="toggleMaskedStatus(index)">
                        <PhEye :size="16" color="#ff5e45" v-show="info.isMasked"/>
                        <PhEyeSlash :size="16" color="#ff5e45" v-show="!info.isMasked"/>
                    </button>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-outline-primary">Add New</button>
        </div>
    </div>

</template>

<script setup>
import { reactive, computed } from 'vue'
import { PhPencil, PhEye, PhEyeSlash } from "@phosphor-icons/vue";
import GenericModal from '../../generic-modal.vue';
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
        isMasked: true
    },
    {
        type: 'email',
        value: 'patricia.hale@yahoo.com',
        isPrimary: false,
        isMasked: true
    },
    {
        type: 'phone',
        value: '+1 123 456 7890',
        isPrimary: true,
        isMasked: true
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
</script>
