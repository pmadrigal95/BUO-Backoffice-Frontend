<script>
/**
 * Descripción: Pantalla Filtro Micro Habilidades
 *
 * @displayName MicroAbilityFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'MicroAbilityFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'competencia/findBy',
                columns: [
                    {
                        text: 'Habilidad',
                        align: 'start',
                        value: 'definicionCualificacion',
                        show: true,
                    },
                    {
                        text: 'Definición',
                        align: 'start',
                        value: 'definicion',
                        show: true,
                    },
                    {
                        text: 'interna',
                        type: 'bool',
                        align: 'center',
                        value: 'esInterna',
                        show: true,
                    },
                    {
                        text: 'Empresa',
                        align: 'start',
                        value: 'nombreOrganizacion',
                        show: true,
                    },
                    {
                        text: 'Estado',
                        align: 'center',
                        value: 'nombreEstado',
                        show: true,
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
         * Delete Function
         */
        $_delete(row) {
            httpService
                .post(
                    'codigoPromocion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.PromotionalCodeFilter.$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_editor(params) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Micro Habilidades">
        <div slot="card-text">
            <BaseServerDataTable
                ref="microAbilityFilter"
                :setting="setting"
                :fnNew="write ? $_editor : undefined"
                :fnEdit="write ? $_editor : undefined"
                :fnDelete="write ? $_delete : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>
