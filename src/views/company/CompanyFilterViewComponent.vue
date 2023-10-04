<script>
/**
 * Descripción: Pantalla Filtro Empresas
 *
 * @displayName CompanyFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'CompanyFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('CompanyFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return this.filtersBypageView(this.pageView);
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'CompanyViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        actions() {
            return [
                {
                    icon: 'chevron-right',
                    title: 'Ver más',
                    fn: this.$_companyDashboard,
                    show: true,
                },
                {
                    icon: 'shield-key-outline',
                    title: 'Reset Sign Up Code',
                    fn: this.$_replaceSignUpCode,
                    show: true,
                },
            ];
        },
    },

    created() {
        if (this.user.companyId != this.buoId) {
            this.$router.push({
                name: 'CompanyDashboardViewComponent',
                params: { Id: this.user.companyId },
            });
        }

        this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]:
                        baseFilterSettingsHelper.$_setCompanySetting({}),
                });
                this.key++;
            }
        },

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
                        this.$refs[this.pageView].$_ParamsToAPI();
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
            return this.$refs[this.pageView].$data.selected;
        },

        /**
         * Pantalla Editor
         */
        $_companyDashboard() {
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

        /**
         * New Code
         */
        $_replaceSignUpCode() {
            if (this.$_GetRow().length > 0) {
                httpService
                    .post('organizacion/replaceSignUpCode', {
                        organizacionId: this.$_GetRow()[0].id,
                    })
                    .then((response) => {
                        if (response != undefined) {
                            this.$refs[this.pageView].$_ParamsToAPI();
                        }
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
                :key="key"
                v-if="setting"
                :ref="pageView"
                :pageView="pageView"
                :setting="setting"
                :fnActions="actions"
                :fnResetConfig="$_setFilter"
                :fnNew="write ? $_companyEditor : undefined"
                :fnEdit="write ? $_companyEditor : undefined"
                :fnDelete="write ? $_fnDesactiveCompany : undefined"
            />
            <BaseSkeletonLoader v-else type="table" />
        </div>
    </BaseCardViewComponent>
</template>
