<template>
    <header class="sticky-top px-2">
        <div class="hstack gap-2 py-1 fs-5">
            <div class="hstack gap-2 flex-grow-1">
                <button
                    v-if="showBackButton"
                    @click="$router.back()"
                    class="btn btn-icon"
                >
                    <IconArrowLeft size="1.5rem" class="text-primary" />
                </button>
                <template v-for="item in parent.split('/')">
                    <div
                        class="text-uppercase text-primary text-decoration-underline"
                    >
                        {{ item }}
                    </div>
                    <IconCaretRight size="1.5rem" />
                </template>
                <div class="text-uppercase">
                    {{ activePage ? activePage.name : "" }}
                </div>
            </div>
            <div class="dropdown">
                <button
                    class="btn px-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <component :is="selectedModeIcon" size="1.5rem" />
                </button>
                <ul class="dropdown-menu">
                    <li
                        v-for="(value, key) in modes"
                        :key="key"
                        @click="changeMode(key as string)"
                    >
                        <a class="dropdown-item text-center" href="#">
                            <component :is="value" />
                            {{ key }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="hstack gap-2 justify-content-center my-3">
            <nuxt-link
                v-for="(item, index) in menuItems"
                class="btn rounded-pill text-uppercase text-nowrap"
                :class="
                    activePage
                        ? {
                            'btn-secondary': item.path === activePage.path,
                            'bg-body-secondary':
                                item.path !== activePage.path,
                        }
                        : 'bg-body-secondary'
                "
                :to="'/' + parent + '/' + item.path"
            >
                {{ item.name }}
            </nuxt-link>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useProfileStore } from "~/store/profile";

    const props = defineProps({
        parent: {
            type: String,
            required: true,
        },
        menuItems: {
            type: Array<IMenuItem>,
            required: true,
        },
        activePage: {
            type: Object as PropType<ISubMenuItem>,
        },
    });

    const router = useRouter();
    const profileStore = useProfileStore();
    const modes: IDropdownValues = {
        dark: "IconMoonStars",
        light: "IconSunDim",
        auto: "IconCircleHalf",
    };

    // Reactive vars
    const showBackButton = computed(() => {
        const prev = router.options.history.state.back ?? "";
        if (
            "/" + props.parent === prev ||
            sharesParent("" + prev, router.options.history.location)
        ) {
            return true;
        }
        return false;
    });

    const selectedTheme = useSelectedTheme();
    const selectedModeIcon = computed(() => {
        return modes[selectedTheme.value];
    });

    // Functions
    const changeMode = (mode: string) => {
        profileStore.setTheme(mode);
        selectedTheme.value = mode;
    };
</script>
