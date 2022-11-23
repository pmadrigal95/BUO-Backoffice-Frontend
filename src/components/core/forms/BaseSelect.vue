<script>
/**
 * Descripción: Select reutilizable
 *
 * @displayName BaseSelect
 */

import httpService from '@/services/axios/httpService.js';

import baseLocalHelper from '@/helpers/baseLocalHelper';

export default {
    name: 'BaseSelect',

    inheritAttrs: false,

    props: {
        /**
         * Cambia la visualización de selecciones a chips
         * Default false
         */
        chips: {
            type: Boolean,
            default: false,
        },

        /**
         * Agrega un ícono para eliminar seleccionados
         * Default false
         */
        deletableChips: {
            type: Boolean,
            default: false,
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
         * Agregue la funcionalidad de borrar
         * Default true
         */
        clearable: {
            type: Boolean,
            default: true,
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
         * Selecionar múltiples. Acepta Array por valor
         * Default false
         */
        multiple: {
            type: Boolean,
            default: false,
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
         * Etiqueta Label
         * Requerido
         */
        label: {
            type: String,
            required: false,
        },

        /**
         * método API / array de valores
         * Requerido
         */
        endpoint: {
            type: [Array, String],
            required: true,
        },

        /**
         * Propiedad del valor a mostrar
         * Requerido
         */
        itemText: {
            type: [String, Number],
            required: true,
        },
        /**
         * v-model
         * Requerido
         */
        value: {
            type: [String, Number, Array],
        },

        /**
         * Propiedad del valor a guardar
         * Requerido
         */
        itemValue: {
            type: [String, Number],
            required: true,
            default: '',
        },

        /**
         * mantiene copia local de los elementos
         * default true
         */
        cacheItems: {
            type: Boolean,
            default: true,
        },

        /**
         * Función icon
         */
        clickPrependInner: {
            type: Function,
            default: undefined,
        },

        appendOuterIcon: {
            type: String,
            default: undefined,
        },

        /**
         * Función icon
         */
        clickAppendOuterIcon: {
            type: Function,
            default: undefined,
        },

        colorAppendOuterIcon: {
            type: String,
            default: 'greenA700',
        },

        messageAppendOuterIcon: {
            type: String,
            default: 'Agregar',
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
         * Reduces the input height
         */
        dense: {
            type: Boolean,
            default: false,
        },

        /**
         * Enviar información adicional al servidor
         */
        extraParams: {
            type: Object,
            default: undefined,
        },
    },

    data() {
        return {
            items: [],
            normalRules: [],
            loading: null,
        };
    },

    computed: {
        /**
         * Comunicación de componente
         */
        listeners() {
            return {
                ...this.$listeners,
                input: this.$_updateValue,
            };
        },
    },

    created() {
        /**
         * Validaciones
         */
        if (this.validate != undefined) {
            switch (this.validate[0]) {
                case 'text':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;
                default:
                    this.normalRules = this.validar;
            }
        }
    },

    mounted() {
        /**
         * Obtener lista de valores
         */
        this.$_uploadData();
    },

    methods: {
        /**
         * Comunicación de componente
         */
        $_updateValue(event) {
            this.$emit('input', event);
        },

        /**
         * Metodos click icon
         */
        $_prependInner() {
            if (this.clickPrependInner != undefined) {
                this.clickPrependInner();
            }
        },

        /**
         * Metodos click icon
         */
        $_AppendOuter() {
            if (this.clickAppendOuterIcon != undefined) {
                this.clickAppendOuterIcon();
            }
        },

        /**
         * Realiza la petición al servidor
         */
        async $_sendToApi(data) {
            if (data) {
                await httpService
                    .post(this.$props.endpoint, data)
                    .then((response) => {
                        if (response != undefined) {
                            this.items = response.data;
                            this.loading = false;
                        }
                    });
            } else {
                await httpService.get(this.$props.endpoint).then((response) => {
                    if (response != undefined) {
                        this.items = response.data;
                        this.loading = false;
                    }
                });
            }
        },

        /**
         * Obtener lista de valores
         */
        async $_uploadData() {
            this.loading = true;
            if (typeof this.$props.endpoint === 'string') {
                if (this.extraParams) {
                    /**
                     * Retorna los params al API
                     */
                    let data = {
                        ...this.extraParams,
                    };

                    await this.$_sendToApi(data);
                } else {
                    /**
                     * Retorna los params al API
                     */
                    await this.$_sendToApi();
                }
            } else {
                this.items = this.$props.endpoint;
                this.loading = false;
            }
        },
    },
};
</script>

<template>
    <div>
        <v-autocomplete
            :loading="loading"
            :chips="chips"
            :deletable-chips="deletableChips"
            :clearable="clearable"
            :disabled="disabled"
            :multiple="multiple"
            :readonly="readonly"
            :item-text="itemText"
            :item-value="itemValue"
            :items="items"
            :label="label"
            :rules="normalRules"
            :value="value"
            @input="$_updateValue"
            v-bind="$attrs"
            v-on="listeners"
            :cache-items="cacheItems"
            :prepend-inner-icon="prependInnerIcon"
            @click:prepend-inner="$_prependInner"
            :dense="dense"
            outlined
            clear-icon="mdi-close-circle"
            validate-on-blur
        >
            <template
                v-slot:append-outer
                v-if="appendOuterIcon && clickAppendOuterIcon"
            >
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            v-bind="attrs"
                            v-on="on"
                            large
                            :color="colorAppendOuterIcon"
                            @click="$_AppendOuter"
                            >{{ appendOuterIcon }}</v-icon
                        >
                    </template>
                    <span>{{ messageAppendOuterIcon }}</span>
                </v-tooltip>
            </template>
        </v-autocomplete>
    </div>
</template>
