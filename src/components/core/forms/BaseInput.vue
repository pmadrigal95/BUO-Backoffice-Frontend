<script>
/**
 * Descripción: Input reutilizable
 *
 * @displayName BaseInput
 */

import { mask } from 'vue-the-mask';

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseInput',

    directives: { mask },

    inheritAttrs: false,

    props: {
        /**
         * append-icon
         * No Requerido
         */
        appendIcon: {
            type: String,
            default: undefined,
        },

        /**
         * prepend-inner-icon
         * No Requerido
         */
        prependInnerIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Inhabilitar input
         * Default false
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * Label del input
         * Requerido
         */
        label: {
            type: String,
            default: undefined,
        },

        /**
         * prepend-icon
         * No Requerido
         */
        prependIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Estado de solo lectura
         * Default false
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * Tipo de input
         * Default text
         */
        type: {
            type: String,
            default: 'text',
        },

        /**
         * V-model
         */
        value: {
            type: [String, Number],
        },

        /**
         * Lista de errores
         * No es requerido
         */
        errors: {
            type: String,
            default: null,
        },

        /**
         * Como validar el input
         * ['text'] ['email'] [ @validacionPersonalizada ]
         */
        validate: {
            type: Array,
            required: false,
        },

        /**
         * Caracteres max
         * Default: 100
         */
        max: {
            type: Number,
            default: 100,
        },

        /**
         * Caracteres min
         * Default: 0
         */
        min: {
            type: Number,
            default: 0,
        },

        /**
         * Función
         */
        click: {
            type: Function,
            default: undefined,
        },

        /**
         * Función icon
         */
        clickAppend: {
            type: Function,
            default: undefined,
        },

        /**
         * Función icon
         */
        clickAppendOuter: {
            type: Function,
            default: undefined,
        },

        /**
         * Función icon
         */
        clickPrependInner: {
            type: Function,
            default: undefined,
        },

        /**
         * Mask Input
         */
        mask: {
            default: undefined,
        },

        /**
         * Contador de caracteres del input
         */
        counter: {
            type: Number,
            default: undefined,
        },

        /**
         * Función change
         */
        change: {
            type: Function,
            default: undefined,
        },

        /**
         * validate-on-blur
         */
        validateOnBlur: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            normalRules: [],
            BoolMask: false,
        };
    },

    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },
    },

    /**
     * Validaciones
     */
    created() {
        this.$props.mask != undefined
            ? (this.BoolMask = true)
            : (this.BoolMask = false);

        if (this.validate != undefined) {
            switch (this.validate[0]) {
                case 'text':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            (v && v.length <= this.max) ||
                            baseLocalHelper.$_MsgFieldMaxlengthInvalid(
                                this.label != undefined ? this.label : '',
                                this.max
                            ),
                        (v) =>
                            (v && v.trim().length > 0) ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'optionalText':
                    this.normalRules = [
                        (v) =>
                            v === undefined ||
                            v === null ||
                            v === '' ||
                            (v && v.length <= this.max) ||
                            baseLocalHelper.$_MsgFieldMaxlengthInvalid(
                                this.label != undefined ? this.label : '',
                                this.max
                            ),
                        (v) =>
                            !/^\s/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'optionalTextOnlyLetters':
                    this.normalRules = [
                        (v) =>
                            v === undefined ||
                            v === null ||
                            v === '' ||
                            (v && v.length <= this.max) ||
                            baseLocalHelper.$_MsgFieldMaxlengthInvalid(
                                this.label != undefined ? this.label : '',
                                this.max
                            ),
                        (v) =>
                            !/^\s/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),

                        (v) =>
                            /([a-zA-ZÀ-ÿ\u00f1\u00d1]*\s*)*[a-zA-ZÀ-ÿ\u00f1\u00d1().]+$/.test(
                                v
                            ) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'number':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^\d{1,15}(\.)?\d{0,5}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'number05':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^\d{1,10}(\.)?\d{0,5}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldRangeNumberInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'number03':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^\d{1,10}(\.)?\d{0,3}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldRangeNumberInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'number02':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^\d{1,10}(\.)?\d{0,2}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            v > this.min ||
                            baseLocalHelper.$_MsgFieldRangeNumberMinInvalid(
                                this.label != undefined ? this.label : '',
                                this.min
                            ),
                    ];
                    break;

                case 'percentage':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^\d{1,3}(\.)?\d{0,2}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            (v <= this.max && v >= this.min) ||
                            baseLocalHelper.$_MsgFieldRangeNumberInvalid(
                                this.label != undefined ? this.label : '',
                                this.max,
                                this.min
                            ),
                    ];
                    break;

                case 'optionalNumber':
                    this.normalRules = [
                        (v) =>
                            v === undefined ||
                            v === null ||
                            v === '' ||
                            /^\d{1,15}(\.)?\d{0,5}$/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'email':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            // eslint-disable-next-line no-useless-escape
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                                v
                            ) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'password':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,50}$/.test(
                                v
                            ) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalidPwd(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'DNI':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),

                        (v) =>
                            /^[1-9][0-9-+]+$/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),

                        (v) =>
                            (v &&
                                v.length <= this.max &&
                                v &&
                                v.length >= this.min) ||
                            baseLocalHelper.$_MsgFieldAllowedExtInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'range':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            (v?.length <= this.max && v?.length >= this.min) ||
                            baseLocalHelper.$_MsgFieldRangeInvalid(
                                this.label != undefined ? this.label : '',
                                this.max,
                                this.min
                            ),
                    ];
                    break;

                default:
                    this.normalRules = this.validate;
            }
        }
    },

    /**
     * Metodos click icon
     */
    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_onClick() {
            if (this.click != undefined) {
                this.click();
            }
        },

        $_append() {
            if (this.clickAppend != undefined) {
                this.clickAppend();
            }
        },

        $_appendOuter() {
            if (this.clickAppendOuter != undefined) {
                this.clickAppendOuter();
            }
        },

        $_prependInner() {
            if (this.clickPrependInner != undefined) {
                this.clickPrependInner();
            }
        },

        $_change() {
            if (this.change != undefined) {
                this.change();
            }
        },
    },
};
</script>

<template>
    <div>
        <div v-if="BoolMask">
            <v-text-field
                :append-icon="appendIcon"
                :disabled="disabled"
                :error-messages="errors"
                :label="label"
                :prepend-icon="prependIcon"
                :prepend-inner-icon="prependInnerIcon"
                :readonly="readonly"
                :type="type"
                :rules="normalRules"
                @click:append="$_append"
                @click="$_onClick"
                @click:append-outer="$_appendOuter"
                @click:prepend-inner="$_prependInner"
                :value="value"
                @input="$_updateValue"
                v-bind="$attrs"
                v-on="listeners"
                v-mask="mask"
                masked="false"
                :counter="counter"
                @change="$_change"
                outlined
                clear-icon="mdi-close-circle"
                :validate-on-blur="validateOnBlur"
            ></v-text-field>
        </div>

        <div v-else>
            <v-text-field
                :append-icon="appendIcon"
                :disabled="disabled"
                :error-messages="errors"
                :label="label"
                :prepend-icon="prependIcon"
                :prepend-inner-icon="prependInnerIcon"
                :readonly="readonly"
                :type="type"
                :rules="normalRules"
                @click:append="$_append"
                @click="$_onClick"
                @click:append-outer="$_appendOuter"
                @click:prepend-inner="$_prependInner"
                :value="value"
                @input="$_updateValue"
                v-bind="$attrs"
                v-on="listeners"
                :counter="counter"
                @change="$_change"
                outlined
                clear-icon="mdi-close-circle"
                :validate-on-blur="validateOnBlur"
            ></v-text-field>
        </div>
    </div>
</template>
