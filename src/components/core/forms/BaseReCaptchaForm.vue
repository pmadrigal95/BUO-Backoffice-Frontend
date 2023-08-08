<script>
/**
 * Descripción: Formulario reCAPTCHA reutilizable
 *
 * @displayName BaseReCaptchaForm
 */

import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import VueRecaptcha from 'vue-recaptcha';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import googleRecaptcha from '@/services/socialMedia/google-recaptcha';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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

        actionsColor: {
            type: String,
            default: 'white',
        },
    },

    components: {
        VueRecaptcha,
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

    computed: {
        ...mapGetters('theme', ['app']),

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
    <section>
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

        <section
            class="buo-footer pt-1"
            :class="[app ? '#1e1e1e' : actionsColor]"
        >
            <!-- @slot Agregar Contenido después del form -->
            <slot name="afterForm"></slot>
            <v-layout align-center justify-end v-if="block && sitekey">
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
                        class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        elevation="0"
                        :color="color"
                        dark
                        :large="isLarge"
                        :small="isSmall"
                        block
                        depressed
                        @click="onSubmit"
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
                        class="mt-3 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        color="primary"
                        elevation="0"
                        outlined
                        :large="isLarge"
                        :small="isSmall"
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
            <v-layout align-end justify-end v-if="!block && sitekey">
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
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    :color="color"
                    dark
                    :large="isLarge"
                    :small="isSmall"
                    depressed
                    @click="onSubmit"
                >
                    <v-icon v-if="orientationicon === 'left'" left>{{
                        icon
                    }}</v-icon>
                    {{ labelBtn }}
                    <v-icon v-if="orientationicon === 'right'" right>{{
                        icon
                    }}</v-icon>
                </v-btn>

                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    outlined
                    :large="isLarge"
                    :small="isSmall"
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
                <slot name="Afterbtns"></slot>
            </v-layout>
        </section>
    </section>
</template>
