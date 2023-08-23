<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

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
            return this.filtersBypageView(this.pageView);
        },
    },

    created() {
        this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]:
                        baseFilterSettingsHelper.$_setDepartmentSetting({
                            companyId: this.user.companyId,
                        }),
                });
            }
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
        v-if="setting"
        :ref="pageView"
        :pageView="pageView"
        :setting="setting"
        :extraParams="extraParams"
        :fnNew="write ? $_Editor : undefined"
        :fnEdit="write ? $_Editor : undefined"
        :fnDelete="write ? $_fnDelete : undefined"
    />
    <BaseSkeletonLoader v-else type="table" />
</template>
