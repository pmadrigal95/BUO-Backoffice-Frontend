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

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'DepartureUsersFilterViewComponent',

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
                'AssessmentTypeViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        extraParams() {
            return this.user.companyId != this.buoId
                ? baseFilterSettingsHelper.$_setExtraParams({
                      companyId: this.user.companyId,
                  })
                : undefined;
        },

        setting() {
            return baseFilterSettingsHelper.$_setDepartureUsersSetting({
                companyId: this.user.companyId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
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
         * Body Request
         */
        $_createBodyRequestDelete(row) {
            return {
                userId: this.user.userId,
                id: row[0].id,
            };
        },
        /**
         * Delete Function
         */
        $_fnDelete(row) {
            httpService
                .post(
                    '/tipoPrueba/deactivate',
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
        $_Editor(params) {
            this.$router.push({
                name: 'DepartureUsersEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Salida de colaboradores">
        <div slot="card-text">
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
            />
            <BaseSkeletonLoader v-else type="table" />
        </div>
    </BaseCardViewComponent>
</template>
