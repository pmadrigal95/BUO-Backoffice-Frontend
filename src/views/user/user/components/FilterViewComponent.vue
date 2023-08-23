<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/AssessmentViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        AssessmentViewComponent,
    },

    data() {
        return {
            entity: {},
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('UserFilter');
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                }),
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return this.filtersBypageView(this.pageView);
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'UserViewComponent',
                [baseSecurityHelper.$_write, baseSecurityHelper.$_upload]
            );
            return result;
        },

        assessmentPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                baseSecurityHelper.$_assessment
            );
            return result;
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
                    [this.pageView]: baseFilterSettingsHelper.$_setUserSetting({
                        companyId: this.user.companyId,
                        singleSelect: false,
                    }),
                });
            }
        },

        /**
         * Body Request
         */
        $_createBodyRequestDelete(id) {
            const request = {
                userId: this.user.userId,
                id: id,
            };
            return request;
        },

        /**
         * Desactive Function
         */
        $_fnDesactiveUser(row) {
            row.forEach((element) => {
                httpService
                    .post(
                        'user/deactivate',
                        this.$_createBodyRequestDelete(element.id)
                    )
                    .then((response) => {
                        if (response != undefined) {
                            this.$refs[this.pageView].$_ParamsToAPI();
                        }
                    });
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
        $_userEditor(params) {
            this.$router.push({
                name: 'UserEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },

        /**
         * Pantalla Carga Masiva
         */
        $_fnLoad() {
            this.$router.push({
                name: 'UserBulkLoadViewComponent',
                query: this.$_setQuery(),
            });
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_setAssessmentByType(type) {
            this.entity = {};
            this.entity = baseAssessmentHelper.$_setAssessmentByType({
                type,
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.organizacionId,
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
        :fnNew="permission?.Write ? $_userEditor : undefined"
        :fnEdit="permission?.Write ? $_userEditor : undefined"
        :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <BaseCustomsButtonsGrid
                    v-if="permission?.Upload"
                    label="Carga Masiva"
                    :fnMethod="$_fnLoad"
                    icon="mdi-table-arrow-up"
                    :color="app ? 'blueProgress600' : 'blue900'"
                />

                <AssessmentViewComponent
                    v-if="assessmentPermission"
                    :entity="entity"
                    :organizacionId="organizacionId"
                    :fn="$_setAssessmentByType"
                />
            </v-row>
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
