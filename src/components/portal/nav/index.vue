<template>
    <nav id="portal-nav" class="nav d-flex position-relative">
        <PortalNavNotifications position="top" />
        <PortalNavAccount position="start" @switch-account="switchAccount" />
        <PortalNavProfile position="bottom" />

        <div class="d-flex flex-column px-2 p-xxl-3 w-100">
            <div
                class="nav-header d-flex align-items-center pb-3 sticky-top bg-body"
            >
                <router-link
                    :to="'/dashboard'"
                    class="h-100 d-flex flex-grow-1 text-start align-items-center"
                >
                    <img
                        class="h-100 mw-100"
                        src="/img/logo-services.svg"
                        alt="Arrow Logo"
                    />
                </router-link>
                <button
                    class="btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#popupNotifications"
                    aria-controls="popupNotifications"
                >
                    <IconBell size="1.5rem"></IconBell>
                </button>
                <button
                    class="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <component :is="menuIcon" size="1.5rem"></component>
                </button>
            </div>

            <div id="sidenav" class="collapse flex-column h-100">
                <div class="nav-body d-grid gap-1 flex-grow-1 overflow-x-auto">
                    <div><PortalNavAccordion class="accordion" /></div>
                </div>

                <div
                    class="nav-footer d-grid gap-2 mt-auto mb-2 align-content-bottom"
                >
                    <div class="d-flex my-1">
                        <div class="pe-1">
                            <IconQuestion class="text-white" size="2rem" />
                        </div>
                        <a class="align-self-center" href="#">Need help?</a>
                    </div>

                    <PortalNavFooterButton
                        class="bg-body-tertiary"
                        titleHeading="Business"
                        :title="currentBusiness.name"
                        :image="currentBusiness.imgSrc"
                        icon="IconArrowsLeftRight"
                        target="popupAccount"
                    />
                    <PortalNavFooterButton
                        class="bg-body-secondary"
                        title="My Profile"
                        image="/img/demo/my-profile.png"
                        icon="IconCaretDown"
                        target="popupProfile"
                    />
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    const profileStore = useProfileStore();
    const currentBusiness = profileStore.getCurrentBusiness;

    const menuIcon = ref("IconList");

    onMounted(() => {
        let collapse = document.getElementById("sidenav")!;
        collapse.addEventListener("show.bs.collapse", function () {
            menuIcon.value = "IconClose";
        });

        collapse.addEventListener("hide.bs.collapse", function () {
            menuIcon.value = "IconList";
        });
    });
</script>

<style lang="scss">
    #portal-nav:has(#sidenav.show, #sidenav.collapsing) {
        min-height: 100vh;
    }

    #portal-nav {
        .accordion {
            --bs-accordion-active-bg: var(--bs-secondary-bg);
            --bs-accordion-active-color: var(--bs-white);
            --bs-accordion-btn-focus-box-shadow: none;

            .accordion-item {
                border-radius: var(--bs-accordion-border-radius);

                a.nav-link {
                    text-transform: none;
                }
                a {
                    text-decoration: none;
                    font-weight: 500;
                }

                a.router-link-active {
                    color: var(--bs-secondary);
                    font-weight: $font-weight-bold;
                }
            }

            .accordion-button {
                text-transform: uppercase;
            }

            // set caret icon color
            .accordion-button::after {
                filter: invert(94%) sepia(0%) saturate(0%) hue-rotate(192deg)
                    brightness(106%) contrast(105%);
            }
        }
        .btn {
            // use same padding as accordion buttons
            padding: $accordion-button-padding-y $accordion-button-padding-x;
        }
        .btn-icon {
            height: 2rem;
        }

        .offcanvas {
            --bs-offcanvas-height: auto;
            --bs-offcanvas-border-width: 0;
            .offcanvas-header {
                padding-bottom: 0;
            }
        }
        .offcanvas-body {
            display: grid;
            flex-basis: 0;
            min-height: 30vh;
        }
        .offcanvas-footer {
            display: grid;
            flex-grow: 0;
            padding: var(--bs-offcanvas-padding-y) var(--bs-offcanvas-padding-x);
        }
        .offcanvas.show,
        .offcanvas.showing {
            width: 100%;
        }
        .offcanvas-top {
            bottom: unset;
        }

        #sidenav.collapse.show,
        #sidenav.collapsing {
            display: flex;
        }
        #sidenav .overflow-x-auto {
            flex-basis: 0;
        }
        @include media-breakpoint-up("lg") {
            #sidenav.collapse:not(.show) {
                display: flex;
            }
            .offcanvas.show,
            .offcanvas.showing {
                position: absolute;
            }
        }
        @include media-breakpoint-down("lg") {
            .accordion {
                .accordion-item {
                    border-radius: 0;
                }
            }
        }

        @include color-mode(dark) {
            .router-link-active.accordion-button::after {
                --#{$prefix}accordion-btn-icon: #{escape-svg(
                        $accordion-link-active-icon-dark
                    )};
            }
        }
    }
</style>
