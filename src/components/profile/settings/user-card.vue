<template>
    <div class="profile-user-card">
        <div class="d-flex mb-2">
            <div class="profile-icon rounded-circle me-1">
                <img src="/img/demo/my-profile.png" alt="Profile Image">
            </div>
            <h5 class="align-self-center text-light">{{ username }}</h5>
            <div class="my-auto mx-0 align-self-center ms-1">
                <PhCheck class="text-success" :size="32" color="#28bb94" weight="bold" v-if="isUserVerified" />
                <PhWarning class="text-warning" :size="32" weight="fill" v-else/>
            </div>
        </div>
        <div class="m-auto w-100 pb-2">
            <div class="d-flex pe-2">
                <div class="flex-grow-1 form-text">
                    <h5 class="m-0">Public Name</h5>
                    <div class="fs-5">{{ publicName }}</div>
                </div>
                <button class="btn btn-icon text-primary">
                    <PhPencil :size="32" />
                </button>
            </div>
        </div>
        <div class="m-auto w-100">
            <div class="d-flex pe-2">
                <div class="flex-grow-1 form-text">
                    <h5 class="m-0">Arrow Balance</h5>
                    <div class="fs-5 dt-1">{{ arrowBalance }} ARROW</div>
                </div>
                <button class="btn btn-icon text-primary">
                    <PhCaretRight :size="32" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhPencil, PhCaretRight, PhCheck, PhWarning } from "@phosphor-icons/vue";
const profileStore = useProfileStore();
const username = profileStore.getUsername;
const publicName = profileStore.getPublicName;
const arrowBalance = profileStore.getArrowBalance;
const isUserVerified = ref(true);
</script>

