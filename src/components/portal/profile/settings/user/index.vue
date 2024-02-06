<template>
    <div class="vstack gap-2">
        <div class="hstack gap-2 mb-2">
            <img
                class="btn-icon rounded-pill border border-white"
                alt="Profile image"
                style="height: 3rem;"
                :src="profilePicture"
            />
            <h5 class="text-light m-0">{{ username }}</h5>
            <IconCheck
                class="text-success"
                size="1.5rem"
                weight="bold"
                v-if="isUserVerified"
            />
            <IconWarning
                class="text-warning"
                size="1.5rem"
                weight="fill"
                v-else
            />
        </div>
        <div>
            <h5 class="text-muted mb-0">Public Name</h5>
            <div class="d-flex">
                <div class="fs-4 flex-grow-1">{{ publicName }}</div>
                <button class="btn btn-icon text-primary">
                    <IconPencil size="1.5rem" />
                </button>
            </div>
        </div>
        <div>
            <h5 class="text-muted mb-0">Arrow Balance</h5>
            <div class="d-flex">
                <div class="fs-4 flex-grow-1 fw-bold">
                    {{ arrowBalance }} ARROW
                </div>
                <button class="btn btn-icon text-primary">
                    <IconCaretRight size="1.5rem" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const profileStore = useProfileStore();
    const username = profileStore.username;
    const publicName = profileStore.publicName;
    const profilePicture = profileStore.profilePicture;
    const arrowBalance = profileStore.arrowBalance;
    const isUserVerified = ref(true);
</script>
