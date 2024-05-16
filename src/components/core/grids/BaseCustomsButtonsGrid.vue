<script>
/**
 * Descripción: Botones Personalizados para la DataTables
 *
 * @displayName BaseCustomsButtonsGrid
 */

export default {
    name: 'BaseCustomsButtonsGrid',

    props: {
        /**
         * Función a Ejecutar
         * Default undefined
         */
        label: {
            type: String,
            required: true,
        },

        /**
         * Función a Ejecutar
         * Default undefined
         */
        icon: {
            type: String,
            required: true,
        },

        /**
         * Función a Ejecutar
         * Default undefined
         */
        fnMethod: {
            type: Function,
            required: true,
        },

        /**
         * Función a Ejecutar
         * Default undefined
         */
        color: {
            type: String,
            default: 'blue900',
        },

        outlined: {
            type: Boolean,
            default: true,
        },

        dark: {
            type: Boolean,
            default: undefined,
        },

        block: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isDark() {
            return this.dark != undefined
                ? this.dark
                : this.outlined
                ? false
                : true;
        },
    },

    /**
     * Ejecutar Click de los buttons
     */
    methods: {
        $_Method() {
            this.fnMethod();
        },
    },
};
</script>

<template>
    <v-btn
        :color="color"
        elevation="0"
        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
        :outlined="outlined"
        :dark="isDark"
        :loading="loading"
        small
        :block="block"
        @click="$_Method"
        :disabled="disabled"
    >
        {{ label }}
        <v-icon right>{{ icon }}</v-icon>
    </v-btn>
</template>
