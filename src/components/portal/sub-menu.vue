<template>
    <header class="px-2">
        <div class="hstack gap-2 py-1 fs-5">
            <div class="text-uppercase text-primary text-decoration-underline">
                {{ parent }}
            </div>
            <IconCaretRight size="1.5rem" />
            <div class="text-uppercase">
                    {{ activePage ? activePage.name : "" }}
            </div>
        </div>
        <div class="hstack gap-2 justify-content-center my-3">
            <nuxt-link
                v-for="(item, index) in menuItems"
                class="btn rounded-pill text-uppercase"
                :class="activePage ? {
                    'bg-body-tertiary': item.path === activePage.path,
                    'text-body-tertiary': item.path === activePage.path,
                    'bg-body-secondary btn-light': item.path !== activePage.path,
                } : 'bg-body-secondary btn-light'"
                :to="'/'+ parent + '/' + item.path"
            >
                {{ item.name }}
            </nuxt-link>
        </div>
    </header>
</template>

<script setup lang="ts">
    const props = defineProps({
        parent: {
            type: String,
            required: true
        },
        menuItems: {
            type: Array<IMenuItem>,
            required: true,
        },
        activePage: {
            type: Object as PropType<ISubMenuItem>,
        }
    });
</script>
