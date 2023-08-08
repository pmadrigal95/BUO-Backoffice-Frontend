<script>
/**
 * Descripción: DataTable reutilizable usando Server Side
 *
 * Componente Utiliza peticiones httpService para traer información del servidor
 * Busqueda, Paginación y ordenamiento server side
 *
 * @displayName BaseServerDataTable
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseArrayHelper from '@/helpers/baseArrayHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

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
         * Label del Primer botón Footer
         * Default: Guardar
         */
        cancellabelBtn: {
            type: String,
            default: baseLocalHelper.$_LabelBtnGoOut,
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
            type: Array,
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
             * Objecto con filtros escritos en las columnas
             */
            filters: {},

            /**
             * Objecto con filtros escritos en las columnas
             */
            temporalFilters: {},

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
            delay: baseConfigHelper.$_clickDelay,

            /**
             * Mostrar buscadores por columnas
             */
            showSearch: false,

            /**
             * Descripción del botón
             */
            lblCancel: this.cancellabelBtn,

            /**
             * Mostrar btn cancelar del footer
             */
            showCancel: false,

            /**
             * Mostrar btn cancelar del footer
             */
            showFooterBtn: false,

            /**
             * Mostrar btn footer
             */
            showFooter: false,

            /**
             * Opciones por página
             */
            settingFooter: baseConfigHelper.$_itemsPerPage,

            booleanClick: true,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_boolList() {
            return [
                {
                    id: 'true',
                    value: 'Si',
                    icon: 'mdi-checkbox-marked-circle',
                    color: 'greenA800',
                },
                {
                    id: 'false',
                    value: 'No',
                    icon: 'mdi-close-circle',
                    color: 'grey500',
                },
            ];
        },

        $_filterList() {
            return this.headers.filter((x) => x.show && x.type != 'hidden');
        },
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
                let timer = baseConfigHelper.$_DefaultTimer;
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
                      (timer = baseConfigHelper.$_InputTimer));

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
    },

    created() {
        /**
         * Columnas configuradas con Show
         */
        !this.setting.dynamic && this.$_initialize(this.setting.columns);

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
            this.showFooter = true;
        }

        /**
         * Valida si es necesario el botón de Footer
         */
        if (this.$props.footerMethod != undefined) {
            this.showFooterBtn = true;
            this.showFooter = true;
        }
    },

    mounted() {
        /**
         * Enviar configuración al API
         */
        this.$_ParamsToAPI(baseConfigHelper.$_DefaultTimer);
    },

    methods: {
        /**
         *
         */
        reviewDynamicData(data) {
            if (this.setting.dynamic) {
                this.setting.columns = data.columns;
                this.setting.key = data.key;
                this.$_initialize(this.setting.columns);
            }
        },

        /**
         * Lógica Server Side
         */
        $_ParamsToAPI(time = baseConfigHelper.$_DefaultTimer) {
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
                                this.reviewDynamicData(response.data);
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
                        : 'findBy';

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
            this.setting?.columns &&
            Object.entries(this.filters).length === 0 &&
            this.options.sortBy.length === 0
                ? delete params.columns
                : (params.columns = this.createdColumnsParams());

            if (this.extraParams) {
                /**
                 * Retorna los params al API
                 */
                params.extraParams = this.extraParams;
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
        $_config() {
            this.isFilter = 'config';
            this.formTitle = baseLocalHelper.$_LabelBtnConfig;
            this.$refs.popUp.$_openModal();
        },

        /**
         * Mostrar Filtros
         */
        $_filter() {
            if (this.$vuetify.breakpoint.mdAndUp) {
                this.showSearch = !this.showSearch;
            } else {
                this.isFilter = 'Filter';
                this.formTitle = baseLocalHelper.$_LabelBtnmobilSearch;

                this.temporalFilters = baseArrayHelper.SetObject(
                    {},
                    this.filters
                );

                this.$refs.popUp.$_openModal();
            }
        },

        $_setFilter() {
            this.filters = baseArrayHelper.SetObject({}, this.temporalFilters);
            this.$refs.popUp.$_openModal();
        },

        /**
         * Cancelar Mobil search
         */
        $_cleanTempFilters() {
            this.$_cleanFilters();
            this.$refs.popUp.$_openModal();
        },

        /**
         * Limpiar filtros
         */
        $_cleanFilters() {
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
                        this.$props.setting.dbClick = this.$props.setting
                            .dbClick
                            ? this.$props.setting.dbClick
                            : 'Complete';
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

        $_setStatusColor(id) {
            switch (true) {
                case id == baseConfigHelper.$_statusCode.inactive ||
                    id == baseConfigHelper.$_statusCode.uncertified ||
                    id == baseConfigHelper.$_statusCode.unregisteredCompany ||
                    id == baseConfigHelper.$_statusCode.unrelatedProfessional:
                    return 'grey500';
                case id == baseConfigHelper.$_statusCode.active ||
                    id == baseConfigHelper.$_statusCode.certificate ||
                    id == baseConfigHelper.$_statusCode.fileProcessed:
                    return 'greenA800';
                case id == baseConfigHelper.$_statusCode.certifying:
                    return 'blue800';
                case id == baseConfigHelper.$_statusCode.rejected ||
                    id == baseConfigHelper.$_statusCode.fileError:
                    return 'redError900';
                default:
                    return 'grey400';
            }
        },

        $_setColorDegradedChart(value) {
            const x = Math.round(value * 100);
            switch (true) {
                case x === 100:
                    return 'main';
                case x > 50 && x < 100:
                    return 'secondary80';
                case x === 50:
                    return 'secondary70';
                case x < 50 && x > 0:
                    return 'secondary60';
                case x === 0:
                    return 'secondary50';
                default:
                    return 'transparent';
            }
        },

        $_setChartColor(value, color, type = 'background-color') {
            const palette =
                baseDataVisualizationColorsHelper.$_getColorByName(color);

            const degradedColor = this.$_setColorDegradedChart(value);

            return type != 'hexa'
                ? `${type}: ${palette[degradedColor]}`
                : `${palette[degradedColor]}`;
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-lg">
        <!-- @Componente:  BaseDialog-->
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '65%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title>{{ formTitle }}</v-card-title>
                    <v-card-text>
                        <v-container fluid v-if="isFilter === 'config'">
                            <v-row justify="center">
                                <v-col
                                    cols="12"
                                    md="4"
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
                        <!-- Filtro por columnas version mobile-->
                        <BaseForm
                            v-if="isFilter === 'Filter'"
                            :method="$_setFilter"
                            :cancel="$_cleanTempFilters"
                            icon="mdi-tune"
                            :label="formTitle"
                            :labelBtn="formTitle"
                        >
                            <div slot="body">
                                <v-expansion-panels flat multiple>
                                    <v-expansion-panel
                                        v-for="(header, i) in $_filterList"
                                        :key="i"
                                    >
                                        <v-expansion-panel-header
                                            class="buo-expansion-panel-header"
                                            v-if="
                                                (header.type != 'hidden' &&
                                                    header.type != 'color' &&
                                                    header.type !=
                                                        'percentage') ||
                                                header.isFilterable ||
                                                header.isFilterable == undefined
                                            "
                                        >
                                            <div
                                                v-if="
                                                    !temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                            >
                                                {{ header.text }}
                                            </div>
                                            <v-badge
                                                v-else
                                                color="greenC900"
                                                bordered
                                                dot
                                                offset-x="10"
                                                offset-y="11"
                                                >{{ header.text }}
                                            </v-badge>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <!-- @helper:  Filter type Text -->
                                            <v-text-field
                                                v-if="
                                                    header.type == undefined ||
                                                    header.type == 'chip'
                                                "
                                                label="Buscar"
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                outlined
                                                dense
                                                clearable
                                                clear-icon="mdi-close-circle"
                                            ></v-text-field>

                                            <!-- @helper:  Filter type Number -->
                                            <v-text-field
                                                label="Buscar"
                                                v-else-if="
                                                    header.type == 'number'
                                                "
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                outlined
                                                dense
                                                clearable
                                                clear-icon="mdi-close-circle"
                                                type="number"
                                            ></v-text-field>

                                            <!-- @helper:  Filter type Boolean -->
                                            <v-autocomplete
                                                label="Buscar"
                                                v-else-if="
                                                    header.type == 'bool'
                                                "
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                dense
                                                clearable
                                                outlined
                                                clear-icon="mdi-close-circle"
                                                :items="$_boolList"
                                                item-value="id"
                                            >
                                                <template
                                                    v-slot:selection="data"
                                                >
                                                    <v-icon
                                                        :color="data.item.color"
                                                        :input-value="data.item"
                                                    >
                                                        {{ data.item.icon }}
                                                    </v-icon>
                                                </template>

                                                <template v-slot:item="data">
                                                    <v-layout
                                                        justify-center
                                                        align-center
                                                    >
                                                        <v-icon
                                                            :color="
                                                                data.item.color
                                                            "
                                                            :input-value="
                                                                data.item
                                                            "
                                                        >
                                                            {{ data.item.icon }}
                                                        </v-icon>
                                                    </v-layout>
                                                </template>
                                            </v-autocomplete>

                                            <!-- @helper:  Filter type bigint -->
                                            <BaseInput
                                                label="Buscar"
                                                v-else-if="
                                                    header.type == 'bigint'
                                                "
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                dense
                                                mask="###########"
                                                clearable
                                            />

                                            <!-- @helper:  Filter type int -->
                                            <BaseInput
                                                label="Buscar"
                                                v-else-if="header.type == 'int'"
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                outlined
                                                dense
                                                mask="##########"
                                                clearable
                                            />

                                            <!-- @helper:  Filter type smallint -->
                                            <BaseInput
                                                v-else-if="
                                                    header.type == 'smallint'
                                                "
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                outlined
                                                label
                                                dense
                                                mask="#####"
                                                clearable
                                            />

                                            <!-- @helper:  Filter type tinyint -->
                                            <!-- @BaseInput -->
                                            <BaseInput
                                                label="Buscar"
                                                v-else-if="
                                                    header.type == 'tinyint'
                                                "
                                                v-model="
                                                    temporalFilters[
                                                        header.value
                                                    ]
                                                "
                                                outlined
                                                dense
                                                clearable
                                                mask="###"
                                            />
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
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
                        :fnConfig="setting.dynamic ? undefined : $_config"
                        :fnFilter="$_filter"
                        :fnNew="fnNew"
                        :fnEdit="fnEdit != undefined ? $_edit : undefined"
                        :fnDelete="
                            fnDelete != undefined ? $_DeleteModal : undefined
                        "
                        :rowCount="selected.length"
                    >
                        <!-- @slot Use este slot para agregar botones -->
                        <div slot="btns">
                            <slot name="btns"></slot>
                        </div>
                    </BaseButtonsGrid>
                </template>

                <!-- @helper:  Buscador por columnas-->
                <template v-slot:header v-if="$vuetify.breakpoint.mdAndUp">
                    <tr v-if="showSearch">
                        <!-- @helper:  Show / hidden columns -->
                        <th v-if="!cleanFilter">
                            <v-btn
                                :class="showSearch ? 'btnSearch' : undefined"
                                icon
                            >
                                <v-icon
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                    >mdi-magnify</v-icon
                                >
                            </v-btn>
                        </th>
                        <!-- @helper:  clean all the filters -->
                        <th v-if="cleanFilter">
                            <v-btn
                                :class="showSearch ? 'btnSearch' : undefined"
                                icon
                                @click="$_cleanFilters"
                            >
                                <v-icon
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                    >mdi-close-circle-outline</v-icon
                                >
                            </v-btn>
                        </th>

                        <th v-for="header in headers" :key="header.text">
                            <div
                                v-if="
                                    header.isFilterable ||
                                    header.isFilterable == undefined
                                "
                            >
                                <!-- @helper:  Filter type Text -->
                                <div
                                    v-if="
                                        header.type == undefined ||
                                        header.type == 'chip'
                                    "
                                    class="px-1 py-2"
                                >
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="filters[header.value]"
                                        v-if="showSearch"
                                        clearable
                                        clear-icon="mdi-close-circle"
                                    ></v-text-field>
                                </div>

                                <!-- @helper:  Filter type Number -->
                                <div
                                    v-else-if="header.type == 'number'"
                                    class="px-1 py-2"
                                >
                                    <v-text-field
                                        outlined
                                        dense
                                        v-model="filters[header.value]"
                                        v-if="showSearch"
                                        clearable
                                        clear-icon="mdi-close-circle"
                                        type="number"
                                    ></v-text-field>
                                </div>

                                <!-- @helper:  Filter type Hidden -->
                                <div v-else-if="header.type == 'hidden'">
                                    <input
                                        type="hidden"
                                        v-if="showSearch"
                                        v-model="filters[header.value]"
                                    />
                                </div>

                                <!-- @helper:  Filter type Boolean -->
                                <div
                                    v-else-if="header.type == 'bool'"
                                    class="px-1 py-2"
                                >
                                    <v-autocomplete
                                        dense
                                        clearable
                                        outlined
                                        clear-icon="mdi-close-circle"
                                        v-model="filters[header.value]"
                                        :items="$_boolList"
                                        item-value="id"
                                        v-if="showSearch"
                                    >
                                        <template v-slot:selection="data">
                                            <v-icon
                                                :color="data.item.color"
                                                :input-value="data.item"
                                            >
                                                {{ data.item.icon }}
                                            </v-icon>
                                        </template>

                                        <template v-slot:item="data">
                                            <v-layout
                                                justify-center
                                                align-center
                                            >
                                                <v-icon
                                                    :color="data.item.color"
                                                    :input-value="data.item"
                                                >
                                                    {{ data.item.icon }}
                                                </v-icon>
                                            </v-layout>
                                        </template>
                                    </v-autocomplete>
                                </div>

                                <!-- @helper:  Filter type bigint -->
                                <div
                                    v-else-if="header.type == 'bigint'"
                                    class="px-1 py-2"
                                >
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="###########"
                                        clearable
                                    />
                                </div>

                                <!-- @helper:  Filter type int -->
                                <div
                                    v-else-if="header.type == 'int'"
                                    class="px-1 py-2"
                                >
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        outlined
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="##########"
                                        clearable
                                    />
                                </div>

                                <!-- @helper:  Filter type smallint -->
                                <div
                                    v-else-if="header.type == 'smallint'"
                                    class="px-1 py-2"
                                >
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        outlined
                                        label
                                        dense
                                        v-model="filters[header.value]"
                                        mask="#####"
                                        clearable
                                    />
                                </div>

                                <!-- @helper:  Filter type tinyint -->
                                <div
                                    v-else-if="header.type == 'tinyint'"
                                    class="px-1 py-2"
                                >
                                    <!-- @BaseInput -->
                                    <BaseInput
                                        outlined
                                        label
                                        dense
                                        clearable
                                        v-model="filters[header.value]"
                                        mask="###"
                                    />
                                </div>
                            </div>
                        </th>
                    </tr>
                </template>

                <!-- Display de Filas -->
                <template
                    v-for="(
                        header,
                        bool,
                        color,
                        colorMobile,
                        chip,
                        percentage,
                        percentageMobile
                    ) in headers"
                    :slot="`item.${header.value}`"
                    slot-scope="{ item }"
                >
                    <!-- Color -->
                    <td
                        v-if="
                            header.type == 'color' &&
                            $vuetify.breakpoint.mdAndUp
                        "
                        :key="color"
                        :style="
                            $_setChartColor(
                                item[header.value],
                                header.color ? header.color : 'darkGreen'
                            )
                        "
                    ></td>

                    <!-- Color Mobile -->
                    <v-icon
                        v-else-if="
                            header.type == 'color' && $vuetify.breakpoint.mobile
                        "
                        :key="colorMobile"
                        :style="
                            $_setChartColor(
                                item[header.value],
                                header.color ? header.color : 'darkGreen',
                                'color'
                            )
                        "
                        >mdi-card</v-icon
                    >

                    <!-- Boolean -->
                    <v-icon
                        v-else-if="header.type == 'bool'"
                        :key="bool"
                        :color="item[header.value] ? 'greenA800' : 'grey500'"
                    >
                        mdi-{{
                            item[header.value]
                                ? 'checkbox-marked-circle'
                                : 'close-circle'
                        }}
                    </v-icon>

                    <!-- chip -->
                    <v-chip
                        small
                        outlined
                        :key="chip"
                        v-else-if="header.type == 'chip'"
                        :color="
                            $_setStatusColor(
                                item[
                                    header.itemKey
                                        ? `${header.itemKey}`
                                        : 'estadoId'
                                ]
                            )
                        "
                    >
                        {{ item[header.value] }}
                    </v-chip>

                    <!-- percentage -->
                    <td
                        v-else-if="
                            header.type == 'percentage' &&
                            $vuetify.breakpoint.mdAndUp
                        "
                        :key="percentage"
                    >
                        <v-row style="height: 100%; width: 100%" dense>
                            <div
                                v-for="(element, i) in item[header.value]"
                                :key="i"
                                :style="`height: 100%; width: ${Math.round(
                                    element.size * 100
                                )}%`"
                            >
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <div
                                            v-bind="attrs"
                                            v-on="on"
                                            v-if="element.size > 0"
                                            class="d-flex align-end justify-end white--text"
                                            :style="
                                                $_setChartColor(
                                                    element.color,
                                                    header.color
                                                        ? header.color
                                                        : 'darkGreen'
                                                )
                                            "
                                            style="
                                                height: 100%;
                                                cursor: pointer;
                                            "
                                        >
                                            <span class="pr-1 pb-1"
                                                >{{
                                                    Math.round(
                                                        element.size * 100
                                                    )
                                                }}%</span
                                            >
                                        </div>
                                    </template>
                                    <span>{{ element.tooltip }}</span>
                                </v-tooltip>
                            </div>
                        </v-row>
                    </td>

                    <!-- percentage mobile -->
                    <v-menu
                        top
                        offset-x
                        v-else-if="
                            header.type == 'percentage' &&
                            $vuetify.breakpoint.mobile
                        "
                        :key="percentageMobile"
                        min-width="50%"
                        min-height="100%"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                outlined
                                icon
                                small
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon x-small>mdi-google-analytics</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="100%" elevation="3">
                            <v-card-text>
                                <div
                                    v-for="(element, i) in item[header.value]"
                                    :key="i"
                                    :style="`height: 100%; width: ${Math.round(
                                        element.size * 100
                                    )}%`"
                                >
                                    <div
                                        v-if="element.size > 0"
                                        class="BUO-Label-Small buo-word-break buo-white-space pb-2"
                                        :style="
                                            $_setChartColor(
                                                element.color,
                                                header.color
                                                    ? header.color
                                                    : 'darkGreen',
                                                'color'
                                            )
                                        "
                                    >
                                        {{ Math.round(element.size * 100) }}%
                                        <v-progress-linear
                                            rounded
                                            :value="
                                                Math.round(element.size * 100)
                                            "
                                            :color="
                                                $_setChartColor(
                                                    element.color,
                                                    header.color
                                                        ? header.color
                                                        : 'darkGreen',
                                                    'hexa'
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-menu>

                    <!-- Normal -->
                    <div v-else :key="header.value">
                        {{ item[header.value] }}
                    </div>
                </template>
            </v-data-table>
        </v-card-text>

        <v-card-actions v-if="showFooter">
            <!-- @helper:  Botones Footer -->
            <v-layout align-end justify-end>
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    :color="app ? 'blueProgress600' : 'blue800'"
                    outlined
                    small
                    @click="$_CancelFooter"
                    v-if="showCancel"
                    >{{ lblCancel }}</v-btn
                >

                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    :color="color"
                    dark
                    small
                    @click="$_SelectedFooter"
                    v-if="showFooterBtn"
                    >{{ labelBtn }}</v-btn
                >

                <!-- @slot Agregar botones después del Btn principal -->
                <slot name="footerBtns"></slot>
            </v-layout>
        </v-card-actions>
    </v-card>
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
