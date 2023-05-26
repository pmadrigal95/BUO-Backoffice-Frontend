<script>
/**
 * Descripción: Input with DataTable in Dialog, method to Add new Data
 *
 * @displayName BaseInputDataTable
 */

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { v4 as uuidv4 } from 'uuid';

import baseLocalHelper from '@/helpers/baseLocalHelper';

const BaseLocalDataTable = () =>
    import('@/components/core/grids/BaseLocalDataTable.vue');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable.vue');

export default {
    name: 'BaseInputDataTable',

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

        /**
         * Propiedad del valor a mostrar
         */
        itemText: {
            type: [String, Number],
            default: undefined,
        },

        /**
         * Objecto de configuración Abarca la config del dataTable
         * Requerido
         */
        setting: {
            type: Object,
            required: true,
        },

        /**
         * v-model
         * Requerido
         */
        value: {
            requiered: true,
            type: [String, Number, Array],
        },

        /**
         * editText
         */
        editText: {
            type: [String, Number, Array],
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
         * Enviar información adicional al servidor
         */
        extraParams: {
            type: Array,
            default: undefined,
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
        BaseLocalDataTable,
        BaseServerDataTable,
    },

    data() {
        return {
            text: Array.isArray(this.editText) ? undefined : this.editText,

            /**
             * Densidad de las filas Grid
             */
            dense: true,

            /**
             * Cantidad de Filas por pag
             */
            rowsPerPage: 5,

            /**
             * Mostrar en el Dialog
             */
            show: null,

            /**
             * Identificador del input
             */
            refInput: 'BaseInputDataTable_',

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
        /**
         * Config Inicial
         */
        this.$_setUp();

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

        this.$_insertPreviousValues();
    },

    methods: {
        /**
         * Método del Comunicación principal
         */
        $_updateValue(event) {
            this.$emit('input', event);
        },

        $_insertIntoArray(params) {
            let array = [];

            params.forEach((element) => array.push(element[this.setting.key]));

            return array;
        },

        $_insertPreviousValues() {
            Array.isArray(this.editText) && this.$_getData(this.editText);
        },

        /**
         * Método del clic
         */
        $_getData(params) {
            /**
             * Setear información
             */
            if (this.$_returnMultiSelect() == true) {
                let array = this.$_insertIntoArray(params);

                if (this.value && this.value.some((r) => array.includes(r))) {
                    this.$_openModal();
                    return;
                }

                const result =
                    this.value != undefined
                        ? [...new Set(array.concat(this.value))]
                        : array;

                this.text =
                    this.text != undefined
                        ? [...new Set(params.concat(this.text))]
                        : params;

                this.$_updateValue(result);
            } else {
                this.$_updateValue(params[0][this.setting.key]);
                this.text =
                    this.itemText != undefined
                        ? params[0][this.itemText]
                        : params[0][this.setting.columns[0].value];
            }

            /**
             * Cerrar modal
             */
            this.$_openModal();
        },

        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp] &&
                this.$refs[this.refpopUp].$_openModal();
        },

        /**
         * Abrir modal GRID
         */
        $_openModalGrid() {
            if (!this.readonly) {
                this.$_openModal();
                if (
                    typeof this.setting?.controller === 'string' ||
                    typeof this.setting?.endpoint === 'string'
                ) {
                    this.show = 'Server';
                } else {
                    this.show = 'Local';
                }
            }
        },

        /**
         * Configuración del Componente
         */
        $_setUp() {
            this.$_settingObjects();
        },

        /**
         * Configuración de los objectos
         */
        $_settingObjects() {
            if (
                (this.setting?.controller || this.setting?.endpoint) &&
                this.setting?.key
            ) {
                this.$_settingTable();
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgComponentSettingInvalid(
                        'BaseInputDataTable'
                    )
                );
            }
        },

        /**
         * Configuración de los objectos
         */
        $_settingTable() {
            /**
             * Obtener key
             */
            this.setting.key = this.setting?.key;

            /**
             * Funcionalidad DBClick
             */
            this.setting.dbClick = 'Complete';

            /**
             * Obtener multipleSelect
             */
            this.setting.singleSelect = !this.$_returnMultiSelect();

            /**
             * Configración BaseServerDataTable
             */
            if (
                typeof this.setting?.controller === 'string' ||
                typeof this.setting?.endpoint === 'string'
            ) {
                this.show = 'Server';
                if (
                    this.setting.controller != undefined &&
                    this.setting.endpoint === undefined
                ) {
                    this.setting.controller = this.setting?.controller;

                    this.setting.method =
                        this.setting.method != undefined
                            ? this.setting.method
                            : 'findBy';

                    this.setting.service =
                        this.setting.service != undefined
                            ? this.setting.service
                            : undefined;
                } else {
                    this.setting.endpoint = this.setting?.endpoint;
                }
            } else {
                this.show = 'Local';
                /**
                 * Configración BaseLocalDataTable
                 */

                this.local = this.setting?.controller;
            }
        },

        /**
         * Obtener propiedad
         */
        $_returnMultiSelect() {
            /**
             * Obtener Método
             */
            const multiSelect =
                this.setting.multiSelect != undefined
                    ? this.setting.multiSelect
                    : false;

            /**
             * Retorna el endpoint al API
             */
            return multiSelect;
        },

        /**
         * Delete Chip
         */
        $_deleteChip(id) {
            this.text = this.text.filter((item) => item.id != id);
            const result = this.value.filter((item) => item != id);
            this.$_updateValue(result);
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            :ref="refpopUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '65%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <!-- @BaseLocalDataTable-->
                <BaseLocalDataTable
                    :setting="setting"
                    v-if="show === 'Local'"
                    v-model="local"
                    :cancel="$_openModal"
                    :footerMethod="$_getData"
                />

                <!-- @BaseServerDataTable -->
                <BaseServerDataTable
                    :setting="setting"
                    :dense="dense"
                    :rowsPerPage="rowsPerPage"
                    :footerMethod="$_getData"
                    :cancel="$_openModal"
                    v-if="show === 'Server'"
                    :extraParams="extraParams"
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
            v-if="!setting.multiSelect"
            :rules="normalRules"
            readonly
            clearable
            :label="label"
            append-icon="mdi-magnify"
            @click:append="$_openModalGrid"
            @click="$_openModalGrid"
            v-model="text"
            :dense="denseInput"
            outlined
            clear-icon="mdi-close-circle"
            :validate-on-blur="validateOnBlur"
        />

        <v-combobox
            v-else
            v-model="text"
            :rules="normalRules"
            outlined
            readonly
            clearable
            multiple
            :label="label"
            :dense="denseInput"
            append-icon="mdi-magnify"
            @click:append="$_openModalGrid"
            @click="$_openModalGrid"
            clear-icon="mdi-close-circle"
            :validate-on-blur="validateOnBlur"
        >
            <template v-slot:selection="{ attrs, item, selected }">
                <v-chip
                    small
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click:close="$_deleteChip(item[setting.key])"
                >
                    {{ item[itemText ? itemText : setting.columns[0].value] }}
                </v-chip>
            </template>
        </v-combobox>
    </div>
</template>
