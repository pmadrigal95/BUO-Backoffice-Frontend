<script>
/**
 * Descripción: Pantalla emergente reutilizable
 *
 * @displayName BaseDialog
 */

export default {
    name: 'BaseDialog',

    props: {
        /**
         * Uso del Dark theme
         */
        dark: {
            type: Boolean,
            default: false,
        },
        /**
         * Uso de Pantalla Completa
         */
        fullscreen: {
            type: Boolean,
            default: false,
        },
        /**
         * Tamaño de la pantalla emergente
         */
        width: {
            type: [String, Number],
            default: 500,
        },
        /**
         * Condición para cerrar la pantalla
         */
        persistent: {
            type: [Boolean, String],
            default: false,
        },
        /**
         * Titulo del encabezado
         */
        tittle: {
            type: String,
            required: false,
        },
        /**
         * Color del encabezado
         */
        color: {
            type: String,
            default: 'blue900',
        },
    },

    data() {
        return {
            dialog: false,
        };
    },

    methods: {
        $_openModal() {
            this.dialog = !this.dialog;
        },
    },
};
</script>

<template>
    <div class="text-center">
        <v-dialog
            v-model="dialog"
            :dark="dark"
            :fullscreen="fullscreen"
            :max-width="width"
            :persistent="persistent"
        >
            <v-card class="rounded-lg">
                <v-toolbar dark :color="color">
                    <v-btn v-if="!persistent" icon dark @click="$_openModal()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ tittle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <slot name="header"></slot>
                </v-toolbar>
                <v-divider></v-divider>

                <v-card-text>
                    <!-- @slot Use este slot para el contenido -->
                    <slot name="Content"></slot>
                </v-card-text>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>
