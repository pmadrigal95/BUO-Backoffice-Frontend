<script>
/**
 * Descripción: Componente Ejes de comportamiento
 *
 * @displayName BasePdaSlider
 */

export default {
    name: 'BasePdaSlider',

    props: {
        color: {
            type: String,
            default: 'riesgo',
        },

        value: {
            type: [String, Number],
            required: true,
        },
    },
};
</script>

<template>
    <v-slider
        readonly
        min="0"
        max="100"
        :value="value"
        :class="`pda-slider ${color}`"
    />
</template>

<style scoped>
.pda-slider >>> .v-slider--horizontal {
    min-height: 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
}
.pda-slider >>> .v-slider__track-container {
    -webkit-appearance: none !important;
    width: 100% !important;
    height: 15px !important;
    outline: none !important;
    opacity: 0.8 !important;
}

.pda-slider >>> .v-slider__thumb {
    -webkit-appearance: none !important;
    appearance: none !important;
    width: 26px !important;
    height: 26px !important;
    border-radius: 50% !important;
    background: white !important;
    cursor: pointer !important;
}

.riesgo >>> .v-slider__track-background {
    border-radius: 10em !important;
    background: linear-gradient(#ed8000, #ffcc9d, #ed8000) !important;
}

.riesgo >>> .v-slider__track-fill {
    border-radius: 10em !important;
    background: linear-gradient(#ed8000, #ffcc9d, #ed8000) !important;
}

.riesgo >>> .v-slider__thumb {
    border: 2px solid #ed8000 !important;
}

.extroversion >>> .v-slider__track-background {
    border-radius: 10em !important;
    background: linear-gradient(#edd500, #fff59d, #edd500) !important;
}

.extroversion >>> .v-slider__track-fill {
    border-radius: 10em !important;
    background: linear-gradient(#edd500, #fff59d, #edd500) !important;
}

.extroversion >>> .v-slider__thumb {
    border: 2px solid #edd500 !important;
}

.paciencia >>> .v-slider__track-background {
    border-radius: 10em !important;
    background: linear-gradient(#3ca1c7, #a8e8ff, #3ca1c7) !important;
}

.paciencia >>> .v-slider__track-fill {
    border-radius: 10em !important;
    background: linear-gradient(#3ca1c7, #a8e8ff, #3ca1c7) !important;
}

.paciencia >>> .v-slider__thumb {
    border: 2px solid #3ca1c7 !important;
}

.normas >>> .v-slider__track-background {
    border-radius: 10em !important;
    background: linear-gradient(#02aa72, #66ff9a, #02aa72) !important;
}

.normas >>> .v-slider__track-fill {
    border-radius: 10em !important;
    background: linear-gradient(#02aa72, #66ff9a, #02aa72) !important;
}

.normas >>> .v-slider__thumb {
    border: 2px solid #02aa72 !important;
}

.autocontrol >>> .v-slider__track-background {
    border-radius: 10em !important;
    background: linear-gradient(#ad00ff, #f587ff, #ad00ff) !important;
}

.autocontrol >>> .v-slider__track-fill {
    border-radius: 10em !important;
    background: linear-gradient(#ad00ff, #f587ff, #ad00ff) !important;
}

.autocontrol >>> .v-slider__thumb {
    border: 2px solid #ad00ff !important;
}
</style>
