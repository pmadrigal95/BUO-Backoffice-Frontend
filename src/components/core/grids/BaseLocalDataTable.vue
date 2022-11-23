<script>
/**
 * Descripción: DataTable reutilizable usando memoria
 *
 * Componente que crea lista de objectos en memoria
 *
 * @displayName BaseLocalDataTable
 */

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper.js';

import baseArrayHelper from '@/helpers/baseArrayHelper.js';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

const BaseButtonsGrid = () =>
    import('@/components/core/grids/BaseButtonsGrid.vue');

export default {
    name: 'BaseLocalDataTable',

    components: {
        BaseButtonsGrid,
    },

    props: {
        /**
     * Objecto de configuración
     * Requerido
     * {
     *  columns: ARRAY
        key: STRING
        singleSelect: BOOLEAN (opcional)
        dbClick: Function
     * }
     */
        setting: {
            type: Object,
            required: true,
        },

        /**
         * V-model
         * Requerido
         */
        value: {
            type: Array,
            required: true,
        },

        /**
         * Función Nuevo
         * Default undefined
         */
        fnNew: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Editar
         * Default undefined
         */
        fnEdit: {
            type: Function,
            default: undefined,
        },

        /**
         * Función Eliminar
         * Default undefined
         */
        fnDelete: {
            type: Function,
            default: undefined,
        },

        /**
         * Label del Primer botón Footer
         * Default: Guardar
         */
        labelBtn: {
            type: String,
            default: baseLocalHelper.$_LabelBtnSelected,
        },

        /**
         * Color del Primer botón Footer
         * Default: blue900
         */
        color: {
            default: 'blue900',
        },

        /**
         * Función a ejecutar en el Footer con el primer btn
         * Requerida
         */
        footerMethod: {
            type: Function,
            default: undefined,
        },

        /**
         * Función a ejecutar en el Footer con el botón Cancelar
         * no es Requerido
         */
        cancel: {
            type: Function,
            default: undefined,
        },
    },

    data() {
        return {
            /**
             * Tamaño de la pantalla del dispositivo
             */
            windowSize: {
                x: 0,
                y: 0,
            },

            /**
             * Buscador General
             */
            search: '',

            /**
             * Determina si usar buscadores por columnas o General
             */
            searchByColumns: null,

            /**
             * Objecto con filtros escritos en las columnas
             */
            filters: {},

            /**
             * Mostrar Botón para limpiar filtros
             */
            cleanFilter: null,

            /**
             * Filas Seleccionadas
             */
            selected: [],

            /**
             * Columnas que se muestran
             */
            headers: [],

            /**
             * Columnas para el filtro
             */
            objectFilter: this.setting.columns,

            /**
             * Determina que mostrar en el PopUp
             */
            isFilter: null,

            /**
             * Determina que mostrar en el mensaje a Eliminar
             */
            deleteMessage: null,

            /**
             * Determina que mostrar en el titulo del popUp
             */
            formTitle: '',

            /**
             * Determina contador de clicks
             */
            clickCount: 0,

            /**
             * Determina tiempo entre clicks
             */
            clickTimer: null,

            /**
             * param tiempo entre clicks
             */
            delay: 212,

            /**
             * Mostrar buscadores por columnas
             */
            showSearch: true,

            lblCancel: baseLocalHelper.$_LabelBtnGoOut,
            showCancel: false,
            showFooter: false,
        };
    },

    /**
     * Filtro por columnas
     */
    computed: {
        filteredData() {
            return this.value.filter((d) => {
                return Object.keys(this.filters).every((f) => {
                    return this.filters[f] === null
                        ? delete this.filters[f]
                        : this.filters[f].length < 1 ||
                              d[f]
                                  .toString()
                                  .toLowerCase()
                                  .includes(this.filters[f].toLowerCase());
                });
            });
        },
    },

    watch: {
        /**
         * Filtros
         */
        filters: {
            handler(val) {
                for (var key in val) {
                    val[key] == null || val[key] == '' || val[key] == undefined
                        ? delete val[key]
                        : '';
                }
                Object.entries(val).length === 0
                    ? (this.cleanFilter = false)
                    : (this.cleanFilter = true);
            },
            deep: true,
        },

        /**
         * Selected
         */
        value() {
            if (this.value.length === 0) {
                this.selected = [];
            }
        },

        /**
         * escucha cambios de filtros de columnas
         */
        objectFilter: {
            handler(val) {
                this.$_initialize(val);
            },
            deep: true,
        },
    },

    created() {
        /**
         * Columnas configuradas con Show
         */
        this.$_initialize(this.setting.columns);

        this.cleanFilter = false;

        /**
         * Valida si es necesario el botón de Cancelar
         */
        if (this.$props.cancel != undefined) {
            this.showCancel = true;
        }

        /**
         * Valida si es necesario el botón de Footer
         */
        if (this.$props.footerMethod != undefined) {
            this.showFooter = true;
        }
    },

    mounted() {
        /**
         * Determinar que tipo de buscadores utilizar
         */
        this.onResize();
    },

    methods: {
        /**
         * Determinar que tipo de buscadores utilizar
         */
        onResize() {
            this.windowSize = { x: window.innerWidth, y: window.innerHeight };

            this.windowSize.x > 595 && this.windowSize.y >= 527
                ? (this.searchByColumns = true)
                : (this.searchByColumns = false);
        },
        /**
         * obtener objecto seleccionado
         */
        $_SetParams(array, index) {
            return {
                index: baseArrayHelper.GetObjIndex(array, index),
                selected: index,
            };
        },

        /**
         * Obtener columnas a mostrar
         */
        $_initialize(value) {
            this.headers = [];
            this.headers = value.filter((headers) => headers.show == true);
        },

        /**
         * Validaciones y ejecutar función
         */
        $_edit() {
            if (this.fnEdit != undefined) {
                switch (this.selected.length) {
                    case 0:
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;
                    case 1:
                        var params = this.$_SetParams(
                            this.value,
                            this.selected[0]
                        );
                        this.fnEdit(params);
                        this.selected = [];
                        break;
                    default:
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotMultiSelected
                        );
                }
            }
        },

        /**
         * Validaciones y ejecutar función
         */
        $_DeleteModal() {
            if (this.fnDelete != undefined) {
                switch (this.selected.length) {
                    case 0:
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;

                    default:
                        this.deleteMessage = baseLocalHelper.$_MsgDelete(
                            this.selected.length
                        );
                        this.isFilter = false;
                        this.formTitle = baseLocalHelper.$_LabelBtnDelete;
                        this.$refs.popUp.$_openModal();
                }
            }
        },

        /**
         * Validaciones y ejecutar función
         */
        $_Delete() {
            for (let index = 0; index < this.selected.length; index++) {
                var params = this.$_SetParams(this.value, this.selected[index]);
                this.fnDelete(params);
            }

            this.selected = [];
            this.$refs.popUp.$_openModal();
        },

        /**
         * Mostrar columnas a Filtrar
         */
        $_filter() {
            this.isFilter = true;
            this.formTitle = baseLocalHelper.$_LabelBtnFilter;
            this.$refs.popUp.$_openModal();
        },

        /**
         * Limpiar filtros
         */
        $_Cleanfilter() {
            this.filters = {};
        },

        /**
         * Botón del Footer
         */
        $_SelectedFooter() {
            if (this.footerMethod != undefined) {
                let origin = [];
                let key = [];

                switch (this.selected.length) {
                    case 0:
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;

                    default:
                        origin = this.selected;
                        key = origin.map((array) => array[this.setting.key]);
                        this.footerMethod(key);
                        this.selected = [];
                }
            }
        },

        /**
         * Botón del Footer Cancelar
         */
        $_CancelFooter() {
            this.cancel();
        },

        /**
         * Eventos click y DBClick
         */
        $_setSelected(row) {
            this.clickCount++;

            if (this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    this.clickCount = 0;

                    var index = baseArrayHelper.GetObjIndex(this.selected, row);

                    if (index === -1) {
                        if (
                            this.setting.singleSelect === undefined ||
                            this.setting.singleSelect === true
                        ) {
                            this.selected = [];
                        }
                        this.selected.push(row);
                    } else {
                        baseArrayHelper.DeleteObj(this.selected, index);
                    }
                }, this.delay);
            } else if (this.clickCount === 2) {
                clearTimeout(this.clickTimer);

                this.clickCount = 0;

                var params = this.$_SetParams(this.value, row);

                if (this.$props.setting.dbClick != undefined) {
                    if (typeof this.$props.setting.dbClick === 'string') {
                        let array = [params.selected[this.setting.key]];
                        this.footerMethod(array);
                    } else {
                        this.$props.setting.dbClick(params);
                    }
                } else {
                    if (this.$props.fnEdit != undefined) {
                        this.fnEdit(params);
                    }
                }

                this.selected = [];
            }
        },
    },
};
</script>

<template>
    <div v-resize="onResize">
        <!-- @Componente:  BaseDialog-->
        <BaseDialog ref="popUp" :tittle="formTitle">
            <div slot="Content">
                <v-container fluid v-if="isFilter">
                    <v-row>
                        <v-col v-for="(item, i) in objectFilter" :key="i">
                            <!-- @Componente:  BaseSwitch-->
                            <BaseSwitch
                                v-model="item.show"
                                :label="item.text"
                            />
                        </v-col>
                    </v-row>
                </v-container>

                <!-- @Componente:  BaseForm-->
                <BaseForm
                    v-if="!isFilter"
                    :method="$_Delete"
                    icon="mdi-delete"
                    labelBtn="Eliminar"
                >
                    <div slot="body">
                        <br />
                        <v-row align-content="center">
                            <h3>{{ deleteMessage }}</h3>
                        </v-row>
                    </div>
                </BaseForm>
            </div>
        </BaseDialog>

        <!-- @Componente:  v-data-table-->
        <v-card flat class="rounded-lg">
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="filteredData"
                    v-model="selected"
                    :single-select="
                        this.setting.singleSelect != undefined
                            ? this.setting.singleSelect
                            : true
                    "
                    :item-key="this.setting.key"
                    show-select
                    multi-sort
                    @click:row="$_setSelected"
                    :search="search"
                >
                    <template v-slot:top>
                        <!-- @Componente:  BaseButtonsGrid-->
                        <BaseButtonsGrid
                            :fnFilter="$_filter"
                            :fnNew="fnNew"
                            :fnEdit="fnEdit != undefined ? $_edit : undefined"
                            :fnDelete="
                                fnDelete != undefined
                                    ? $_DeleteModal
                                    : undefined
                            "
                        >
                            <!-- @slot Use este slot para agregar botones -->
                            <div slot="btns">
                                <slot name="btns"></slot>
                            </div>
                        </BaseButtonsGrid>

                        <v-row v-if="!searchByColumns">
                            <v-col>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Buscar"
                                    single-line
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>

                    <!-- @helper:  Buscador por columnas-->
                    <template v-slot:header v-if="searchByColumns">
                        <tr>
                            <!-- @helper:  Show / hidden columns -->
                            <th v-if="!cleanFilter">
                                <v-btn icon class="toUp">
                                    <v-icon color="blue900">mdi-magnify</v-icon>
                                </v-btn>
                            </th>
                            <!-- @helper:  clean all the filters -->
                            <th v-if="cleanFilter">
                                <v-btn icon @click="$_Cleanfilter" class="toUp">
                                    <v-icon color="blue900"
                                        >mdi-close-circle-outline</v-icon
                                    >
                                </v-btn>
                            </th>

                            <th v-for="header in headers" :key="header.text">
                                <!-- @helper:  Filter type Text -->
                                <v-col v-if="header.type == undefined">
                                    <BaseInput
                                        dense
                                        v-model="filters[header.value]"
                                        v-if="showSearch"
                                        clearable
                                        outlined
                                    ></BaseInput>
                                </v-col>

                                <!-- @helper:  Filter type Number -->
                                <v-col v-else-if="header.type == 'number'">
                                    <BaseInput
                                        dense
                                        v-model="filters[header.value]"
                                        v-if="showSearch"
                                        clearable
                                        type="number"
                                        outlined
                                    ></BaseInput>
                                </v-col>

                                <!-- @helper:  Filter type Hidden -->
                                <v-col v-else-if="header.type == 'hidden'">
                                    <input
                                        type="hidden"
                                        v-if="showSearch"
                                        v-model="filters[header.value]"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type Boolean -->
                                <v-col v-else-if="header.type == 'bool'">
                                    <v-row
                                        align-content="center"
                                        justify="center"
                                    >
                                        <v-checkbox
                                            dense
                                            v-if="showSearch"
                                            v-model="filters[header.value]"
                                        ></v-checkbox>
                                    </v-row>
                                </v-col>

                                <!-- @helper:  Filter type bigint -->
                                <v-col v-else-if="header.type == 'bigint'">
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="###########"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type int -->
                                <v-col v-else-if="header.type == 'int'">
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="##########"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type smallint -->
                                <v-col v-else-if="header.type == 'smallint'">
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="#####"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type smallint -->
                                <v-col v-else-if="header.type == 'tinyint'">
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        label
                                        dense
                                        clearable
                                        v-model="filters[header.value]"
                                        mask="###"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type DATETIME -->
                                <v-col v-else-if="header.type == 'datetime'">
                                    <!-- @BaseInput -->
                                    <BaseDatePicker
                                        :dense="header.type == 'datetime'"
                                        v-model="filters[header.value]"
                                        :type="header.type"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type DATE -->
                                <v-col v-else-if="header.type == 'date'">
                                    <!-- @BaseInput -->
                                    <BaseDatePicker
                                        :dense="header.type == 'date'"
                                        v-model="filters[header.value]"
                                        :type="header.type"
                                    />
                                </v-col>

                                <!-- @helper:  Filter type TIME -->
                                <v-col v-else-if="header.type == 'time'">
                                    <!-- @BaseInput -->
                                    <BaseDatePicker
                                        :dense="header.type == 'time'"
                                        v-model="filters[header.value]"
                                        :type="header.type"
                                    />
                                </v-col>
                            </th>
                        </tr>
                    </template>

                    <!-- @Helper: Si existe columna 'activo' -> Boolean muestra un check 
                    <template v-slot:item.activo="{ item }">
                        <v-simple-checkbox
                            v-model="item.activo"
                            disabled
                        ></v-simple-checkbox>
                    </template>-->
                </v-data-table>
            </v-card-text>

            <v-card-actions>
                <!-- @helper:  Botones Footer -->
                <v-layout align-end justify-end v-if="showFooter">
                    <v-btn
                        class="ma-2"
                        :color="color"
                        dark
                        @click="$_SelectedFooter"
                        >{{ labelBtn }}</v-btn
                    >

                    <v-btn
                        class="ma-2"
                        @click="$_CancelFooter"
                        v-if="showCancel"
                        >{{ lblCancel }}</v-btn
                    >
                    <!-- @slot Agregar botones después del Btn principal -->
                    <slot name="btns"></slot>
                </v-layout>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style lang="sass">
$break-large: 600px

.v-data-table thead th
    font-size: 1rem !important

@media screen and (min-width: $break-large)
.theme--light.v-data-table tbody tr.v-data-table__selected
    color: #ffffff
    background: #003F5E !important
    .theme--light.v-icon
        color: #ffffff !important

.v-data-table .v-data-table__mobile-table-row
    display: initial

.theme--dark.v-data-table
    background-color: transparent !important
    color: #FFFFFF

.toUp
    top: -10px !important
</style>
