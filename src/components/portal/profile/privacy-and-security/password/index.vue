<template>
    <div class="m-auto w-100">
        <div class="d-flex flex-column mb-2">
            <h5 class="text-muted">Password</h5>
            <div class="d-flex flex-column mb-1">
                <div class="flex-grow-1 text-muted text-uppercase small">
                    Current password
                </div>
                <div class="d-flex gap-1 align-items-center">
                    *****
                    <PortalPopupIcon
                        class="ms-auto text-primary"
                        icon="IconPencil"
                        target="popupProfilePrivacyAndSecurity"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
