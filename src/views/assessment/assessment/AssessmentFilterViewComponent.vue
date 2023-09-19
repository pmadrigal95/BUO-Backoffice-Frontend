<script>
/**
 * Descripción: Pantalla Filtro Assessments
 *
 * @displayName AssessmentFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'AssessmentFilterViewComponent',

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
            return this.pageViewById('AssessmentFilter');
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentViewComponent',
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
            // return this.filtersBypageView(this.pageView);
            return baseFilterSettingsHelper.$_setAssessmentSetting({
                companyId: this.user.companyId,
                assessmentTypeId: this.entity.assessmentTypeId,
            });
        },
    },

    created() {
        //TODO: FIX IT
        // this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]:
                        baseFilterSettingsHelper.$_setAssessmentSetting({
                            companyId: this.user.companyId,
                            assessmentTypeId: this.entity.assessmentTypeId,
                        }),
                });
                this.key++;
            }
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                assessmentTypeId: undefined,
            };
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
                .post('/prueba/deactivate', this.$_createBodyRequestDelete(row))
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
                name: 'AssessmentEditorViewComponent',
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
    <BaseCardViewComponent title="Assessments">
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                v-model="entity"
                isAssessmentType
                :requiredCompany="false"
                :title="`Seleccione ${
                    user.companyId === buoId
                        ? 'la empresa'
                        : 'el tipo de assessment'
                }`"
            >
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
                    <BaseSkeletonLoader v-else type="table" />
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
