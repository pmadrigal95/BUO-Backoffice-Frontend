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

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

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
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setCompanySetting({});
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
                        :color="app ? 'blueProgress600' : 'blue900'"
                    />
                </div>
            </BaseServerDataTable>
        </div>
    </BaseCardViewComponent>
</template>
