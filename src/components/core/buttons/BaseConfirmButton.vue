<script>
/**
 * Descripción: Botón de Confirmación reutilizable
 *
 * @displayName BaseConfirmButton
 */

import { v4 as uuidv4 } from 'uuid';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper.js';

const BaseConfirmDialog = () =>
    import('@/components/core/alerts/BaseConfirmDialog.vue');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

export default {
    name: 'BaseConfirmButton',

    components: {
        BaseConfirmDialog,
        BaseCustomsButtonsGrid,
    },

    props: {
        /**
         * Tipo de Elemento
         * [btn, icon]
         * Default btn
         */
        type: {
            type: String,
            default: 'btn',
        },

        /**
         * Validar selección del Grid
         */
        refGrid: {
            type: Function,
            default: undefined,
        },

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
            required: true,
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
    },

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'confirmPopUp_',

            valid: true,
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            if (this.refGrid != undefined) {
                const data = this.refGrid().length;
                switch (data) {
                    case 0:
                        /**
                         * Caso sin seleccionar fila
                         */
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;
                    case 1:
                        this.$refs[this.refpopUp].$_openModal();
                        break;
                    default:
                        /**
                         * Caso multiples seleccionar fila
                         */
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotMultiSelected
                        );
                }
            } else {
                this.$refs[this.refpopUp].$_openModal();
            }
        },

        $_closeModal() {
            this.$refs[this.refpopUp].$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <!-- @BaseDialog -->
        <BaseConfirmDialog
            v-if="valid"
            :dark="dark"
            :fullscreen="fullscreen"
            :max-width="width"
            :persistent="persistent"
            :tittle="tittle"
            :color="color"
            :method="method"
            :icon="icon"
            :confirmMessage="confirmMessage"
            :ref="refpopUp"
        />

        <BaseCustomsButtonsGrid
            v-if="type === 'btn'"
            :label="tittle"
            :icon="icon"
            :fnMethod="$_openModal"
        />

        <v-tooltip top v-else>
            <template v-slot:activator="{ on }">
                <v-btn icon :color="color" v-on="on" @click="$_openModal">
                    <v-icon>{{ icon }}</v-icon>
                </v-btn>
            </template>
            <span>{{ tittle }}</span>
        </v-tooltip>
    </div>
</template>
