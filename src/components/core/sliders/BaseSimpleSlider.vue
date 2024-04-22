<script>
/**
 * Descripción: Slider reutilizable
 *
 * @displayName BaseSimpleSlider
 */

export default {
    name: 'BaseSimpleSlider',

    inheritAttrs: false,

    props: {
        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },

        /**
         * Caracteres max
         * Default: 100
         */
        max: {
            type: Number,
            default: 100,
        },

        /**
         * Caracteres min
         * Default: 0
         */
        min: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            counter: this.value,
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },
    },

    /**
     * Metodos click icon
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        change() {
            this.$_updateValue(this.counter);
        },
    },
};
</script>

<template>
    <v-slider
        v-model="counter"
        color="primary"
        track-color="grey"
        always-dirty
        :min="min"
        :max="max"
        @change="change"
    />
</template>
