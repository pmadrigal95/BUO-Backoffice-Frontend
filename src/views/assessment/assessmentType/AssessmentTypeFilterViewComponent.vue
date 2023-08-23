<script>
/**
 * Descripción: Pantalla Filtro Tipo de Assessments
 *
 * @displayName AssessmentTypeFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'AssessmentTypeFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('AssessmentTypeFilter');
        },

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
                        baseFilterSettingsHelper.$_setAssessmentTypeSetting({
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
                name: 'AssessmentTypeEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Tipos de assessments">
        <div slot="card-text">
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
        </div>
    </BaseCardViewComponent>
</template>
