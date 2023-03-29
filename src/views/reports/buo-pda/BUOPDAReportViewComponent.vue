<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName BUOPDAReportViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService.js';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

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
            componentKey: 0,
            componentGrid: 0,
            show: false,
            loading: [{ value: false }, { value: false }],
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

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
                        show: true,
                    },
                    {
                        text: 'Correo Contacto',
                        align: 'start',
                        value: 'correoContacto',
                        show: true,
                    },
                    {
                        text: 'Token Colaborador',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Colaboradores',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: false,
                    },
                    {
                        text: 'Wallets Activas',
                        align: 'end',
                        value: 'walletsActivas',
                        show: false,
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
                endpoint: this.entity.departamentoId
                    ? `user/findByDeep/${this.entity.departamentoId}`
                    : 'user/findBy',
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
                        text: 'Test PDA',
                        type: 'bool',
                        align: 'center',
                        value: 'conPda',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        type: 'chip',
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
                        show: this.user.companyId === this.buoId,
                    },
                    {
                        text: 'Área / Departamento',
                        align: 'start',
                        value: 'nombreDepartamento',
                        show: this.entity.departamentoId != undefined,
                    },
                ],
                key: 'id',
                singleSelect: false,
            };
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'BUOPDAReportViewComponent',
                baseSecurityHelper.$_download
            );
            return result;
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.entity.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });
            }

            return array.length > 0 ? array : undefined;
        },
    },

    created() {
        this.entity.organizacionId = this.user.companyId;
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        'entity.organizacionId': {
            handler(newValue, oldValue) {
                if (oldValue) {
                    this.entity.departamentoId = undefined;
                }
            },
            immediate: true,
        },
    },

    methods: {
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
                        if (response.data == '') {
                            baseNotificationsHelper.Message(
                                true,
                                'Solo se podra generar el reporte de aquellos usuarios que cuenten con el test PDA'
                            );
                        } else {
                            baseFnFile.$_dowloadFile(
                                response.data.fileEncoded,
                                response.data.fileName,
                                baseFnFile.$_extensionsName.zip
                            );
                        }

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
            this.$_GetRow().forEach(
                (element) =>
                    element.conPda && data.push(element[this.setting.key])
            );

            if (
                this.$_GetRow().length > 0 &&
                this.$_GetRow().some((element) => element.conPda === false)
            ) {
                baseNotificationsHelper.Message(
                    true,
                    'Solo se podra generar el reporte de aquellos usuarios que cuenten con el test PDA'
                );
            }

            if (data != undefined && data.length > 0) {
                this.$_sendToApi(
                    {
                        organizacionId: this.entity.organizacionId,
                        empleados: data,
                    },
                    0
                );
            } else {
                if (this.$_GetRow().length <= 0)
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
            this.$refs.UserFilter.$_ParamsToAPI();
            this.componentGrid++;
        },

        $_clean() {
            this.entity.organizacionId = this.user.companyId;
            this.entity.companyName = this.user.companyName;
            this.entity.departamentoId = null;
            this.componentKey++;
            this.$_setParams();
        },

        $_userDetails(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    if (row[0].conPda) {
                        this.$router.push({
                            name: 'BUOPDAUserDetailsReportViewComponent',
                            params: row && { Id: row[0].id },
                        });
                    } else {
                        baseNotificationsHelper.Message(
                            true,
                            'Usuario no cuenta con test PDA'
                        );
                    }
                    break;
                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },

        $_showAdvFilter() {
            this.show = !this.show;

            if (this.show) {
                if (this.user.companyId != this.buoId) {
                    this.entity.organizacionId = this.user.companyId;
                }
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Generador de Reporte Buo-PDA">
        <div slot="card-text" v-show="show">
            <v-row dense>
                <v-col cols="12" md="6">
                    <BaseForm
                        :block="$vuetify.breakpoint.mobile"
                        labelBtn="Buscar"
                        :method="$_setParams"
                    >
                        <div slot="body">
                            <v-row dense>
                                <v-col cols="12">
                                    <p
                                        class="BUO-Paragraph-Large-SemiBold grey700--text"
                                    >
                                        Seleccione la
                                        {{
                                            user.companyId === buoId
                                                ? 'empresa'
                                                : 'departamento'
                                        }}
                                    </p>
                                    <BaseInputDataTable
                                        v-if="user.companyId === buoId"
                                        :key="componentKey"
                                        label="Empresa"
                                        :setting="companySetting"
                                        :editText="entity.companyName"
                                        v-model="entity.organizacionId"
                                        :validate="['requiered']"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <BaseInputTreeview
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
                        <div slot="Beforebtns">
                            <v-btn
                                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                                elevation="0"
                                large
                                outlined
                                color="primary"
                                @click="$_clean"
                            >
                                Limpiar
                            </v-btn>
                        </div>
                    </BaseForm>
                </v-col>
            </v-row>
        </div>
        <div slot="body">
            <BaseServerDataTable
                ref="UserFilter"
                :key="componentGrid"
                :setting="setting"
                :extraParams="extraParams"
                :fnDoubleClick="$_userDetails"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Ver Reporte"
                        :fnMethod="$_userDetails"
                        icon="mdi-chevron-right"
                    />

                    <BaseCustomsButtonsGrid
                        v-if="permission"
                        label="Descargar"
                        :fnMethod="$_downloadMultipleFiles"
                        icon="mdi-download"
                        :loading="loading[0].value"
                    />

                    <BaseCustomsButtonsGrid
                        v-if="permission"
                        label="Descargar todo"
                        :outlined="false"
                        :fnMethod="$_downloadAll"
                        icon="mdi-download-multiple"
                        :loading="loading[1].value"
                    />

                    <BaseCustomsButtonsGrid
                        label="Filtro Avanzado"
                        :fnMethod="$_showAdvFilter"
                        :outlined="!show"
                        icon="mdi-filter-cog-outline"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
