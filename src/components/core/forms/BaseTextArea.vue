<script>
/**
 * Descripción: Text Area reutilizable
 *
 * @displayName BaseTextArea
 */

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseTextArea',

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
         * append-outer-icon
         * No Requerido
         */
        appendOuterIcon: {
            type: String,
            default: undefined,
        },

        /**
         * auto-grow
         * Automatically grow the textarea depending on amount of text
         * No Requerido
         */
        autoGrow: {
            type: Boolean,
            default: true,
        },

        /**
         * auto-autofocus
         * Enables autofocus
         * No Requerido
         */
        autofocus: {
            type: Boolean,
            default: false,
        },

        /**
         * background-color
         * Changes the background-color of the input
         * No Requerido
         */
        backgroundColor: {
            type: String,
            default: undefined,
        },

        /**
         * clearable
         * Add input clear functionality, default icon is Material Icons clear
         * No Requerido
         */
        clearable: {
            type: Boolean,
            default: false,
        },

        /**
         * color
         * Applies specified color to the control - it can be the name of material color
         * No Requerido
         */
        color: {
            type: String,
            default: undefined,
        },

        /**
         * counter
         * Creates counter for input length; if no number is specified, it defaults to 25. Does not apply any validation.
         * No Requerido
         */
        counter: {
            type: [Boolean, Number, String],
            default: undefined,
        },

        /**
         * dense
         * Reduces the input height
         * No Requerido
         */
        dense: {
            type: Boolean,
            default: false,
        },

        /**
         * disabled
         * Disable the input
         * No Requerido
         */
        disabled: {
            type: Boolean,
            default: false,
        },

        /**
         * label
         * Sets input label
         * No Requerido
         */
        label: {
            type: String,
            requiered: false,
        },

        /**
         * no-resize
         * Remove resize handle
         * No Requerido
         */
        noResize: {
            type: Boolean,
            default: false,
        },

        /**
         * prepend-icon
         * Prepends an icon to the component, uses the same syntax as v-icon
         * No Requerido
         */
        prependIcon: {
            type: String,
            default: undefined,
        },

        /**
         * prepend-inner-icon
         * Prepends an icon to the component, uses the same syntax as v-icon
         * No Requerido
         */
        prependInnerIcon: {
            type: String,
            default: undefined,
        },

        /**
         * readonly
         * Puts input in readonly state
         * No Requerido
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * rows
         * Default row count
         * No Requerido
         */
        rows: {
            type: [Number, String],
            default: 3,
        },

        /**
         * type
         * Sets input type
         * No Requerido
         */
        type: {
            type: String,
            default: 'text',
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
         * Default: 250
         */
        max: {
            type: Number,
            default: 500,
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
         * V-model
         */
        value: {
            type: [String, Number],
        },
    },

    data() {
        return {
            normalRules: [],
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

                case 'email':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                        (v) =>
                            /.+@.+\..+/.test(v) ||
                            baseLocalHelper.$_MsgFieldAllowedValueInvalid(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;

                case 'Min':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),

                        (v) =>
                            (v && v.trim().length > 0) ||
                            baseLocalHelper.$_MsgFieldRequired(
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
    },
};
</script>

<template>
    <v-textarea
        :append-icon="appendIcon"
        :append-outer-icon="appendOuterIcon"
        :auto-grow="autoGrow"
        :autofocus="autofocus"
        :background-color="backgroundColor"
        :clearable="clearable"
        :color="color"
        :counter="counter"
        :dense="dense"
        :disabled="disabled"
        :label="label"
        :no-resize="noResize"
        :prepend-icon="prependIcon"
        :prepend-inner-icon="prependInnerIcon"
        :readonly="readonly"
        :rows="rows"
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
        outlined
        clear-icon="mdi-close-circle"
        validate-on-blur
    />
</template>
