<template>
    <div class="m-auto w-100">
        <div class="d-flex pe-2">
            <h5 class="m-0 flex-grow-1 align-self-center">contact</h5>
            <button class="btn btn-icon text-primary" @click="showModal">
                <IconPencil size="30" />
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
                        <ProfileSettingsContactVerificationModal
                            :contactForm="info"
                            :index="index"
                            v-if="!info.isVerified"
                        >
                            <button
                                class="btn btn-icon text-warning fs-4 ms-1 me-2"
                            >
                                <IconWarning :size="24" weight="fill" />
                            </button>
                        </ProfileSettingsContactVerificationModal>
                        <button
                            class="btn btn-icon text-primary fs-5"
                            @click="toggleMaskedStatus(index)"
                        >
                            <IconEye :size="20" v-show="info.isMasked" />
                            <IconEyeSlash :size="20" v-show="!info.isMasked" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <ProfileSettingsContactModal @add="addContact">
                <span>Add New</span>
            </ProfileSettingsContactModal>
        </div>
    </div>
</template>

<script setup>
    import { reactive, computed } from "vue";

    const contactInfo = [
        {
            type: "email",
            value: "patricia.hale@gmail.com",
            isPrimary: true,
            isMasked: true,
            isVerified: true,
        },
        {
            type: "email",
            value: "patricia.hale@yahoo.com",
            isPrimary: false,
            isMasked: true,
            isVerified: true,
        },
        {
            type: "phone",
            value: "+1 123 456 7890",
            isPrimary: true,
            isMasked: true,
            isVerified: true,
        },
    ];

    const formattedContactInfo = reactive(
        contactInfo.map((info) => {
            let infoDict = {
                ...info,
                isPrimary: info.isPrimary === true ? "Primary" : "Back Up",
                maskedValue: maskedInfo(info.value, info.type),
            };
            if (info.type === "email") {
                return {
                    ...infoDict,
                    type: "Email Address",
                };
            }
            if (info.type === "phone") {
                return {
                    ...infoDict,
                    type: "Phone Number",
                };
            } else {
                return {
                    ...infoDict,
                    type: info.type,
                };
            }
        })
    );

    // Functions
    const valueToDisplay = computed(() => {
        return (index) => {
            return formattedContactInfo[index].isMasked
                ? formattedContactInfo[index].maskedValue
                : formattedContactInfo[index].value;
        };
    });

    const maskedInfo = (value, type) => {
        if (type === "email") {
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
        } else if (type === "phone") {
            let [countryCode, ...rest] = value.split(" ");
            rest = rest.join(" ");
            const restLength = rest.length;
            const maskedRest = rest.replace(/\d/g, "*").replace(/\s/g, " ");
            const maskedPhoneNumber = `${countryCode} ${maskedRest}${
                rest[restLength - 1]
            }`;
            return maskedPhoneNumber;
        }
        return value;
    };

    const toggleMaskedStatus = (index) => {
        formattedContactInfo[index].isMasked =
            !formattedContactInfo[index].isMasked;
    };
    const addContact = (contact) => {
        if (contact.type && contact.value) {
            formattedContactInfo.push({
                type:
                    contact.type === "email" ? "Email Address" : "Phone Number",
                value: contact.value,
                isMasked: true,
                isVerified: false,
                maskedValue: maskedInfo(contact.value, contact.type),
            });
        }
    };
    const updateContact = (contact, index) => {
        if (contact.type && contact.value) {
            formattedContactInfo[index] = {
                type:
                    contact.type === "email" ? "Email Address" : "Phone Number",
                value: contact.value,
                isMasked: true,
                isVerified: false,
                maskedValue: maskedInfo(contact.value, contact.type),
            };
        }
    };
</script>
