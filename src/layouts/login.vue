<template class="container-fluid">
    <Loading />
    <main class="row g-0 p-2 p-md-3 p-lg-2 p-xl-3 min-h-100 position-relative">
        <section class="col-12 col-lg-4 col-xxl-3 z-1 p-2">
            <img
                src="/img/logo-services.svg"
                alt="Desktop Login Arrow Menu"
                class="w-50 mb-3"
            />
            <slot name="content"></slot>
        </section>
        <section
            class="col z-0 p-0 p-lg-2 ps-xl-3 login-image align-self-stretch"
        >
            <slot name="image"></slot>
        </section>
    </main>
</template>

<script setup lang="ts">
    useHead({
        bodyAttrs: {
            "data-bs-theme": "dark",
        },
    });
</script>

<style lang="scss">
    @include media-breakpoint-up("lg") {
        .login-image img {
            object-fit: cover;
            object-position: center 20%;
            border-radius: 50px 0px 0px 50px;
            height: 100%;
            width: 100%;
        }
    }
    @include media-breakpoint-down("lg") {
        .login-image {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .login-image img {
            opacity: 5%;
            object-fit: cover;
            object-position: center 20%;
            height: 100%;
            width: 100%;
        }
    }
</style>
