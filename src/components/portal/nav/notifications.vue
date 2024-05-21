<template>
    <PortalNavPopup popupId="popupNotifications" position="top">
        <template #title>
            <div class="text-start">
                <IconBell class="m-1" size="1.5rem"></IconBell>
                Notifications
            </div>
        </template>
        <template #content>
            <div class="d-grid gap-1">
                <PortalNavPopupCard
                    text="Document is Awaiting Upload"
                    icon="IconWarning"
                    iconColor="warning"
                >
                    <template #left>
                        <div class="pe-2">
                            <IconArrowsInSimple size="1.5rem" />
                        </div>
                    </template>
                </PortalNavPopupCard>

                <PortalNavPopupCard
                    text="Teammate Added"
                    icon="IconDotOutline"
                    iconColor="info"
                >
                    <template #left>
                        <div class="pe-2">
                            <IconUserCircle size="1.5rem" />
                        </div>
                    </template>
                </PortalNavPopupCard>

                <PortalNavPopupCard
                    text="New VTOL Asset Added"
                    icon="IconDotOutline"
                    iconColor="info"
                >
                    <template #left>
                        <div class="pe-2">
                            <img src="/icons/vtol.svg" />
                        </div>
                    </template>
                </PortalNavPopupCard>
            </div>
        </template>
    </PortalNavPopup>
</template>
