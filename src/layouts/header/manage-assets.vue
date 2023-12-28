<template>
    <header class="container">
        <div class="row">
            <div class="col-auto">
                <section aria-label="breadcrumb" class="first d-md-flex">
                    <ol class="text-dark text-uppercase d-flex align-items-center list-unstyled p-2 assets-header">
                        <li class="breadcrumb-item ">
                            <span>Manage assets </span>
                            <PhCaretRight :size="24" />
                        </li>
                        <li class="breadcrumb-item ">
                            <span>My assets </span>
                            <PhCaretRight :size="24" />
                        </li>
                        <li class="breadcrumb-item font-weight-bold">
                            <span>
                                {{ selectedLabel  }}
                            </span>
                        </li>
                    </ol>
                </section>
            </div>
        </div>
        <section class="text-center mt-2">
            <div class="btn-group d-flex justify-content-center buttons-group btn-gray" role="group">
                <button
                    v-for="(state, index) in buttonStates"
                    :key="index"
                    type="button"
                    class="btn mx-1 rounded-pill assets-header"
                    :class="{'bg-success text-white': state, 'manage-header-color text-black': !state}"
                    @click="selectButton(index)"
                >
                    {{ buttons[index].label }}
                </button>
            </div>
        </section>
    </header>
</template>

<script setup>
import { PhCaretRight } from '@phosphor-icons/vue';
const selectedLabel = ref('');
const buttonStates = ref([true, false, false, false]);

const selectButton = (index) => {
    buttonStates.value = buttonStates.value.map((state, i) => i === index);
    selectedLabel.value = buttons[index].label;
};

const buttons = [
    { label: '{E}VTOL AIRCRAFT' },
    { label: 'VERTIPOTS & PADS' },
    { label: 'PILOTS' },
    { label: 'RECHARGERS' },
];

selectedLabel.value = buttons[0].label;

</script>
