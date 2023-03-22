<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

export default {
    name: 'UserFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

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
                        show: true,
                    },
                    {
                        text: 'Test PDA',
                        type: 'bool',
                        align: 'center',
                        value: 'conPda',
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
            };
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'UserViewComponent',
                [baseSecurityHelper.$_write, baseSecurityHelper.$_upload]
            );
            return result;
        },

        extraParams() {
            let array = [];
            if (this.user.companyId != this.buoId && !this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.user.companyId,
                });
            } else if (this.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.organizacionId,
                });
            }

            return array.length > 0 ? array : undefined;
        },
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
        $_fnDesactiveUser(row) {
            httpService
                .post('user/deactivate', this.$_createBodyRequestDelete(row))
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.UserFilter.$_ParamsToAPI();
                    }
                });
        },

        $_setQuery() {
            if (this.organizacionId) {
                return {
                    organizacionId: this.organizacionId
                        ? this.organizacionId
                        : undefined,
                };
            }

            return undefined;
        },

        /**
         * Pantalla Editor
         */
        $_userEditor(params) {
            this.$router.push({
                name: 'UserEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },

        /**
         * Pantalla Carga Masiva
         */
        $_fnLoad() {
            this.$router.push({
                name: 'UserBulkLoadViewComponent',
                query: this.$_setQuery(),
            });
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        v-if="organizacionId"
        ref="UserFilter"
        :setting="setting"
        :extraParams="extraParams"
        :fnNew="permission?.Write ? $_userEditor : undefined"
        :fnEdit="permission?.Write ? $_userEditor : undefined"
        :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
    >
        <div slot="btns">
            <BaseCustomsButtonsGrid
                v-if="permission?.Upload"
                label="Carga Masiva"
                :fnMethod="$_fnLoad"
                icon="mdi-table-arrow-up"
            />
        </div>
    </BaseServerDataTable>
    <BaseCardViewComponent title="Colaboradores" v-else>
        <div slot="card-text">
            <BaseServerDataTable
                ref="UserFilter"
                :setting="setting"
                :extraParams="extraParams"
                :fnNew="permission?.Write ? $_userEditor : undefined"
                :fnEdit="permission?.Write ? $_userEditor : undefined"
                :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
            >
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        v-if="permission?.Upload"
                        label="Carga Masiva"
                        :fnMethod="$_fnLoad"
                        icon="mdi-table-arrow-up"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
