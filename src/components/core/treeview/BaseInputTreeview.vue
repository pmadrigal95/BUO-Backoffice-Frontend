<script>
/**
 * Descripción: Input with Treeview in Dialog
 *
 * @displayName BaseInputTreeview
 */

import { v4 as uuidv4 } from 'uuid';

import baseLocalHelper from '@/helpers/baseLocalHelper';

const BaseTreeview = () => import('@/components/core/treeview/BaseTreeview');

export default {
    name: 'BaseInputTreeview',

    inheritAttrs: false,

    /**
     * Comunicación de Componentes
     */
    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        /**
         * Label del input
         * Requerido
         */
        label: {
            type: String,
            required: false,
        },

        /**
         * Dense
         */
        denseInput: {
            type: Boolean,
            default: false,
        },

        //Property on supplied items that contains its children.
        itemChildren: {
            type: String,
            default: 'children',
        },

        //Property on supplied items used to keep track of node state. The value of this property has to be unique among all items.
        itemKey: {
            type: String,
            default: 'id',
        },

        //Property on supplied items that contains its label text
        itemText: {
            type: String,
            default: 'name',
        },

        /**
         * método API / array de valores
         * Requerido
         * An array of items used to build the treeview
         */
        endpoint: {
            type: [Array, String],
            required: true,
        },

        httpMethod: {
            type: String,
            default: 'get',
        },

        httpBody: {
            type: Object,
            default: undefined,
        },

        /**
         * v-model
         * Requerido
         */
        value: {
            requiered: true,
        },

        /**
         * editText
         */
        editText: {
            type: [String, Number],
            default: null,
        },

        /**
         * Accepts a mixed array of types function, boolean and string.
         * Functions pass an input value as an argument and must return either true / false or a string containing an error message.
         * The input field will enter an error state if a function returns (or any value in the array contains) false or is a string
         */
        validate: {
            type: Array,
            required: false,
        },

        /**
         * readonly
         */
        readonly: {
            type: Boolean,
            default: false,
        },

        /**
         * validate-on-blur
         */
        validateOnBlur: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        BaseTreeview,
    },

    data() {
        return {
            componentKey: 0,

            text: this.editText,

            /**
             * Densidad de las filas Grid
             */
            dense: true,

            /**
             * Mostrar en el Dialog
             */
            show: null,

            /**
             * Identificador del input
             */
            refInput: 'BaseInputTreeview_',

            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',

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

    watch: {
        text: function (val) {
            if (!val || val.length == 0) {
                this.$_updateValue(null);
            }
        },

        value: function (val) {
            if (!val) {
                this.text = null;
            }
        },
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refInput = this.refInput + randomID;

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;

        /**
         * definición del Modal
         */
        if (this.validate != undefined) {
            switch (this.validate[0]) {
                case 'requiered':
                    this.normalRules = [
                        (v) =>
                            !!v ||
                            baseLocalHelper.$_MsgFieldRequired(
                                this.label != undefined ? this.label : ''
                            ),
                    ];
                    break;
                default:
                    this.normalRules = this.validate;
            }
        }
    },

    methods: {
        /**
         * Método del Comunicación principal
         */
        $_updateValue(event) {
            this.$emit('input', event);
        },

        /**
         * Método del clic
         */
        $_getData(params) {
            /**
             * Setear información
             */
            this.$_updateValue(params[this.itemKey]);
            this.text = params[this.itemText];

            /**
             * Cerrar modal
             */
            this.$_openModal();
        },

        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },

        /**
         * Abrir modal TreeView
         */
        $_openModalTreeView() {
            if (!this.readonly) {
                this.componentKey++;
                this.$_openModal();
            }
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            :ref="refpopUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <!-- @BaseLocalDataTable-->
                <BaseTreeview
                    v-if="!readonly"
                    :key="componentKey"
                    :endpoint="endpoint"
                    :httpMethod="httpMethod"
                    :httpBody="httpBody"
                    :itemChildren="itemChildren"
                    :itemKey="itemKey"
                    :itemText="itemText"
                    :fnDoubleClick="$_getData"
                    :footerMethod="$_getData"
                    :cancel="$_openModal"
                />
            </div>
        </BasePopUp>

        <v-text-field
            :rules="normalRules"
            readonly
            :value="value"
            @input="$_updateValue"
            v-bind="$attrs"
            v-on="listeners"
            v-show="false"
        />

        <v-text-field
            :rules="normalRules"
            readonly
            clearable
            :label="label"
            append-icon="mdi-magnify"
            @click:append="$_openModalTreeView"
            @click="$_openModalTreeView"
            v-model="text"
            :dense="denseInput"
            outlined
            clear-icon="mdi-close-circle"
            :validate-on-blur="validateOnBlur"
        />
    </div>
</template>
