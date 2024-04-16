<template>
    <Loading />
    <div class="d-flex flex-row flex-wrap vh-100 g-0 align-items-stretch">
        <PortalNav
            data-bs-theme="dark"
            class="col-12 col-lg-4 col-xl-3"
        />
        <main class="d-flex flex-grow-1 overflow-x-auto">
            <slot></slot>
            <div id="modal-container" class="position-absolute"></div>
        </main>
    </div>
</template>
