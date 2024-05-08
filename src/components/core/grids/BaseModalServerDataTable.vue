<script>
/**
 * Descripción: Pantalla  BaseModalServerDataTable
 *
 * @displayName BaseModalServerDataTable
 *
 */
import { v4 as uuidv4 } from 'uuid';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseLocalDataTable = () =>
    import('@/components/core/grids/BaseLocalDataTable');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'BaseModalServerDataTable',

    props: {
        /**
         * Objecto de configuración Abarca la config del dataTable
         * Requerido
         */
        setting: {
            type: Object,
            required: true,
        },

        /**
         * Enviar información adicional al servidor
         */
        extraParams: {
            type: Array,
            default: undefined,
        },

        /**
         * Identificador unico para
         * almacenar config en cache
         */
        pageView: {
            type: String,
            default: undefined,
        },

        ispageView: {
            type: Boolean,
            default: false,
        },

        /**
         * Función Reset Config cache
         * Default undefined
         */
        fnResetConfig: {
            type: Function,
            default: undefined,
        },

        callback: {
            type: Function,
            require: true,
        },

        /**
         * Propiedad del valor a guardar
         * Requerido
         */
        itemValue: {
            type: [String, Number],
            default: undefined,
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
         * Propiedad del valor a mostrar
         * Requerido
         */
        itemDesc: {
            type: [String, Number],
            default: undefined,
        },
    },

    components: {
        BaseLocalDataTable,
        BaseServerDataTable,
    },

    data() {
        return {
            /**
             * Cantidad de Filas por pag
             */
            rowsPerPage: 5,

            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',

            /**
             * Mostrar en el Dialog
             */
            show: null,

            local: undefined,

            key: 0,
        };
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
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
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
                if (typeof this.setting?.endpoint === 'string') {
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
            if (this.setting?.endpoint && this.setting?.key) {
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
            if (typeof this.setting?.endpoint === 'string') {
                this.show = 'Server';
                if (this.setting.endpoint !== undefined) {
                    this.setting.endpoint = this.setting?.endpoint;
                }
            } else {
                this.show = 'Local';
                /**
                 * Configración BaseLocalDataTable
                 */

                this.local = this.setting?.endpoint;
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

        $_resetColumnConfig() {
            this.fnResetConfig();
            this.key++;
        },

        $_setUp_Callback(array) {
            if (!this.callback) return;

            this.callback(
                array.map((element) => {
                    return {
                        id: this.itemValue
                            ? element[this.itemValue]
                            : element[this.setting.key],
                        value: this.itemText
                            ? element[this.itemText]
                            : undefined,
                        desc: this.itemDesc
                            ? element[this.itemDesc]
                            : undefined,
                    };
                })
            );
        },
    },
};
</script>

<template>
    <BasePopUp
        :ref="refpopUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
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
                :footerMethod="$_setUp_Callback"
            />

            <!-- @BaseServerDataTable -->
            <BaseServerDataTable
                :key="key"
                :pageView="pageView"
                :ispageView="ispageView"
                :setting="setting"
                :rowsPerPage="rowsPerPage"
                :footerMethod="$_setUp_Callback"
                :cancel="$_openModal"
                v-if="show === 'Server'"
                :extraParams="extraParams"
                :fnResetConfig="
                    fnResetConfig != undefined ? $_resetColumnConfig : undefined
                "
            />
        </div>
    </BasePopUp>
</template>
