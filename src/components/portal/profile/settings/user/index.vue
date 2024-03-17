<template>
    <div class="vstack gap-2">
        <div class="hstack gap-2 mb-2">
            <img
                class="btn-icon rounded-pill border border-white"
                alt="Profile image"
                style="height: 3rem;"
                :src="user.profilePicture"
            />
            <h5 class="text-light m-0">{{ user.username }}</h5>
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
                <div class="fs-4 flex-grow-1">{{ user.publicName }}</div>
                <button class="btn btn-icon text-primary">
                    <IconPencil size="1.5rem" />
                </button>
            </div>
        </div>
        <div>
            <h5 class="text-muted mb-0">Arrow Balance</h5>
            <div class="d-flex">
                <div class="fs-4 flex-grow-1 fw-bold">
                    {{ user.arrowBalance }} ARROW
                </div>
                <button class="btn btn-icon text-primary">
                    <IconCaretRight size="1.5rem" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useProfileStore } from "~/store/profile";
    import type {IUser} from "~/modules/aetheric-api";

    const profileStore = useProfileStore();
    const user = ref<IUser>(await profileStore.getUser());
    // TODO: assume true for now, needs to be checked properly
    const isUserVerified = ref(true);
</script>
