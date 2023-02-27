<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName BUOPDAReportViewComponent
 *
 */

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService.js';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseInputDataTable = () =>
    import('@/components/core/forms/BaseInputDataTable');

const BaseInputTreeview = () =>
    import('@/components/core/treeview/BaseInputTreeview');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'BUOPDAReportViewComponent',

    components: {
        BaseServerDataTable,
        BaseInputTreeview,
        BaseInputDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            extraParams: undefined,
            search: 0,
            componentKey: 0,
            loading: [{ value: false }, { value: false }],
        };
    },

    computed: {
        /**
         * Configuracion BaseInputDataTable
         */
        companySetting() {
            return {
                endpoint: 'organizacion/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Nombre Contacto',
                        align: 'start',
                        value: 'nombreContacto',
                        show: false,
                    },
                    {
                        text: 'Correo Contacto',
                        align: 'start',
                        value: 'correoContacto',
                        show: false,
                    },
                    {
                        text: 'Token Usuario',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Usuarios',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: true,
                    },
                    {
                        text: 'Wallets Activas',
                        align: 'end',
                        value: 'walletsActivas',
                        show: true,
                    },
                    {
                        text: 'Certifica Inmediato',
                        type: 'bool',
                        align: 'center',
                        value: 'certificaInmediato',
                        show: false,
                    },
                    {
                        text: 'Mostrar Puestos Genéricos',
                        type: 'bool',
                        align: 'center',
                        value: 'mostrarPuestosGenericos',
                        show: false,
                    },
                    {
                        text: 'Demo',
                        type: 'bool',
                        align: 'center',
                        value: 'esClienteDemo',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Industria',
                        align: 'start',
                        value: 'nombreIndustria',
                        show: false,
                    },
                    {
                        text: 'País',
                        align: 'start',
                        value: 'nombrePais',
                        show: false,
                    },
                    {
                        text: 'Ciudad',
                        align: 'start',
                        value: 'ciudad',
                        show: false,
                    },
                    {
                        text: 'Descripción',
                        align: 'start',
                        value: 'descripcion',
                        show: false,
                    },
                ],
                key: 'id',
            };
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'user/findBy',
                columns: [
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: false,
                    },
                    {
                        text: 'Primer Apellido',
                        align: 'start',
                        value: 'primerApellido',
                        show: false,
                    },
                    {
                        text: 'Segundo Apellido',
                        align: 'start',
                        value: 'segundoApellido',
                        show: false,
                    },
                    {
                        text: 'Nombre Completo',
                        align: 'start',
                        value: 'nombreCompleto',
                        show: true,
                    },
                    {
                        text: 'Correo',
                        align: 'start',
                        value: 'correo',
                        show: true,
                    },
                    {
                        text: 'País',
                        align: 'start',
                        value: 'nombrePais',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
                    },
                    {
                        text: 'Wallet Activo',
                        type: 'bool',
                        align: 'center',
                        value: 'walletActivo',
                        show: false,
                    },
                    {
                        text: 'Identificación',
                        align: 'center',
                        value: 'identificacion',
                        show: false,
                    },
                    {
                        text: 'Género',
                        align: 'center',
                        value: 'nombreGenero',
                        show: false,
                    },
                    {
                        text: 'Ciudad',
                        align: 'center',
                        value: 'ciudad',
                        show: false,
                    },
                    {
                        text: 'Telefóno',
                        align: 'center',
                        value: 'telefono',
                        show: false,
                    },
                    {
                        text: 'Username',
                        align: 'center',
                        value: 'username',
                        show: false,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: false,
                    },
                    {
                        text: 'Área / Departamento',
                        align: 'start',
                        value: 'nombreDepartamento',
                        show: false,
                    },
                ],
                key: 'id',
                singleSelect: false,
            };
        },
    },

    methods: {
        $_forceUpdateComponente() {
            this.componentKey = this.componentKey + 1;
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                organizacionId: undefined,
                departamentoId: undefined,
            };
        },

        $_sendToApi(entity, number) {
            this.loading[number].value = true;
            httpService
                .post('buo_pda/reporte_resumen', entity)
                .then((response) => {
                    if (response != undefined) {
                        baseFnFile.$_dowloadFile(
                            response.data.fileEncoded,
                            response.data.fileName,
                            baseFnFile.$_extensionsName.zip
                        );
                        this.loading[number].value = false;
                    }
                });
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.UserFilter.$data.selected;
        },

        /**
         * download Zip File
         */
        $_downloadMultipleFiles() {
            const data = [];
            this.$_GetRow().forEach((element) =>
                data.push(element[this.setting.key])
            );

            if (data != undefined && data.length > 0) {
                this.$_sendToApi(
                    {
                        organizacionId: this.entity.organizacionId,
                        empleados: data,
                    },
                    0
                );
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgRowNotSelected
                );
            }
        },

        /**
         * download Zip File
         */
        $_downloadAll() {
            this.$_sendToApi({ organizacionId: this.entity.organizacionId }, 1);
        },

        $_setParams() {
            this.extraParams = [];
            this.entity.organizacionId &&
                this.extraParams.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });

            this.entity.departamentoId &&
                this.extraParams.push({
                    name: 'departamentoId',
                    value: this.entity.departamentoId,
                });

            this.search++;
        },

        $_clean() {
            this.extraParams = undefined;
            this.entity = this.$_Object();
            this.$_forceUpdateComponente();
        },

        $_reviewUserDetails(row) {
            console.log(row.selected.id);
            this.$router.push({
                name: 'BUOPDAUserDetailsReportViewComponent',
                params: row && { Id: row?.selected?.id },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Generador de Reporte Buo-PDA">
        <div slot="card-text">
            <v-row dense>
                <v-col cols="12" md="6">
                    <BaseForm
                        :block="$vuetify.breakpoint.mobile"
                        labelBtn="Buscar"
                        :method="$_setParams"
                        lblCancel="Limpiar"
                        :cancel="$_clean"
                    >
                        <div slot="body">
                            <v-row dense>
                                <v-col cols="12">
                                    <p
                                        class="BUO-Paragraph-Large-SemiBold grey700--text"
                                    >
                                        Seleccione la empresa
                                    </p>
                                    <BaseInputDataTable
                                        label="Empresa"
                                        :setting="companySetting"
                                        v-model.number="entity.organizacionId"
                                        :key="componentKey"
                                        :validate="['requiered']"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <BaseInputTreeview
                                        :key="componentKey"
                                        label="Área / Departamento"
                                        v-model.number="entity.departamentoId"
                                        :readonly="!entity.organizacionId"
                                        itemText="nombre"
                                        itemChildren="subDepartamentos"
                                        :endpoint="`departamento/findAllTree/${entity.organizacionId}`"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </BaseForm>
                </v-col>
            </v-row>
        </div>
        <div slot="body">
            <BaseServerDataTable
                ref="UserFilter"
                :key="search"
                :setting="setting"
                :extraParams="extraParams"
                :fnDoubleClick="$_reviewUserDetails"
                v-if="entity.organizacionId && extraParams"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Descargar"
                        :fnMethod="$_downloadMultipleFiles"
                        icon="mdi-download"
                        :loading="loading[0].value"
                    />

                    <BaseCustomsButtonsGrid
                        label="Descargar todo"
                        :outlined="false"
                        :fnMethod="$_downloadAll"
                        icon="mdi-download-multiple"
                        :loading="loading[1].value"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
