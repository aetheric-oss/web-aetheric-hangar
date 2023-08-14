<template>
    <button class="justify-content-center" :class="computedClasses" :disabled="!isReady" @click="() => login()">
      <img class="google" src="~/assets/icons/google.svg" alt="Google" />
      Login with Google
    </button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

const router = useRouter();

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  const authStore = useAuthStore();
  authStore.login();

  if (authStore.userAuth) {
    router.push('/dashboard/');
  }
};


const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};


const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});

</script>

<style>
.google {
    width: 10%;
    height: 70%;
}
</style>