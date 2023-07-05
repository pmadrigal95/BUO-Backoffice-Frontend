<script>
/**
 * Descripción: Pantalla Filtro Assessments
 *
 * @displayName AssessmentFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'AssessmentFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'CategoryViewComponent',
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
            return baseFilterSettingsHelper.$_setAssessmentTypeSetting({
                companyId: this.user.companyId,
            });
        },
    },

    methods: {
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
                        this.$refs.Filter.$_ParamsToAPI();
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
    <BaseCardViewComponent title="Assessments">
        <div slot="card-text">
            <BaseServerDataTable
                ref="Filter"
                :setting="setting"
                :extraParams="extraParams"
                :fnNew="write ? $_Editor : undefined"
                :fnEdit="write ? $_Editor : undefined"
                :fnDelete="write ? $_fnDelete : undefined"
            />
        </div>
    </BaseCardViewComponent>
</template>
