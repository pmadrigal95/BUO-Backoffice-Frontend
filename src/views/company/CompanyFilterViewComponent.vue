<script>
/**
 * Descripción: Pantalla Filtro Empresas
 *
 * @displayName CompanyFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'CompanyFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
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
                        text: 'Token Colaborador',
                        type: 'number',
                        align: 'start',
                        value: 'tokenUsuario',
                        show: false,
                    },
                    {
                        text: 'Colaboradores',
                        type: 'number',
                        align: 'end',
                        value: 'totalUsuarios',
                        show: true,
                    },
                    {
                        text: 'Wallets Activas',
                        type: 'number',
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
                        type: 'chip',
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

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'CompanyViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    created() {
        if (this.user.companyId != this.buoId) {
            this.$router.push({
                name: 'CompanyDashboardViewComponent',
                params: { Id: this.user.companyId },
            });
        }
    },

    methods: {
        /**
         * Body Request
         */
        $_createBodyRequestDelete(row) {
            const request = {
                userId: this.user.userId,
                id: row[0].id,
            };
            return request;
        },

        /**
         * Desactive Function
         */
        $_fnDesactiveCompany(row) {
            httpService
                .post(
                    'organizacion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.CompanyFilter.$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_companyEditor(params) {
            this.$router.push({
                name: 'CompanyEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.CompanyFilter.$data.selected;
        },

        /**
         * Pantalla Editor
         */
        $_companyDashboard() {
            console.log(this.$_GetRow());
            if (this.$_GetRow().length > 0) {
                this.$router.push({
                    name: 'CompanyDashboardViewComponent',
                    params: { Id: this.$_GetRow()[0].id },
                });
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgRowNotSelected
                );
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Empresas">
        <div slot="card-text">
            <BaseServerDataTable
                ref="CompanyFilter"
                :setting="setting"
                :fnNew="write ? $_companyEditor : undefined"
                :fnEdit="write ? $_companyEditor : undefined"
                :fnDelete="write ? $_fnDesactiveCompany : undefined"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Ver más"
                        :fnMethod="$_companyDashboard"
                        icon="mdi-chevron-right"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
