<script>
/**
 * Descripción: Progress Linear reutilizable
 *
 * @displayName BaseProgressLinear
 */

export default {
    name: 'BaseProgressLinear',

    inheritAttrs: false,

    props: {
        /**
         * absolute
         * No Requerido
         */
        absolute: {
            type: Boolean,
            default: false,
        },

        /**
         * active
         */
        active: {
            type: Boolean,
            default: true,
        },

        /**
         * background-color
         */
        backgroundColor: {
            type: String,
            default: undefined,
        },

        /**
         * background-opacity
         */
        backgroundOpacity: {
            type: [Number, String],
            default: undefined,
        },

        /**
         * bottom
         * Default false
         */
        bottom: {
            type: Boolean,
            default: false,
        },

        /**
         * buffer-value
         * No Requerido
         */
        bufferValue: {
            type: [Number, String],
            default: 100,
        },

        /**
         * color
         * Default blue900
         */
        color: {
            type: String,
            default: 'blue900',
        },

        /**
         * dark
         * Default false
         */
        dark: {
            type: Boolean,
            default: false,
        },

        /**
         * fixed
         */
        fixed: {
            type: Boolean,
            default: false,
        },

        /**
         * #height
         */
        height: {
            type: [Number, String],
            default: 4,
        },

        /**
         * indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false,
        },

        /**
         * dark
         * Default false
         */
        light: {
            type: Boolean,
            default: false,
        },

        /**
         * query
         * Default false
         */
        query: {
            type: Boolean,
            default: false,
        },

        /**
         * reverse
         * Default false
         */
        reverse: {
            type: Boolean,
            default: false,
        },

        /**
         * rounded
         * Default false
         */
        rounded: {
            type: Boolean,
            default: true,
        },

        /**
         * #stream
         * Default false
         */
        stream: {
            type: Boolean,
            default: false,
        },

        /**
         * #striped
         * Default false
         */
        striped: {
            type: Boolean,
            default: false,
        },

        /**
         * #top
         * Default false
         */
        top: {
            type: Boolean,
            default: false,
        },

        /**
         * #title
         * Default false
         */
        title: {
            type: String,
            default: undefined,
        },

        /**
         * #subtitle
         * Default false
         */
        subtitle: {
            type: String,
            default: undefined,
        },

        /**
         * V-model
         * Requerido
         */
        value: {
            required: true,
        },
    },

    computed: {
        /**
         * Comunicación de componente
         */
        listeners() {
            return {
                ...this.$listeners,
                input: this.$emit('input', this.value),
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
    },
};
</script>

<template>
    <v-row>
        <v-layout
            v-if="title"
            align-end
            justify-start
            class="BUO-Paragraph-Large neutral--text"
        >
            {{ title }}
        </v-layout>
        <v-layout
            v-if="subtitle"
            align-end
            justify-end
            class="BUO-Paragraph-Large neutral--text"
        >
            {{ subtitle }}
        </v-layout>
        <v-progress-linear
            :absolute="absolute"
            :active="active"
            :background-color="backgroundColor"
            :background-opacity="backgroundOpacity"
            :bottom="bottom"
            :buffer-value="bufferValue"
            :color="color"
            :dark="dark"
            :fixed="fixed"
            :height="height"
            :indeterminate="indeterminate"
            :light="light"
            :query="query"
            :reverse="reverse"
            :rounded="rounded"
            :stream="stream"
            :striped="striped"
            :top="top"
            :value="value"
            @input="$_updateValue"
            v-bind="$attrs"
            v-on="listeners"
        ></v-progress-linear>
    </v-row>
</template>
