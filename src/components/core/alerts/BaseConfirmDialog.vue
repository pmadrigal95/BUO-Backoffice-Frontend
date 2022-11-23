<script>
/**
 * Descripción: Pantalla emergente de Confirmación reutilizable
 *
 * @displayName BaseConfirmDialog
 */

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BaseConfirmDialog',

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
            default: 450,
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

        /**
         * Función a ejecutar luego de confirmar
         * Requerida
         */
        method: {
            type: Function,
            required: true,
        },

        /**
         * Icon del Primer botón
         * Default: mdi-delete
         */
        icon: {
            default: 'mdi-delete',
        },

        /**
         * Mensaje de confirmación
         * Default: undefined
         */
        confirmMessage: {
            type: String,
            default: undefined,
        },

        /**
         * Función a ejecutar luego de confirmar
         * Requerida
         */
        cancel: {
            type: Function,
            default: undefined,
        },
    },

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',
            cancelMethod: undefined,
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;

        this.cancelMethod = this.cancel;
        if (this.cancelMethod == undefined) {
            this.cancelMethod = this.$_openModal;
        }
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },
    },
};
</script>

<template>
    <!-- @BaseDialog -->
    <BaseDialog
        :dark="dark"
        :fullscreen="fullscreen"
        :max-width="width"
        :persistent="persistent"
        :tittle="tittle"
        :color="color"
        :ref="refpopUp"
    >
        <div slot="Content">
            <!-- @Componente: BaseForm-->
            <BaseForm
                :method="method"
                :cancel="cancelMethod"
                :icon="icon"
                :labelBtn="tittle"
                :color="color"
            >
                <div slot="body">
                    <br />
                    <v-row align-content="center">
                        <h3>
                            {{ confirmMessage }}
                        </h3>
                    </v-row>
                </div>
            </BaseForm>
        </div>
    </BaseDialog>
</template>
