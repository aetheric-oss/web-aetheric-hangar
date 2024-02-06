<template>
    <div class="input-digit__component d-grid gap-1 w-100 mb-2">
        <div class="input-digit d-grid w-auto gap-1 rounded-pill">
            <input
                class="input-digit__field"
                :id="id"
                type="text"
                v-model.number.lazy="inputValue"
            />
            <div class="input-digit__arrows ms-auto">
                <btn
                    class="btn btn-icon text-white input-digit__arrow-up"
                    @click="incrementValue"
                >
                    <PhCaretUp :size="10" />
                </btn>
                <btn
                    class="btn btn-icon text-white input-digit__arrow-down"
                    @click="decrementValue"
                >
                    <PhCaretDown :size="10" />
                </btn>
            </div>
        </div>
        <h5 class="input-digit__label">
            {{ digitLabel }}
        </h5>
    </div>
</template>

<script setup lang="ts">
    import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";

    const props = defineProps({
        id: {
            type: String,
            required: true,
        },
        digitLabel: {
            type: String,
            required: true,
            default: "",
        },
    });

    // Reactive vars
    const inputValue = defineModel("inputValue", { default: 0 });

    // Functions
    const incrementValue = () => {
        if (inputValue.value < 10) {
            inputValue.value = inputValue.value + 1;
        } else {
            inputValue.value = 10;
        }
    };
    const decrementValue = () => {
        if (inputValue.value > 1) {
            inputValue.value = inputValue.value - 1;
        } else {
            inputValue.value = 1;
        }
    };
</script>

<style lang="scss" scoped>
    .input-digit__component {
        grid-template-columns: auto 1fr;
        grid-template-areas: "input-field-box label";

        .input-digit {
            grid-area: input-field-box;
            background-color: rgba(128, 134, 237, 0.1);
            border: 1px solid $white;
            grid-template-columns: 10px 10px;
            grid-template-areas: "input-field arrows";
            padding: 4px 15px;

            .input-digit__field {
                grid-area: input-field;
                color: $white;
                font-weight: 600;
            }
        }
        .input-digit__label {
            grid-area: label;
            color: $white;
            vertical-align: middle;
            margin: auto 0;
        }
    }
</style>
