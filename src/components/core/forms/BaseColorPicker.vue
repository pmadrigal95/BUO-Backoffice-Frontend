<script>
/**
 * Descripción: selector de color
 *
 * @displayName BaseColorPicker
 */

/**
 * Libreria para trabajar colores
 */
import { mask } from 'vue-the-mask';

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseColorPicker',

    directives: { mask },

    /**
     * Props
     */
    props: {
        /**
         * Label del input
         * Requerido
         */
        label: {
            type: String,
            default: undefined,
        },

        /**
         * V-model
         */
        value: {
            type: [String],
            default: '#FFFFFFFF',
        },

        /**
         * Mask Input
         */
        mask: {
            default: '!#XXXXXXXX',
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
         * Estado de solo lectura
         * Default false
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * Inhabilitar input
         * Default false
         */
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            display: false,
            menu: false,
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

        swatchStyle() {
            const { menu } = this;
            return {
                backgroundColor: this.value,
                cursor: 'pointer',
                height: '30px',
                width: '60px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out',
                borderStyle: 'solid',
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
            ];
        }
    },

    methods: {
        $_updateValue(event) {
            this.$emit('input', event);
        },
    },
};
</script>

<template>
    <v-text-field
        :label="label"
        :value="value"
        v-mask="mask"
        masked="false"
        class="ma-0 pa-0"
        outlined
        @input="$_updateValue"
        :disabled="disabled"
        :error-messages="errors"
        :readonly="readonly"
        :rules="normalRules"
        v-on="listeners"
    >
        <template v-slot:append>
            <v-menu
                v-model="menu"
                top
                nudge-bottom="105"
                nudge-left="16"
                :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <div :style="swatchStyle" v-on="on" />
                </template>
                <v-card>
                    <v-card-text class="pa-0">
                        <v-color-picker
                            v-on="listeners"
                            @input="$_updateValue"
                            :value="value"
                            flat
                            mode="hexa"
                        />
                    </v-card-text>
                </v-card>
            </v-menu>
        </template>
    </v-text-field>
</template>
