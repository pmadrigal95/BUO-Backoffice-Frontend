<script>
/**
 * Descripción: Pantalla Filtro Salida de usuarios
 *
 * @displayName DepartureUsersFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'DepartureUsersFilterViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseServerDataTable,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            show: true,
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('DepartureUsersFilter');
        },

        /**
         * TODO : Cambiar permiso por el que corresponde
         */
        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'DepartureUsersViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
            });
        },

        setting() {
            return baseFilterSettingsHelper.$_setDepartureUsersSetting({
                companyId: this.user.companyId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
    },

    created() {
        this.show = this.user.companyId === this.buoId;
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setDepartureUsersColumns({
                pageView: this.pageView,
                companyId: this.user.companyId,
            });
            this.key++;
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
            };
        },

        /**
         * Delete Function
         */
        $_fnDelete(row) {
            httpService
                .delete(`/salidaUsuario/${row[0].id}`)
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
                    }
                });
        },
        /**
         * Pantalla Editor
         */
        $_Editor(params) {
            this.$router.push({
                name: 'DepartureUsersEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Salida de colaboradores">
        <div slot="card-text">
            <BaseAdvancedFilter :show="show" v-model="entity">
                <div slot="body">
                    <BaseServerDataTable
                        v-if="setting"
                        :key="key"
                        :ref="pageView"
                        :pageView="pageView"
                        :setting="setting"
                        :extraParams="extraParams"
                        :fnResetConfig="$_setFilter"
                        :fnNew="write ? $_Editor : undefined"
                        :fnEdit="write ? $_Editor : undefined"
                        :fnDelete="write ? $_fnDelete : undefined"
                        :needExportToExcel="false"
                    >
                        <div slot="btns">
                            <BaseCustomsButtonsGrid
                                v-if="show"
                                label="Filtro Avanzado"
                                :fnMethod="$_showAdvFilter"
                                :outlined="!show"
                                icon="mdi-filter-cog-outline"
                            /></div
                    ></BaseServerDataTable>
                    <BaseSkeletonLoader v-else type="table" />
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
