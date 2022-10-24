<script>
/**
 * Descripción: Autocomplete with DataTable in Dialog, method to Add new Data
 *
 * @displayName BaseInputList
 */

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import httpService from '@/services/axios/httpService';

import baseArrayHelper from '@/helpers/baseArrayHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import { v4 as uuidv4 } from 'uuid';

const BaseLocalDataTable = () =>
    import('@/components/core/grids/BaseLocalDataTable.vue');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable.vue');

export default {
    name: 'BaseInputList',

    inheritAttrs: false,

    components: {
        BaseLocalDataTable,
        BaseServerDataTable,
    },

    props: {
        /**
         * Objecto de configuración Abarca la config del autocomplete (BaseSelect) y dataTable (BaseGrid)
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
            type: [String, Number, Array],
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
            /**
             *  Validación del Input
             *  */
            regex: null,

            /**
             * Densidad de las filas Grid
             */
            dense: true,

            /**
             * Cantidad de Filas por pag
             */
            rowsPerPage: 5,

            /*
             * Icono del Input
             */
            icon: null,

            /**
             * Mostrar en el Dialog
             */
            show: null,

            /**
             * Identificador del input
             */
            refSelect: 'BaseInputList_',

            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',

            /**
             * Identificador del Dialog
             */
            refForm: 'form_',

            /**
             * tamaño del Dialog
             */
            width: null,

            /**
             * Objecto con campos escritos en el formulario
             */
            object: {},

            /**
             * v-model Local
             */
            local: null,

            /**
             * Cols con campos escritos en el formulario
             */
            cols: null,

            /**
             * KEY NEW
             */
            newId: null,

            /**
             * Titulo del Modal del Grid
             */
            label: 'Filtro',
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
         * Config Inicial
         */
        this.$_setUp();

        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refSelect = this.refSelect + randomID;

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;

        /**
         * Config Inicial ID
         */
        this.refForm = this.refForm + randomID;

        /**
         * definición del Modal
         */
        this.label =
            this.setting.input.label != undefined
                ? this.setting.input.label
                : this.label;
    },

    methods: {
        /**
         * Comunicación de componente
         */
        $_updateValue(event) {
            this.$emit('input', event);
        },

        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },

        /**
         * Abrir modal FORM
         */
        $_openModalForm() {
            if (this.setting.new?.entity?.length > 0) {
                this.$_openModal();
                this.show = 'Form';
                this.width = 650;

                this.setting.new?.entity?.length > 1
                    ? (this.cols = 6)
                    : (this.cols = 12);

                let array = this.setting.new?.entity;
                const BooleanType = array
                    .filter((data) => data?.type == 'bool')
                    .map((prop) => prop.value);

                BooleanType.forEach((element) => (this.object[element] = true));
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgComponentSettingInvalid(
                        'BaseInputList'
                    )
                );
            }
        },

        /**
         * Abrir modal GRID
         */
        $_openModalGrid() {
            this.$_openModal();
            if (
                typeof this.setting.shared?.controller === 'string' ||
                typeof this.setting.shared?.endpoint === 'string'
            ) {
                this.show = 'Server';
            } else {
                this.show = 'Local';
            }
            this.width =
                this.setting.table.width != null
                    ? this.setting.table.width
                    : 1200;
        },

        /**
         * Configuración del Componente
         */
        $_setUp() {
            this.$_validate();
            this.$_showBtnNew();
            this.$_settingObjects();
            this.newId = this.setting.shared?.key;
        },

        /**
         * Configuración Validación
         */
        $_validate() {
            this.setting.input.validate != undefined &&
            this.setting.input.validate == true
                ? (this.regex = ['text'])
                : '';
        },

        /**
         * Configuración botón Nuevo
         */
        $_showBtnNew() {
            this.setting.new == undefined
                ? (this.icon = undefined)
                : (this.icon = 'mdi-circle-edit-outline');
        },

        /**
         * Configuración de los objectos
         */
        $_settingObjects() {
            if (
                (this.setting.shared?.controller ||
                    this.setting.shared?.endpoint) &&
                this.setting.shared?.key
            ) {
                this.$_settingInput();
                this.$_settingTable();
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgComponentSettingInvalid(
                        'BaseInputList'
                    )
                );
            }
        },

        /**
         * Configuración de los objectos
         */
        $_settingInput() {
            /**
             * Obtener itemValue
             */
            this.setting.input.itemValue = this.setting.shared?.key;

            /**
             * Obtener multipleSelect
             */
            this.setting.input.multiple = this.$_returnMultiSelect();

            /**
             * Obtener Endpoint
             */
            if (
                typeof this.setting.shared?.controller === 'string' ||
                typeof this.setting.shared?.endpoint === 'string'
            ) {
                this.setting.input.endpoint = this.returnEndPoint();
            } else {
                this.setting.input.endpoint = this.setting.shared?.controller;
            }
        },

        /**
         * Configuración de los objectos
         */
        $_settingTable() {
            /**
             * Obtener key
             */
            this.setting.table.key = this.setting.shared?.key;

            /**
             * Funcionalidad DBClick
             */
            this.setting.table.dbClick = 'dbClickFooter';

            /**
             * Obtener multipleSelect
             */
            this.setting.table.singleSelect = !this.$_returnMultiSelect();

            /**
             * Configración BaseServerDataTable
             */
            if (
                typeof this.setting.shared?.controller === 'string' ||
                typeof this.setting.shared?.endpoint === 'string'
            ) {
                this.show = 'Server';
                if (
                    this.setting.shared.controller != undefined &&
                    this.setting.shared.endpoint === undefined
                ) {
                    this.setting.table.controller =
                        this.setting.shared?.controller;

                    this.setting.table.method =
                        this.setting.shared.method != undefined
                            ? this.setting.shared.method
                            : 'GridWithList';

                    this.setting.table.service =
                        this.setting.shared.service != undefined
                            ? this.setting.shared.service
                            : undefined;
                } else {
                    this.setting.table.endpoint = this.setting.shared?.endpoint;
                }
            } else {
                this.show = 'Local';
                /**
                 * Configración BaseLocalDataTable
                 */

                this.local = this.setting.shared?.controller;
                this.icon = undefined;
            }
        },

        /**
         * Obtener Endpoint
         */
        returnEndPoint() {
            if (
                this.setting.shared.controller != undefined &&
                this.setting.shared.endpoint === undefined
            ) {
                /**
                 * Obtener Controlador
                 */
                const controller = this.setting.shared.controller;

                /**
                 * Obtener Método
                 */
                const method =
                    this.setting.shared.method != undefined
                        ? this.setting.shared.method
                        : 'GridWithList';

                /**
                 * Obtener Servicio
                 */
                const service =
                    this.setting.service != undefined
                        ? this.setting.service + '/'
                        : '';

                /**
                 * Retorna el endpoint
                 */
                const endpoint = '/' + service + controller + '/' + method;

                /**
                 * Retorna el endpoint al API
                 */
                return endpoint;
            } else {
                /**
                 * Retorna el endpoint al API
                 */
                return this.setting.shared.endpoint;
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
                this.setting.shared.multiSelect != undefined
                    ? this.setting.shared.multiSelect
                    : false;

            /**
             * Retorna el endpoint al API
             */
            return multiSelect;
        },

        /**
         * Comunicación de componente
         */
        $_updateValueToTable(params) {
            /**
             * Setear información
             */
            if (this.$_returnMultiSelect() == true) {
                this.$_updateValue([...new Set(params.concat(this.value))]);
            } else {
                this.$_updateValue(params[0]);
            }

            /**
             * Validar
             */
            this.$_validateValue(params);

            /**
             * Cerrar modal
             */
            this.$_openModal();
        },

        /**
         * Validación de la opción Seleccionada
         */
        $_validateValue(params) {
            if (this.$_inputData(params).length > 0) {
                this.$_uploadDataAsync().then(() => {
                    if (this.$_inputData(params).length > 0) {
                        this.$_updateValue(null);
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNoExistesDb
                        );
                    }
                });
            }
        },

        /**
         * Obtener diferencias de ID's
         */
        $_inputData(params) {
            let origin = this.$refs[this.refSelect].$data.items;
            let key = origin.map(
                (array) => array[this.setting.input.itemValue]
            );

            return params.filter(function (item) {
                return !key.includes(item) ? true : false;
            });
        },

        /**
         * Nuevo registro
         */
        $_SendToAPI() {
            let data = baseArrayHelper.SetObject({}, this.object);
            let endpoint;

            if (this.setting.new.endpoint === undefined) {
                /**
                 * Obtener Controlador
                 */
                const controller = this.setting.shared.controller;

                /**
                 * Obtener Método
                 */
                const method =
                    this.setting.new.method != undefined
                        ? this.setting.new.method
                        : 'Save';

                const service =
                    this.setting.new.service != undefined
                        ? this.setting.new.service + '/'
                        : this.setting.shared.service != undefined
                        ? this.setting.shared.service + '/'
                        : '';

                /**
                 * Retorna el endpoint
                 */
                endpoint = '/' + service + controller + '/' + method;
            } else {
                /**
                 * Retorna el endpoint
                 */
                endpoint = this.setting.new.endpoint;
            }

            httpService.post(endpoint, data).then((response) => {
                if (response != undefined) {
                    this.$refs[this.refForm].$_Clean();
                    let array = [response.data[this.newId]];
                    this.$_uploadDataAsync()
                        .then(() => {
                            this.$_DataAsync();
                            this.$_updateValueToTable(array);
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }
            });
        },

        /**
         * Actualiza la lista
         */
        async $_uploadDataAsync() {
            await this.$refs[this.refSelect].$_uploadData();
        },

        /**
         * Revisar la actualizacion de la lista
         */
        $_DataAsync() {
            console.log(this.$refs[this.refSelect].$data.items);
        },

        /**
         * Get Selected Data
         */
        $_GetSelectedData(value) {
            if (value != '' || value == undefined) {
                let array = this.$refs[this.refSelect].$data.items;
                return array.find(
                    (obj) => obj[this.setting.shared.key] === value
                );
            }
        },

        /**
         * Get ALL Data
         */
        $_GetAllData() {
            return this.$refs[this.refSelect].$data.items;
        },
    },
};
</script>

<template>
    <div>
        <!-- @BaseDialog -->
        <BaseDialog :ref="refpopUp" :width="width" :tittle="label">
            <div slot="Content">
                <!-- @BaseLocalDataTable-->
                <BaseLocalDataTable
                    :setting="setting.table"
                    v-if="show === 'Local'"
                    v-model="local"
                    :footerMethod="$_updateValueToTable"
                    :cancel="$_openModal"
                />

                <!-- @BaseServerDataTable -->
                <BaseServerDataTable
                    :setting="setting.table"
                    :dense="dense"
                    :rowsPerPage="rowsPerPage"
                    :footerMethod="$_updateValueToTable"
                    :cancel="$_openModal"
                    v-if="show === 'Server'"
                    :extraParams="extraParams"
                />

                <!-- @BaseForm -->
                <BaseForm
                    :ref="refForm"
                    :method="$_SendToAPI"
                    :cancel="$_openModal"
                    v-if="show === 'Form'"
                >
                    <div slot="body">
                        <v-row>
                            <v-col
                                cols="12"
                                :md="cols"
                                v-for="item in setting.new.entity"
                                :key="item.text"
                            >
                                <!-- @helper:  Input type Text -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    clearable
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-if="item.type == undefined"
                                />

                                <!-- @helper:  Input type Number -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    type="number"
                                    clearable
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'number'"
                                />

                                <!-- @helper:  Input type Hidden -->
                                <input
                                    type="hidden"
                                    v-model="object[item.value]"
                                    v-else-if="item.type == 'hidden'"
                                />

                                <!-- @helper:  Input type bigint -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    mask="###########"
                                    clearable
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'bigint'"
                                />

                                <!-- @helper:  Input type int -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    mask="##########"
                                    clearable
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'int'"
                                />

                                <!-- @helper:  Input type smallint -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    mask="#####"
                                    clearable
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'smallint'"
                                />

                                <!-- @helper:  Input type tinyint -->
                                <!-- @BaseInput -->
                                <BaseInput
                                    :label="item.text"
                                    clearable
                                    v-model="object[item.value]"
                                    mask="###"
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'tinyint'"
                                />

                                <!-- @helper:  Input type DATETIME -->
                                <!-- @BaseInput -->
                                <BaseDatePicker
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    :type="item.type"
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'datetime'"
                                />

                                <!-- @helper:  Input type DATE -->
                                <!-- @BaseInput -->
                                <BaseDatePicker
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    :type="item.type"
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'date'"
                                />

                                <!-- @helper:  Input type TIME -->
                                <!-- @BaseInput -->
                                <BaseDatePicker
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    :type="item.type"
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'time'"
                                />

                                <!-- @helper:  Input type Switch -->
                                <!-- @Componente:  BaseSwitch-->
                                <BaseSwitch
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    v-else-if="item.type == 'bool'"
                                />

                                <!-- @helper:  Input type Select -->
                                <!-- @BaseSelect -->
                                <BaseSelect
                                    :label="item.text"
                                    v-model="object[item.value]"
                                    :endpoint="item.endpoint"
                                    :itemText="item.itemText"
                                    :itemValue="item.itemValue"
                                    :validate="
                                        item.required == true
                                            ? ['text']
                                            : undefined
                                    "
                                    v-else-if="item.type == 'select'"
                                />
                            </v-col>
                        </v-row>
                    </div>
                </BaseForm>
            </div>
        </BaseDialog>

        <!-- @BaseSelect -->
        <BaseSelect
            :ref="refSelect"
            :chips="setting.input.chips"
            :deletable-chips="setting.input.deletableChips"
            :dense="setting.dense"
            :clearable="setting.input.clearable"
            :disabled="setting.input.disabled"
            :multiple="setting.input.multiple"
            :readonly="setting.input.readonly"
            :item-text="setting.input.itemText"
            :item-value="setting.input.itemValue"
            :label="setting.input.label"
            :cache-items="setting.input.cacheItems"
            :endpoint="setting.input.endpoint"
            :validate="regex"
            prependInnerIcon="mdi-magnify"
            :clickPrependInner="$_openModalGrid"
            :value="value"
            @input="$_updateValue"
            v-bind="$attrs"
            v-on="listeners"
            :append-outer-icon="icon"
            @click:append-outer="$_openModalForm"
            :extraParams="extraParams"
        />
    </div>
</template>
