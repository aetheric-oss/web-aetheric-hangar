<template>
    <div class="h-100">
        <NuxtLayout name="login">
            <template #content>
                <h1 class="fs-3 my-3">Welcome to Hangar!</h1>
                <AuthLoginLocalDemo />
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
        name: "demo"
    });
</script>
