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
            default: 'default',
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
        class="ma-1 no-uppercase rounded-lg"
        depressed
        small
        @click="$_Method"
    >
        <v-icon left>{{ icon }}</v-icon>
        {{ label }}
    </v-btn>
</template>
