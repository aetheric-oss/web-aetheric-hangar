<template>
    <div class="h-100">
        <NuxtLayout name="login">
            <template #content>
                <h1 class="fs-3">Welcome back to Hangar</h1>
                <div class="my-3">
                    <AuthLoginGoogle />
                </div>
                <div class="d-flex">
                    <hr class="flex-grow-1 border border-1 border-light" />
                    <span class="align-self-center px-2">OR</span>
                    <hr class="flex-grow-1 border border-1 border-light" />
                </div>
                <AuthLoginLocal />
                <h5 class="p-3 fs-6">
                    Don't have an account? <a href="#">Sign up for FREE</a>
                </h5>
            </template>

            <template #image>
                <img
                    src="/img/login-background.jpg"
                    alt="Login Arrow Background"
                    loading="lazy"
                />
            </template>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: false,
    });
</script>
