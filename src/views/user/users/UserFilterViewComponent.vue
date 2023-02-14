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
        empresa: {
            type: Number,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    computed: {
        ...mapGetters('authentication', ['user']),

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
                ],
                key: 'id',
            };
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                this.$router.currentRoute.meta.module,
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    created() {
        //alert(this.empresa);
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

        /**
         * Pantalla Editor
         */
        $_userEditor(params) {
            this.$router.push({
                name: 'UserEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },

        /**
         * Pantalla Carga Masiva
         */
        $_fnLoad() {
            this.$router.push({ name: 'UserBulkLoadViewComponent' });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Usuarios">
        <div slot="card-text">
            <BaseServerDataTable
                ref="UserFilter"
                :setting="setting"
                :fnNew="write ? $_userEditor : undefined"
                :fnEdit="write ? $_userEditor : undefined"
                :fnDelete="write ? $_fnDesactiveUser : undefined"
            >
                /** * TODO: pendiente permiso de seguridad*/
                <div slot="btns">
                    <BaseCustomsButtonsGrid
                        label="Carga Masiva"
                        :fnMethod="$_fnLoad"
                        icon="mdi-table-arrow-up"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
