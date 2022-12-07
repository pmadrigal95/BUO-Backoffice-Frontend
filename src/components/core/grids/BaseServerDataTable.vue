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
import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';
import httpService from '@/services/axios/httpService.js';

const BaseButtonsGrid = () =>
    import('@/components/core/grids/BaseButtonsGrid.vue');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

const BaseSimpleInputList = () =>
    import('@/components/core/forms/BaseSimpleInputList.vue');

export default {
    name: 'BaseServerDataTable',

    components: {
        BaseButtonsGrid,
        BaseCustomsButtonsGrid,
        BaseSimpleInputList,
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
             * Tamaño de la pantalla del dispositivo
             */
            windowSize: {
                x: 0,
                y: 0,
            },

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
             * Mostrar buscadores por columnas
             */
            showSearch: true,

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
            settingFooter: baseLocalHelper.$_itemsPerPage,

            /**
             * Mostrar buscadores por columnas mobil
             */
            mobilColumns: null,

            /**
             * Descripción a buscar
             */
            mobilSearch: null,

            typeMobilFilter: null,

            objectMobilFilter: {},

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
                if (this.loadingGrid == false) {
                    this.$_ParamsToAPI();
                }
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
         * Filtros
         */
        filters: {
            handler(val) {
                /**
                 * Establece el tiempo a ejecutar la función
                 */
                let timer = baseLocalHelper.$_DefaultTimer;
                this.options.page = 1;
                /**
                 * elimina propiedades sin información
                 */
                for (var key in val) {
                    val[key] == null || val[key] == '' || val[key] == undefined
                        ? delete val[key]
                        : '';
                }

                /**
                 * Determina si contiene propiedades
                 */
                Object.entries(val).length === 0
                    ? (this.cleanFilter = false)
                    : ((this.cleanFilter = true),
                      (timer = baseLocalHelper.$_InputTimer));

                /**
                 * Envio al API
                 */
                this.$_ParamsToAPI(timer);
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

        /**
         * limpia buscadores cuando cambia de dispositivos
         */
        searchByColumns(val, old) {
            if (val != old) {
                (this.mobilColumns = null), (this.mobilSearch = null);
                this.$_Cleanfilter();
                this.forceRerender();
            }
        },

        /**
         * Determita que estilo de filtro mostrar
         */
        mobilColumns(val) {
            let result = this.$_getmobilSearch(val);
            this.typeMobilFilter = undefined;
            this.objectMobilFilter = {};
            if (result != undefined) {
                if (result?.filterSetting) {
                    this.typeMobilFilter = 'table';
                    this.objectMobilFilter = result?.filterSetting;
                } else {
                    this.typeMobilFilter = 'text';
                }
            }
            this.forceRerender();
        },
    },

    created() {
        /**
         * Columnas configuradas con Show
         */
        this.$_initialize(this.setting.columns);

        this.cleanFilter = false;

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
         * Determinar que tipo de buscadores utilizar
         */
        this.onResize();

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
                                this.items = response.data.content;
                                this.totalItems = response.data.totalElements;
                                this.loadingGrid = false;
                                this.loadingPage = false;
                            }
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
                page: this.options.page - 1,
                itemsPerPage: this.options.itemsPerPage,
            };

            /**
             * Por si selecciona todos
             */
            if (params.itemsPerPage === -1) {
                params.itemsPerPage = this.totalItems;
            }

            /**
             * Buscadores por columnas
             */
            Object.entries(this.filters).length === 0 &&
            this.options.sortBy.length === 0
                ? delete params.columns
                : (params.columns = this.createdColumnsParams());

            if (this.extraParams) {
                /**
                 * Retorna los params al API
                 */
                params.extraParams = { ...this.extraParams };
            }

            /**
             * Retorna los params al API
             */
            return params;
        },

        /**
         * Método para crear las columnas de búsqueda y su ordenamiento
         */
        createdColumnsParams() {
            return baseSharedFnHelper.$_fullJoin(
                this.createdColumnsFilters(),
                this.createdColumnsSort(),
                'name'
            );
        },

        /**
         * Método para crear las columnas de búsqueda
         */
        createdColumnsFilters() {
            let columns = [];

            /**
             * Elimina propiedades sin valor
             */
            for (let key in this.filters) {
                if (
                    this.filters[key] == null ||
                    this.filters[key] == '' ||
                    this.filters[key] == undefined
                ) {
                    delete this.filters[key];
                } else {
                    /**
                     * Se construye Objecto requerido para el buscador
                     */
                    columns.push({
                        name: key,
                        value: this.filters[key],
                    });
                }
            }
            /**
             * Retorna los columnas al objecto params
             */
            return columns;
        },

        /**
         * Método para crear las columnas de Ordenamiento
         */
        createdColumnsSort() {
            let columns = [];

            for (let index = 0; index < this.options.sortBy.length; index++) {
                /**
                 * Se construye Objecto requerido para el Ordenamiento
                 */
                columns.push({
                    name: this.options.sortBy[index],
                    sort: this.options.sortDesc[index] ? 'desc' : 'asc',
                });
            }

            return columns;
        },

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
         * Mostrar Mobil search
         */
        $_mobilSearch() {
            this.isFilter = 'search';
            this.formTitle = baseLocalHelper.$_LabelBtnmobilSearch;
            this.$refs.popUp.$_openModal();
        },

        /**
         * Método Mobil search
         */
        $_popUpSearch() {
            let result = this.$_getmobilSearch(this.mobilColumns);

            this.filters[result?.filterBy ? result?.filterBy : result?.value] =
                this.mobilSearch;

            this.$_ParamsToAPI();
            this.$refs.popUp.$_openModal();
        },

        /**
         * Cancelar Mobil search
         */
        $_CancelmobilSearch() {
            this.$_Cleanfilter();
            this.$refs.popUp.$_openModal();
        },

        /**
         * Obtener config de la columna
         */
        $_getmobilSearch(value) {
            return this.objectFilter.find((x) => x.value === value);
        },

        /**
         * Limpiar filtros
         */
        $_Cleanfilter() {
            this.filters = {};
            this.$_ParamsToAPI();
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
    <div v-resize="onResize">
        <!-- @Componente:  BaseDialog-->
        <div>
            <!-- @Componente:  BaseDialog-->
            <BasePopUp
                ref="popUp"
                :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '50%'"
                :isDrawer="false"
                scrollable
            >
                <div slot="Content">
                    <v-card flat>
                        <v-card-title>{{ formTitle }}</v-card-title>
                        <v-card-text>
                            <v-container fluid v-if="isFilter === 'filter'">
                                <v-row>
                                    <v-col
                                        v-for="(item, i) in objectFilter"
                                        :key="i"
                                    >
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

                            <!-- @Componente:  BaseForm-->
                            <BaseForm
                                v-if="isFilter === 'search'"
                                :method="$_popUpSearch"
                                :cancel="$_CancelmobilSearch"
                                icon="mdi-magnify"
                                :label="formTitle"
                                :labelBtn="formTitle"
                            >
                                <div slot="body">
                                    <br />
                                    <v-col>
                                        <!-- @BaseSelect -->
                                        <BaseSelect
                                            v-model="mobilColumns"
                                            label="Columna"
                                            :endpoint="objectFilter"
                                            itemText="text"
                                            itemValue="value"
                                            :validate="['text']"
                                        />
                                    </v-col>
                                    <v-col>
                                        <v-alert
                                            v-if="!typeMobilFilter"
                                            text
                                            prominent
                                            type="error"
                                            icon="mdi-progress-alert"
                                        >
                                            Debe seleccionar al menos un
                                            registro
                                        </v-alert>

                                        <!-- @BaseInput -->
                                        <BaseInput
                                            v-else-if="
                                                typeMobilFilter == 'text'
                                            "
                                            label="Buscar"
                                            :validate="['text']"
                                            v-model="mobilSearch"
                                            :key="componentKey"
                                        />

                                        <!-- @BaseInputList -->
                                        <BaseInputList
                                            v-if="
                                                typeMobilFilter == 'table' &&
                                                objectMobilFilter !=
                                                    undefined &&
                                                objectMobilFilter.input !=
                                                    undefined
                                            "
                                            :setting="objectMobilFilter"
                                            v-model="mobilSearch"
                                            :key="componentKey"
                                        />

                                        <!-- @BaseSimpleInputList -->
                                        <BaseSimpleInputList
                                            v-if="
                                                typeMobilFilter == 'table' &&
                                                objectMobilFilter !=
                                                    undefined &&
                                                objectMobilFilter.input ==
                                                    undefined
                                            "
                                            :setting="objectMobilFilter"
                                            :denseInput="true"
                                            v-model="mobilSearch"
                                            :key="componentKey"
                                        />
                                    </v-col>
                                </div>
                            </BaseForm>
                        </v-card-text>
                    </v-card>
                </div>
            </BasePopUp>

            <v-card flat class="rounded-lg">
                <v-card-text>
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
                                :fnEdit="
                                    fnEdit != undefined ? $_edit : undefined
                                "
                                :fnDelete="
                                    fnDelete != undefined
                                        ? $_DeleteModal
                                        : undefined
                                "
                                :rowCount="selected.length"
                            >
                                <!-- @slot Use este slot para agregar botones -->
                                <div slot="btns">
                                    <BaseCustomsButtonsGrid
                                        v-if="!searchByColumns"
                                        label="Buscar"
                                        icon="mdi-magnify"
                                        :fnMethod="$_mobilSearch"
                                    />
                                    <slot name="btns"></slot>
                                </div>
                            </BaseButtonsGrid>
                        </template>

                        <!-- @helper:  Buscador por columnas-->
                        <template v-slot:header v-if="searchByColumns">
                            <tr>
                                <!-- @helper:  Show / hidden columns -->
                                <th v-if="!cleanFilter">
                                    <v-btn
                                        :class="
                                            showSearch ? 'btnSearch' : undefined
                                        "
                                        icon
                                        @click="showSearch = !showSearch"
                                    >
                                        <v-icon color="black"
                                            >mdi-magnify</v-icon
                                        >
                                    </v-btn>
                                </th>
                                <!-- @helper:  clean all the filters -->
                                <th v-if="cleanFilter">
                                    <v-btn
                                        :class="
                                            showSearch ? 'btnSearch' : undefined
                                        "
                                        icon
                                        @click="$_Cleanfilter"
                                    >
                                        <v-icon color="black"
                                            >mdi-close-circle-outline</v-icon
                                        >
                                    </v-btn>
                                </th>

                                <th
                                    v-for="header in headers"
                                    :key="header.text"
                                >
                                    <!-- @helper:  Filter type Text -->
                                    <v-col
                                        v-if="
                                            header.type == undefined &&
                                            header.filterSetting == undefined
                                        "
                                    >
                                        <v-text-field
                                            outlined
                                            dense
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            v-if="showSearch"
                                            clearable
                                        ></v-text-field>
                                    </v-col>

                                    <!-- @helper:  Filter type Number -->
                                    <v-col v-else-if="header.type == 'number'">
                                        <v-text-field
                                            outlined
                                            dense
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            v-if="showSearch"
                                            clearable
                                            type="number"
                                        ></v-text-field>
                                    </v-col>

                                    <!-- @helper:  Filter type Hidden -->
                                    <v-col v-else-if="header.type == 'hidden'">
                                        <input
                                            type="hidden"
                                            v-if="showSearch"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
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
                                                v-model="
                                                    filters[
                                                        header.filterBy
                                                            ? header.filterBy
                                                            : header.value
                                                    ]
                                                "
                                            ></v-checkbox>
                                        </v-row>
                                    </v-col>

                                    <!-- @helper:  Filter type bigint -->
                                    <v-col v-else-if="header.type == 'bigint'">
                                        <!-- @BaseInput -->
                                        <BaseInput
                                            label
                                            dense
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            mask="###########"
                                            clearable
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type int -->
                                    <v-col v-else-if="header.type == 'int'">
                                        <!-- @BaseInput -->
                                        <BaseInput
                                            outlined
                                            label
                                            dense
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            mask="##########"
                                            clearable
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type smallint -->
                                    <v-col
                                        v-else-if="header.type == 'smallint'"
                                    >
                                        <!-- @BaseInput -->
                                        <BaseInput
                                            outlined
                                            label
                                            dense
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            mask="#####"
                                            clearable
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type tinyint -->
                                    <v-col v-else-if="header.type == 'tinyint'">
                                        <!-- @BaseInput -->
                                        <BaseInput
                                            outlined
                                            label
                                            dense
                                            clearable
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            mask="###"
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type DATETIME -->
                                    <v-col
                                        v-else-if="header.type == 'datetime'"
                                    >
                                        <!-- @BaseInput -->
                                        <BaseDatePicker
                                            :dense="header.type == 'datetime'"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            :type="header.type"
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type DATE -->
                                    <v-col v-else-if="header.type == 'date'">
                                        <!-- @BaseInput -->
                                        <BaseDatePicker
                                            :dense="header.type == 'date'"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            :type="header.type"
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type TIME -->
                                    <v-col v-else-if="header.type == 'time'">
                                        <!-- @BaseInput -->
                                        <BaseDatePicker
                                            :dense="header.type == 'time'"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            :type="header.type"
                                        />
                                    </v-col>

                                    <!-- @helper:  Filter type BaseInputList -->
                                    <v-col
                                        v-else-if="
                                            header.filterSetting != undefined &&
                                            header.filterSetting.input !=
                                                undefined
                                        "
                                    >
                                        <!-- @BaseInputList -->
                                        <BaseInputList
                                            :setting="header.filterSetting"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            v-if="showSearch"
                                        />
                                    </v-col>

                                    <v-col
                                        v-else-if="
                                            header.filterSetting != undefined &&
                                            header.filterSetting.input ==
                                                undefined
                                        "
                                    >
                                        <!-- @BaseSimpleInputList -->
                                        <BaseSimpleInputList
                                            :setting="header.filterSetting"
                                            :denseInput="true"
                                            v-model="
                                                filters[
                                                    header.filterBy
                                                        ? header.filterBy
                                                        : header.value
                                                ]
                                            "
                                            v-if="showSearch"
                                        />
                                    </v-col>
                                </th>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card-text>

                <v-card-actions v-if="showFooter">
                    <!-- @helper:  Botones Footer -->
                    <v-layout align-end justify-end>
                        <v-btn
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            outlined
                            small
                            @click="$_CancelFooter"
                            v-if="showCancel"
                            >{{ lblCancel }}</v-btn
                        >

                        <v-btn
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            :color="color"
                            dark
                            small
                            @click="$_SelectedFooter"
                            >{{ labelBtn }}</v-btn
                        >

                        <!-- @slot Agregar botones después del Btn principal -->
                        <slot name="btns"></slot>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<style lang="sass">
.v-data-table thead th
    font-family: 'Montserrat' !important
    font-style: normal !important
    font-weight: 600 !important
    font-size: 14px !important
    line-height: 125% !important

.v-data-table tbody td
    font-family: 'Montserrat' !important
    font-style: normal !important
    font-weight: 400 !important
    font-size: 14px !important
    line-height: 125% !important

$break-large: 600px

@media screen and (min-width: $break-large)
.theme--light.v-data-table tbody tr.v-data-table__selected
    color: #FFFFFF
    background: #005D8C !important
    .theme--light.v-icon
        color: #FFFFFF !important

.v-data-table .v-data-table__mobile-table-row
    display: initial

.theme--dark.v-data-table
    background-color: transparent !important
    color: #FFFFFF

.btnSearch
    bottom: 1vh
</style>
