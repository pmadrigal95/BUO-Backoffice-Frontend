<script>
/**
 * Descripción: Formulario reCAPTCHA reutilizable
 *
 * @displayName BaseReCaptchaForm
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import httpService from '@/services/axios/httpService';

import googleRecaptcha from '@/services/socialMedia/google-recaptcha';

import VueRecaptcha from 'vue-recaptcha';

import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'BaseReCaptchaForm',

    metaInfo: {
        script: [
            {
                src: googleRecaptcha.$_Script,
                async: true,
                defer: true,
            },
        ],
    },

    props: {
        /**
         * Label del Primer botón
         * Default: Guardar
         */
        labelBtn: {
            type: String,
            default: baseLocalHelper.$_LabelBtnSend,
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
         * Default: primary
         */
        color: {
            default: 'primary',
        },

        /**
         * Icon del Primer botón
         * Default: mdi-content-save
         */
        icon: {
            default: 'mdi-content-save',
        },

        /**
         * Unico botón que abarca tamaño del form
         * Default: false
         */
        login: {
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

    components: {
        VueRecaptcha,
    },

    data() {
        return {
            valid: true,
            lblCancel: baseLocalHelper.$_LabelBtnGoOut,
            showCancel: false,
            /**
             * Identificador del input
             */
            refForm: 'BaseForm_',
        };
    },

    computed: {
        sitekey() {
            return googleRecaptcha.$_RecaptchaId;
        },
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

        /**
         * Valida el form y ejecuta la función 'method'
         */
        onSubmit() {
            if (this.beforeClick != undefined) {
                this.beforeClick();
            }

            this.$refs.invisibleRecaptcha.execute();
        },

        onVerify(response) {
            this.resetRecaptcha();
            if (this.$refs[this.refForm].validate()) {
                httpService
                    .post('misc/validateCaptcha', {
                        captchaToken: response,
                    })
                    .then((response) => {
                        if (
                            response != undefined &&
                            response.data &&
                            response.data.success
                        ) {
                            this.method();
                            this.$nextTick(() => {
                                if (this.$refs[this.refForm] != undefined) {
                                    this.$refs[this.refForm].resetValidation();
                                }
                            });
                        } else {
                            baseNotificationsHelper.Message(
                                true,
                                baseLocalHelper.$_MsgErrorAndRetry
                            );
                        }
                    });
            }
        },
        onExpired() {
            this.resetRecaptcha();
            console.log('Expired');
        },
        resetRecaptcha() {
            this.$refs.invisibleRecaptcha.reset(); // Direct call reset method
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
            @keyup.enter.native="onSubmit"
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
        <v-layout align-center justify-end v-if="login && sitekey">
            <v-card-text
                ><!-- @slot Agregar botones después del Btn principal -->
                <slot name="Beforebtns"></slot>

                <vue-recaptcha
                    ref="invisibleRecaptcha"
                    @verify="onVerify"
                    @expired="onExpired"
                    size="invisible"
                    :sitekey="sitekey"
                >
                </vue-recaptcha>
                <v-btn
                    class="no-uppercase rounded-lg"
                    :color="color"
                    dark
                    block
                    @click="onSubmit"
                    >{{ labelBtn }}</v-btn
                >

                <!-- @slot Agregar botones después del Btn principal -->
                <slot name="btns"></slot
            ></v-card-text>
        </v-layout>
        <v-layout align-end justify-end v-if="!login && sitekey">
            <!-- @slot Agregar botones después del Btn principal -->
            <slot name="Beforebtns"></slot>

            <vue-recaptcha
                ref="invisibleRecaptcha"
                @verify="onVerify"
                @expired="onExpired"
                size="invisible"
                :sitekey="sitekey"
            >
            </vue-recaptcha>
            <v-btn
                class="no-uppercase rounded-lg"
                :color="color"
                dark
                block
                @click="onSubmit"
                >{{ labelBtn }}</v-btn
            >

            <v-btn
                class="ma-2 no-uppercase rounded-lg"
                @click="$_Cancel"
                v-if="showCancel"
            >
                <v-icon left>mdi-close-circle-outline</v-icon>
                {{ lblCancel }}
            </v-btn>

            <!-- @slot Agregar botones después del Btn principal -->
            <slot name="Afterbtns"></slot>
        </v-layout>
    </div>
</template>
