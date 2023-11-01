<template>
    <div>
        <Menu :activePageIndex="2"></Menu>
        <hr class="m-1">
        <div class="m-auto w-100">
            <div class="d-flex pe-2">
                <h5 class="m-0 flex-grow-1 align-self-center">payment info</h5>
                <button class="btn btn-icon text-primary">
                    <PhPencil size="30" />
                </button>
            </div>
            <div class="pe-2">
                <div v-for="(info, index) in formattedPaymentInfo" :key="index">
                    <div class="d-flex gap-1 mb-1 align-items-start">
                        <div class="d-flex flex-column">
                            <h6>{{ info.type }}</h6>
                            <div class="d-flex gap-1">
                                <div>{{ valueToDisplay(index) }}</div>
                                <button class="btn btn-icon text-white fs-5 my-auto lh-0" @click="toggleMaskedStatus(index)">
                                    <PhEye :size="18" v-show="info.isMasked"/>
                                    <PhEyeSlash :size="18" v-show="!info.isMasked"/>
                                </button>
                                <button class="btn btn-icon fs-4 ms-1 me-2 lh-0" v-if="!info.isVerified">
                                    <PhWarning class="text-warning" :size="18" weight="fill" />
                                </button>
                                <PhCheck class="text-success lh-0" :size="18" weight="bold" v-if="info.isVerified" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-outline-primary align-self-center">
                    Add New
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Menu from '@/components/profile/menu.vue';
definePageMeta({ layout: 'portal' });

import { reactive, computed } from 'vue'
import { PhPencil, PhEye, PhEyeSlash, PhWarning, PhCheck } from "@phosphor-icons/vue";
const maskedInfo = (value, type) => {
    if (type === 'Bank Account') {
        let maskedValue = "";
        const digitsOnly = value.replace(/\D/g, '');
        const lastThreeDigits = digitsOnly.slice(-3);
        const maskedPart = '*'.repeat(digitsOnly.length - 3);
        maskedValue = maskedPart + lastThreeDigits;
        return maskedValue;
    } else {
        return value;
    }
}
const paymentInfo = [
    {
        type: 'Bank Account',
        value: '1234 5678 9012 3456',
        isMasked: true,
        isVerified: true
    },
]
const formattedPaymentInfo = reactive(paymentInfo.map((info) => {
    return {
        ...info,
        maskedValue: maskedInfo(info.value, info.type)
    }
}))
const valueToDisplay = computed(() => {
    return (index) => {
        return formattedPaymentInfo[index].isMasked ? formattedPaymentInfo[index].maskedValue : formattedPaymentInfo[index].value;
    };
});
const toggleMaskedStatus = (index) => {
    formattedPaymentInfo[index].isMasked = !formattedPaymentInfo[index].isMasked;
};
</script>
