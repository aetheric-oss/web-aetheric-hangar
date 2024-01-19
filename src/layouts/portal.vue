<template>
    <Loading />
    <div class="row h-100">
        <PortalNav class="col-12 col-lg-4 col-xl-3 overflow-y-auto" />
        <main class="col overflow-y-auto">
            <slot></slot>
            <div id="modal-container" class="position-absolute"></div>
        </main>
    </div>
</template>

<style lang="scss">
    nav {
        .accordion {
            --bs-accordion-btn-padding-y: 0.7rem;
            --bs-border-color: var(--bs-gray-900);
            --bs-accordion-active-bg: var(--bs-gray-900);
            --bs-accordion-active-color: var(--bs-white);
            --bs-accordion-btn-focus-box-shadow: none;

            .accordion-item {
                a {
                    text-decoration: none;
                    font-weight: 500;
                }
            }

            .accordion-button {
                text-transform: uppercase;
            }

            // set caret icon color
            .accordion-button::after {
                filter: invert(94%) sepia(0%) saturate(0%) hue-rotate(192deg) brightness(106%) contrast(105%);
            }
        }
    }

    @include media-breakpoint-up("lg") {
        nav {
            .accordion {
                .accordion-item {
                    margin-bottom: 0.5rem;
                }
            }
        }
    }
    @include media-breakpoint-down("lg") {
        nav {
            .accordion {
                .accordion-item {
                    border-radius: 0;
                    margin-bottom: 0;
                }
            }
        }
    }
</style>
