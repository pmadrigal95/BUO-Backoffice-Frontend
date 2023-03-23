<script>
/**
 * Descripción: Formulario reutilizable
 *
 * @displayName BaseForm
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BaseForm',

    props: {
        /**
         * Label del Primer botón
         * Default: Guardar
         */
        labelBtn: {
            type: String,
            default: baseLocalHelper.$_LabelBtnSend,
        },

        /**
         * Label del Primer botón
         * Default: Guardar
         */
        lblCancel: {
            type: String,
            default: baseLocalHelper.$_LabelBtnGoOut,
        },

        beforeClick: {
            type: Function,
            default: undefined,
        },

        enterSubmit: {
            type: Boolean,
            default: true,
        },

        /**
         * Color del Primer botón
         * Default: blue900
         */
        color: {
            default: 'blue900',
        },

        /**
         * Icon del Primer botón
         * Default: mdi-content-save
         */
        icon: {
            default: 'mdi-content-save',
        },

        orientationicon: {
            default: undefined,
        },

        /**
         * Unico botón que abarca tamaño del form
         * Default: false
         */
        block: {
            type: Boolean,
            default: false,
        },

        /**
         * size del boton
         */
        isLarge: {
            type: Boolean,
            default: true,
        },

        /**
         * size del boton
         */
        isSmall: {
            type: Boolean,
            default: false,
        },

        /**
         * Función a ejecutar en el form con el primer btn
         * Requerida
         */
        method: {
            type: Function,
            required: true,
        },

        /**
         * Función a ejecutar en el form con el botón Cancelar
         * no es Requerido
         */
        cancel: {
            type: Function,
            default: undefined,
        },
    },

    data() {
        return {
            valid: true,
            showCancel: false,
            /**
             * Identificador del input
             */
            refForm: 'BaseForm_',
        };
    },

    created() {
        /**
         * Valida si es necesario el botón de Cancelar
         */
        if (this.$props.cancel != undefined) {
            this.showCancel = true;
        }

        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refForm = this.refForm + randomID;
    },

    methods: {
        /**
         * Valida el form y ejecuta la función 'method'
         */
        $_submit() {
            if (this.beforeClick != undefined) {
                this.beforeClick();
            }

            if (this.$refs[this.refForm].validate()) {
                this.method();
                this.$nextTick(() => {
                    if (this.$refs[this.refForm] != undefined) {
                        this.$refs[this.refForm].resetValidation();
                    }
                });
            }
        },

        /**
         * limpia el form y ejecuta la función 'Cancelar'
         */
        $_Cancel() {
            if (this.showCancel === true) {
                if (this.$refs[this.refForm] != undefined) {
                    this.cancel();
                    this.$refs[this.refForm].reset();
                }
            }
        },

        /**
         * limpia el form y ejecuta la función 'Cancelar'
         */
        $_Clean() {
            this.$refs[this.refForm].reset();
            this.$refs[this.refForm].resetValidation();
        },
    },
};
</script>

<template>
    <div>
        <v-form
            :ref="refForm"
            v-model="valid"
            lazy-validation
            @submit.prevent
            @keyup.enter.native="$_submit"
            v-if="enterSubmit === true"
        >
            <v-container>
                <!-- @slot Agregar Contenido del form -->
                <slot name="body"></slot>
            </v-container>
            <!-- @slot Agregar Contenido sin Container del form -->
            <slot name="containerBody"></slot>
        </v-form>

        <v-form
            :ref="refForm"
            v-model="valid"
            lazy-validation
            @submit.prevent
            v-if="enterSubmit === false"
        >
            <v-container>
                <!-- @slot Agregar Contenido del form -->
                <slot name="body"></slot>
            </v-container>
            <!-- @slot Agregar Contenido sin Container del form -->
            <slot name="containerBody"></slot>
        </v-form>

        <!-- @slot Agregar Contenido después del form -->
        <slot name="afterForm"></slot>
        <v-layout align-center justify-end v-if="block">
            <v-card-text
                ><!-- @slot Agregar botones después del Btn principal -->
                <slot name="Beforebtns"></slot>
                <v-btn
                    class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    :color="color"
                    :large="isLarge"
                    :small="isSmall"
                    dark
                    block
                    depressed
                    @click="$_submit"
                >
                    <v-icon v-if="orientationicon === 'left'" left>{{
                        icon
                    }}</v-icon>
                    {{ labelBtn }}
                    <v-icon v-if="orientationicon === 'right'" right>{{
                        icon
                    }}</v-icon></v-btn
                >
                <v-btn
                    class="mt-5 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    color="primary"
                    :large="isLarge"
                    :small="isSmall"
                    outlined
                    block
                    @click="$_Cancel"
                    v-if="showCancel"
                >
                    <v-icon v-if="orientationicon === 'left'" left
                        >mdi-close-circle-outline</v-icon
                    >
                    {{ lblCancel }}
                    <v-icon v-if="orientationicon === 'right'" right
                        >mdi-close-circle-outline</v-icon
                    >
                </v-btn>
                <!-- @slot Agregar botones después del Btn principal -->
                <slot name="btns"></slot
            ></v-card-text>
        </v-layout>
        <v-layout align-end justify-end v-if="!block">
            <!-- @slot Agregar botones después del Btn principal -->
            <slot name="Beforebtns"></slot>

            <v-btn
                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                elevation="0"
                :large="isLarge"
                :small="isSmall"
                outlined
                color="primary"
                @click="$_Cancel"
                v-if="showCancel"
            >
                <v-icon v-if="orientationicon === 'left'" left
                    >mdi-close-circle-outline</v-icon
                >
                {{ lblCancel }}
                <v-icon v-if="orientationicon === 'right'" right
                    >mdi-close-circle-outline</v-icon
                >
            </v-btn>

            <v-btn
                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                elevation="0"
                :color="color"
                :large="isLarge"
                :small="isSmall"
                dark
                depressed
                @click="$_submit"
            >
                <v-icon v-if="orientationicon === 'left'" left>{{
                    icon
                }}</v-icon>
                {{ labelBtn }}
                <v-icon v-if="orientationicon === 'right'" right>{{
                    icon
                }}</v-icon>
            </v-btn>

            <!-- @slot Agregar botones después del Btn principal -->
            <slot name="Afterbtns"></slot>
        </v-layout>
    </div>
</template>
