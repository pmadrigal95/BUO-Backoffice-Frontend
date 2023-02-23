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

        loading: {
            type: Boolean,
            default: false,
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
        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
        :outlined="outlined"
        :dark="outlined ? false : true"
        :loading="loading"
        small
        @click="$_Method"
    >
        {{ label }}
        <v-icon right>{{ icon }}</v-icon>
    </v-btn>
</template>
