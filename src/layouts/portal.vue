<template>
    <Loading />
    <div class="row row-cols-1 row-cols-lg-2 vh-100 g-0 align-items-stretch">
        <PortalNav data-bs-theme="dark" class="col col-lg-4 col-xl-3" />
        <main class="d-flex col col-lg-8 col-xl-9 overflow-x-auto">
            <div data-bs-theme="default" class="vstack pt-2 px-lg-2 px-xxl-3 pt-xxl-3">
                <slot></slot>
            </div>
        </main>
    </div>
</template>
<style lang="scss" scoped>
    @include media-breakpoint-up("lg") {
        main {
            max-height: 100vh;
        }
    }
</style>
