<template>
    <Loading />
    <div class="row g-0">
        <PortalNav
            data-bs-theme="dark"
            class="col-12 col-lg-4 col-xl-3"
        />
        <main class="min-vh-100 col-lg overflow-x-auto">
            <slot></slot>
        </main>
    </div>
</template>
