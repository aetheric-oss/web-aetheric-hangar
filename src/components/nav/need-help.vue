<template>
    <div class="need-help-container">
        <div class="need-help-icon">
            <IconQuestion size="24" />
        </div>
        <div class="need-help-text">Need help?</div>
    </div>
</template>

<style scoped lang="scss">
    .need-help-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "icon text";
        gap: 12px;

        .need-help-icon {
            grid-area: icon;
            color: #a7a7ba;
            margin: auto;
            display: block;
        }

        .need-help-text {
            grid-area: text;
            font-family: "Poppins";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            color: #a7a7ba;
            margin: auto 0;
        }
    }
</style>
