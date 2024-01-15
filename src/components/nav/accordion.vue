<template>
    <div class="accordion-item-dark">
        <button
            :class="{
                collapsed: isCollapsed,
                'accordion-button': true,
                'sidenav-text': true,
            }"
            type="button"
            :data-bs-toggle="`collapse`"
            :data-bs-target="`#flush-collapse${id}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${id}`"
            @click="toggleCollapse"
        >
            <div class="icon-container sidenav-text">
                <nuxt-icon :name="icon" filled />
            </div>
            <div class="title-container sidenav-text">
                <router-link
                    :to="`/${title.toLowerCase()}`"
                    v-if="!isNested"
                    class="sidenav-text"
                >
                    {{ title }}
                </router-link>
                <span v-else>
                    {{ title }}
                </span>
            </div>
            <!-- span an icon to right for dropdown -->
            <div class="dropdown-icon-container sidenav-text">
                <IconCaretRight v-if="!isNested" :size="22" />
                <IconCaretDown v-else-if="!isCollapsed" :size="22" />
                <IconCaretUp v-else :size="22" />
            </div>
        </button>
        <div
            :id="`flush-collapse${id}`"
            :class="`accordion-collapse collapse`"
            data-bs-parent="#accordionFlushExample"
            v-if="isNested"
        >
            <div class="accordion-body">
                <span v-for="(item, index) in items" :key="index">
                    <router-link
                        :to="item.path"
                        class="nav-link accordion-text"
                    >
                        {{ item.name }}
                    </router-link>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        id: Number,
        icon: String,
        title: String,
        items: Array,
    });
    // not equal boolean operator !==
    const isNested = props.items.length !== 0;
    const isCollapsed = ref(true);
    const toggleCollapse = () => {
        // if the items array is empty, don't toggle
        if (props.items.length === 0) {
            isCollapsed.value = true;
            window.location.href = `/${props.title.toLowerCase()}`;
        } else {
            isCollapsed.value = !isCollapsed.value;
        }
    };
</script>

<style scoped lang="scss">
    .accordion-item-dark {
        border-radius: 8px;
        padding-bottom: 12px;
    }
    .accordion-button {
        background-color: var(--bs-gray-900) !important;
        border-radius: 8px;
        padding: 12px;

        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: 1fr;
        grid-template-areas: "icon-container title-container dropdown-icon-container";
        grid-column-gap: 16px;

        &:not(.collapsed) {
            border-top-left-radius: 8px !important;
            border-top-right-radius: 8px !important;
            border-bottom-left-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
            border: none;
        }

        .icon-container {
            grid-area: icon-container;
            font-size: 22px;
        }

        .title-container {
            grid-area: title-container;
        }

        .dropdown-icon-container {
            grid-area: dropdown-icon-container;
        }
    }
    .accordion-body {
        background-color: var(--bs-gray-900) !important;
        border-bottom-left-radius: 8px !important;
        border-bottom-right-radius: 8px !important;

        .accordion-text {
            font-family: "Poppins";
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            text-transform: capitalize;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.7);
        }
    }
</style>
