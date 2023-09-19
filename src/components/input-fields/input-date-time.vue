<template>
    <div :class="['input__datetime', darkMode ? 'input-dark-mode' : 'input-light-mode']">
        <div class="input__div">
            <div class="left-icon">
                <nuxt-icon name="icon_calendar_clock"/>
            </div>
            <input class="input__field__date"
                :id="id"
                type="date"
                v-model="inputDateObj"
                @input="(input) => $emit('inputDate', input.target.value)"
            />
            <input class="input__field__time"
                :id="id"
                type="time"
                v-model="inputTimeObj"
                @input="(input) => $emit('inputTime', input.target.value)"
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    darkMode: {
        type: Boolean,
        default: false
    },
    id: {
        type: Number,
        required: true
    },
    inputDate: {
        type: String,
        required: true,
        default: ''
    },
    inputTime: {
        type: String,
        required: true,
        default: ''
    }
});
const emit = defineEmits(['inputDate', 'inputTime']);
const inputDateObj = ref(props.inputDate);
const inputTimeObj = ref(props.inputTime);
</script>

<style scoped lang="scss">
.input__datetime {
    display: grid;
    grid-template-rows: auto;
    grid-template-areas: "input-div";
    gap: 5px;
    align-items: center;
    margin: 0.5rem 0;
    padding: 0.5rem 0;

    .input__div {
        grid-area: input-div;
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-rows: 1fr;
        grid-template-areas: "left-icon input-date input-time";
        gap: 8px;
        align-items: center;
        justify-content: flex-start;

        .left-icon {
            grid-area: left-icon;
            font-size: 20px;
            color: $primary_arrow_blue;
        }

        .input__field__date {
            grid-area: input-date;
            color: $primary_arrow_blue;

            &::-webkit-calendar-picker-indicator {
                background: none;
                display: none;
            }
        }

        .input__field__time {
            grid-area: input-time;
            color: $primary_arrow_blue;

            &::-webkit-calendar-picker-indicator {
                background: none;
                display: none;
            }
        }
    }
}
</style>
