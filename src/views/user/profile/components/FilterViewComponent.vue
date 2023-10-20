<script>
/**
 * Descripción: Pantalla Filtro Perfiles
 *
 * @displayName ProfileFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/assessment/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const RadarViewComponent = () =>
    import('@/views/b2b/filter/common/graph/RadarViewComponent');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/assessment/AssessmentViewComponent');

export default {
    name: 'ProfileFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        RadarViewComponent,
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        AssessmentViewComponent,
    },

    data() {
        return {
            assessment: {},
            usuarioIdList: undefined,
            componentKey: 0,
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('ProfileFilter');
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        assessmentPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                baseSecurityHelper.$_assessment
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.user.companyId,
                departmentId: this.entity.departmentId,
                pageView: this.pageView,
            });
            this.key++;
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_viewProfile(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.entity.userId = row[0].id;
                    this.entity.step = 1;
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },

        $_userDetails(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0 && row.length < 4:
                    this.usuarioIdList = row.map((element) => element.id);
                    this.componentKey++;
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        'Puedes seleccionar hasta un máximo de tres colaboradores.'
                    );
                    break;
            }
        },

        $_setAssessmentByType(type) {
            this.assessment = {};
            this.assessment = baseAssessmentHelper.$_setAssessmentByType({
                type,
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.entity.companyId,
            });
        },
    },
};
</script>

<template>
    <section>
        <BaseServerDataTable
            :key="key"
            v-if="setting"
            :ref="pageView"
            :pageView="pageView"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_viewProfile"
            :fnResetConfig="$_setFilter"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3">
                    <BaseCustomsButtonsGrid
                        label="Ver Perfil"
                        :fnMethod="$_viewProfile"
                        icon="mdi-chevron-right"
                        :color="app ? 'blueProgress600' : 'blue900'"
                    />
                    <BaseCustomsButtonsGrid
                        label="Comparar PDA"
                        :outlined="false"
                        :fnMethod="$_userDetails"
                        icon="mdi-account-group-outline"
                    />

                    <AssessmentViewComponent
                        v-if="assessmentPermission"
                        :entity="assessment"
                        :organizacionId="entity.companyId"
                        :fn="$_setAssessmentByType"
                    />
                </v-row>
            </div>
        </BaseServerDataTable>
        <BaseSkeletonLoader v-else type="table" />

        <RadarViewComponent
            :key="componentKey"
            :usuarioIdList="usuarioIdList"
            v-if="usuarioIdList && usuarioIdList.length > 0"
        />
    </section>
</template>
