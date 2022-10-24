<script>
/**
 * Descripción: DataTable reutilizable usando Server Side
 *
 * Componente Utiliza peticiones httpService para traer información del servidor
 * Busqueda, Paginación y ordenamiento server side
 *
 * @displayName BaseServerDataTable
 */

import baseLocalHelper from '@/helpers/baseLocalHelper.js';
import baseNotificationsHelper from '@/helpers/baseNotificationsHelper.js';
import baseArrayHelper from '@/helpers/baseArrayHelper.js';
import httpService from '@/services/axios/httpService.js';

const BaseButtonsGrid = () =>
    import('@/components/core/grids/BaseButtonsGrid.vue');

export default {
    name: 'BaseServerDataTable',

    components: {
        BaseButtonsGrid,
    },

    props: {
        /**
     * Objecto de configuración
     * Requerido
     * {
        controller: STRING,
        method: STRING (OPCIONAL),
        service: STRING (OPCIONAL),
        columns: ARRAY
        key: STRING
        singleSelect: BOOLEAN (opcional)
        dbClick: Function (OPCIONAL)
     * }
     */
        setting: {
            type: Object,
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
         * Default: primary
         */
        color: {
            default: 'primary',
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

        /**
         * tamaño de las filas
         */
        dense: {
            type: Boolean,
            default: false,
        },

        /**
         * tamaño de las filas
         */
        rowsPerPage: {
            type: Number,
            default: 10,
        },

        /**
         * Enviar información adicional al servidor
         */
        extraParams: {
            type: Object,
            default: undefined,
        },

        /**
         * Función Click
         * Default undefined
         */
        fnClick: {
            type: Function,
            default: undefined,
        },

        /**
         * Función DoubleClick
         * Default undefined
         * Cuidado con las props de footerMethod y Editar
         * NO usar en conjunto
         */
        fnDoubleClick: {
            type: Function,
            default: undefined,
        },

        /**
         * Enviar información adicional al servidor
         */
        settingFooter: {
            type: Object,
            default: function () {
                return baseLocalHelper.$_itemsPerPage;
            },
        },
    },

    data() {
        return {
            /**
             * Loading del grid
             */
            loadingGrid: true,

            /**
       * Objeto que se envia al Servidor
       * {
            page: number
            itemsPerPage: number
            sortBy: string[]
            sortDesc: boolean[]
            groupBy: string[]
            groupDesc: boolean[]
            multiSort: boolean
            mustSort: boolean
          }
       */
            options: {},

            /**
             * Filas Seleccionadas
             */
            selected: [],

            /**
             * Columnas que se muestran
             */
            headers: [],

            /**
             * Colección de datos del Server
             */
            items: [],

            /**
             * Colección total de datos del Server
             */
            totalItems: 0,

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
             * Determina contador de envios al api
             */
            sendAPICount: 0,

            /**
             * Determina tiempo entre clicks
             */
            clickTimer: null,

            /**
             * param tiempo entre clicks
             */
            delay: baseLocalHelper.$_clickDelay,

            /**
             * Descripción del botón
             */
            lblCancel: baseLocalHelper.$_LabelBtnGoOut,

            /**
             * Mostrar btn cancelar del footer
             */
            showCancel: false,

            /**
             * Mostrar btn footer
             */
            showFooter: false,

            /**
             * Opciones por página
             */
            //settingFooter: baseLocalHelper.$_itemsPerPage,

            show: null,

            componentKey: 0,

            booleanClick: true,
        };
    },

    watch: {
        /**
         * Peticiones al API
         */
        options: {
            handler() {
                this.$_ParamsToAPI();
            },
            deep: true,
        },

        /**
         * Validar si la función tiene evento click
         */
        selected: {
            handler() {
                if (this.booleanClick) {
                    this.$_click();
                }
                this.booleanClick = true;
            },
            deep: true,
        },

        /**
         * Selected
         */
        items() {
            if (this.items?.length === 0) {
                /**
                 * Limpia modelo de seleccionados
                 */
                this.booleanClick = false;
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

        /**
         * Config para hacer multiOrdenamiento
         */
        this.options.multiSort = true;

        /**
         * Config para hacer mostrar filas
         */
        this.options.itemsPerPage = this.rowsPerPage;

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
         * Enviar configuración al API
         */
        this.$_ParamsToAPI(baseLocalHelper.$_DefaultTimer);
    },

    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        /**
         * Lógica Server Side
         */
        $_ParamsToAPI(time = baseLocalHelper.$_DefaultTimer) {
            /**
             * Determinar cuantas solicitudes ha recibido para ejecutar
             */
            this.sendAPICount++;

            /**
             * Loading page
             */
            this.loadingGrid = true;
            /**
             * Ejecuta una petición, en determinado tiempo
             */
            if (this.sendAPICount === 1) {
                setTimeout(() => {
                    /**
                     * Envio al API
                     */
                    httpService
                        .post(this.returnEndPoint(), this.returnParams())
                        .then((response) => {
                            if (response != undefined) {
                                this.items = response.data;
                                this.totalItems =
                                    response.data && response.data.length > 0
                                        ? response.data[0].Total_Registros
                                        : 0;
                            }
                            this.loadingGrid = false;
                        });
                    this.sendAPICount = 0;
                }, time);
            }
        },

        /**
         * Obtener Endpoint
         */
        returnEndPoint() {
            if (
                this.setting.controller != undefined &&
                this.setting.endpoint === undefined
            ) {
                /**
                 * Obtener Controlador
                 */
                const controller = this.setting.controller;

                /**
                 * Obtener Método
                 */
                const method =
                    this.setting.method != undefined
                        ? this.setting.method
                        : 'Grid';

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
                return this.setting.endpoint;
            }
        },

        /**
         * Data a enviar al  API
         */
        returnParams() {
            /**
             * Se obtienen los parametros
             */
            const params = {
                Pagina: this.options.page,
                Registros: this.options.itemsPerPage,
            };

            /**
             * Por si selecciona todos
             */
            if (params.Registros === -1) {
                params.Registros = this.totalItems;
            }

            if (this.extraParams) {
                return Object.assign(params, this.extraParams);
            } else {
                return params;
            }
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
                        /**
                         * Caso sin seleccionar fila
                         */
                        baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotSelected
                        );
                        break;
                    case 1:
                        /**
                         * Envia Objecto a ejecutar en la función editar
                         */
                        var params = this.$_SetParams(
                            this.items,
                            this.selected[0]
                        );
                        this.fnEdit(params);
                        this.booleanClick = false;
                        this.selected = [];
                        break;
                    default:
                        /**
                         * Caso multiples seleccionar fila
                         */
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
        $_click() {
            if (this.fnClick != undefined) {
                /**
                 * Envia Array a ejecutar en la función Click
                 */
                this.fnClick(this.selected);
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
                        this.isFilter = 'delete';
                        this.formTitle = baseLocalHelper.$_LabelBtnDelete;
                        this.$refs.popUp.$_openModal();
                }
            }
        },

        /**
         * Validaciones y ejecutar función
         */
        $_Delete() {
            this.fnDelete(this.selected);
            this.booleanClick = false;
            this.selected = [];
            this.$refs.popUp.$_openModal();
        },

        /**
         * Mostrar columnas a Filtrar
         */
        $_filter() {
            this.isFilter = 'filter';
            this.formTitle = baseLocalHelper.$_LabelBtnFilter;
            this.$refs.popUp.$_openModal();
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
                        if (typeof this.$props.setting.dbClick === 'string') {
                            if (this.$props.setting.dbClick === 'Complete') {
                                this.footerMethod(origin);
                            } else {
                                key = origin.map(
                                    (array) => array[this.setting.key]
                                );
                                this.footerMethod(key);
                            }
                            this.booleanClick = false;
                            this.selected = [];
                        }
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
                            this.booleanClick = false;
                            this.selected = [];
                        }
                        this.selected.push(row);
                    } else {
                        this.booleanClick = false;
                        baseArrayHelper.DeleteObj(this.selected, index);
                    }
                }, this.delay);
            } else if (this.clickCount === 2) {
                clearTimeout(this.clickTimer);

                this.clickCount = 0;

                var params = this.$_SetParams(this.items, row);

                if (
                    this.$props.setting.dbClick != undefined &&
                    this.$props.footerMethod != undefined
                ) {
                    if (typeof this.$props.setting.dbClick === 'string') {
                        let array = [];
                        if (this.$props.setting.dbClick === 'Complete') {
                            array = [params.selected];
                        } else {
                            array = [params.selected[this.setting.key]];
                        }
                        this.footerMethod(array);
                    } else {
                        this.$props.setting.dbClick(params);
                    }
                } else {
                    /**
                     * Ejecutar Función db click -> EDITAR
                     */
                    if (this.$props.fnEdit != undefined) {
                        this.fnEdit(params);
                    }

                    /**
                     * Ejecutar Función db click
                     */
                    if (
                        this.$props.fnDoubleClick != undefined &&
                        this.$props.fnEdit == undefined
                    ) {
                        this.fnDoubleClick(params);
                    }
                }
                this.booleanClick = false;
                this.selected = [];
            }
        },
    },
};
</script>

<template>
    <div>
        <!-- @Componente:  BaseDialog-->
        <div>
            <!-- @Componente:  BaseDialog-->
            <BaseDialog ref="popUp" :tittle="formTitle">
                <div slot="Content">
                    <v-container fluid v-if="isFilter === 'filter'">
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
                        v-if="isFilter === 'delete'"
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
            <v-data-table
                :headers="headers"
                :items="items"
                v-model="selected"
                :single-select="
                    this.setting.singleSelect != undefined
                        ? this.setting.singleSelect
                        : true
                "
                :item-key="this.setting.key"
                show-select
                @click:row="$_setSelected"
                :options.sync="options"
                :server-items-length="totalItems"
                :loading="loadingGrid"
                :footer-props="settingFooter"
                :dense="dense"
            >
                <template v-slot:top>
                    <!-- @Componente:  BaseButtonsGrid-->
                    <BaseButtonsGrid
                        :fnRefresh="$_ParamsToAPI"
                        :fnFilter="$_filter"
                        :fnNew="fnNew"
                        :fnEdit="fnEdit != undefined ? $_edit : undefined"
                        :fnDelete="
                            fnDelete != undefined ? $_DeleteModal : undefined
                        "
                    >
                        <!-- @slot Use este slot para agregar botones -->
                        <div slot="btns">
                            <slot name="btns"></slot>
                        </div>
                    </BaseButtonsGrid>
                </template>

                <!-- @Helper: Si existe columna 'activo' -> Boolean muestra un check -->
                <template v-slot:item.activo="{ item }">
                    <v-simple-checkbox
                        v-model="item.activo"
                        disabled
                    ></v-simple-checkbox>
                </template>
            </v-data-table>

            <!-- @helper:  Botones Footer -->
            <v-layout align-end justify-end v-if="showFooter">
                <v-btn
                    class="ma-2"
                    :color="color"
                    dark
                    @click="$_SelectedFooter"
                    >{{ labelBtn }}</v-btn
                >

                <v-btn class="ma-2" @click="$_CancelFooter" v-if="showCancel">{{
                    lblCancel
                }}</v-btn>
                <!-- @slot Agregar botones después del Btn principal -->
                <slot name="btns"></slot>
            </v-layout>
        </div>
    </div>
</template>

<style lang="sass">
$break-large: 600px

.v-data-table thead th
    font-size: 1rem !important

@media screen and (min-width: $break-large)
.theme--light.v-data-table tbody tr.v-data-table__selected
    color: #ffffff
    background: #223549 !important
    .theme--light.v-icon
        color: #ffffff !important

.v-data-table .v-data-table__mobile-table-row
    display: initial

.theme--dark.v-data-table
    background-color: transparent !important
    color: #FFFFFF
</style>
