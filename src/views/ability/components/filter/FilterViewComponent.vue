<script>
/**
 * Descripción: Pantalla Filtro Habilidades
 *
 * @displayName AbilityFilterViewComponent
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

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'AbilityFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseAdvancedFilter,
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            filterCompanyKey: 0,
            show: true,
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('AbilityFilter');
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                    filterCompanyId: this.entity.companyId,
                }),
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                categoryId: this.entity.categoryId,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setAbilityColumns({
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
                companyId: null,
                categoryId: null,
            };
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
         * Delete Function
         */
        $_delete(row) {
            httpService
                .post(
                    'cualificacion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$_setParams();
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
        $_editor(params) {
            this.$router.push({
                name: 'AbilityEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },

        $_setParams() {
            this.$refs[this.pageView].$_ParamsToAPI();
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseAdvancedFilter
        :show="show"
        isIndicatorCategory
        v-model="entity"
        :requiredCompany="false"
    >
        <div slot="body">
            <section class="pt-6">
                <BaseSkeletonLoader v-if="!user && !buoId" type="list-item" />
                <BaseServerDataTable
                    :key="key"
                    v-else-if="setting"
                    :ref="pageView"
                    :pageView="pageView"
                    :setting="setting"
                    :extraParams="extraParams"
                    :fnResetConfig="$_setFilter"
                    :fnNew="write ? $_editor : undefined"
                    :fnEdit="write ? $_editor : undefined"
                    :fnDelete="write ? $_delete : undefined"
                >
                    <div slot="btns">
                        <BaseCustomsButtonsGrid
                            label="Filtro Avanzado"
                            :fnMethod="$_showAdvFilter"
                            :outlined="!show"
                            icon="mdi-filter-cog-outline"
                        />
                    </div>
                </BaseServerDataTable>
            </section>
        </div>
    </BaseAdvancedFilter>
</template>
