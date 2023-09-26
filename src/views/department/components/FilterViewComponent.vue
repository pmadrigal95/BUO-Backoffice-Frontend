<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentFilterViewComponent
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

export default {
    name: 'FilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('DepartmentFilter');
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'DepartmentViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                }),
            });
        },

        setting() {
            return baseFilterSettingsHelper.$_setDepartmentSetting({
                companyId: this.user.companyId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setDepartmentColumns({
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
                    'departamento/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
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
        $_Editor(params) {
            this.$router.push({
                name: 'DepartmentEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        :key="key"
        v-if="setting"
        :ref="pageView"
        :pageView="pageView"
        :setting="setting"
        :extraParams="extraParams"
        :fnResetConfig="$_setFilter"
        :fnNew="write ? $_Editor : undefined"
        :fnEdit="write ? $_Editor : undefined"
        :fnDelete="write ? $_fnDelete : undefined"
    />
    <BaseSkeletonLoader v-else type="table" />
</template>
