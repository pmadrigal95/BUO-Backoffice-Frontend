<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const RadarViewComponent = () =>
    import('@/views/b2b/filter/common/graph/RadarViewComponent');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/AssessmentViewComponent');

const ScaleHelperViewComponent = () =>
    import('@/views/b2b/filter/common/display/ScaleHelperViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        RadarViewComponent,
        AssessmentViewComponent,
        ScaleHelperViewComponent,
    },

    data() {
        return {
            assessment: {},
            usuarioIdList: undefined,
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user']),

        setting() {
            return baseFilterSettingsHelper.$_setDinamycTalentSetting({
                departmentId: this.entity.departamentoId,
                singleSelect: false,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
                qualificationId:
                    this.entity.indicatorId &&
                    this.entity.indicatorId.join('|'),
            });
        },
    },

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.filter.$data.selected;
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
                    this.usuarioIdList = row.map(
                        (element) => element.usuarioId
                    );
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
                    this.entity.userId = row[0].usuarioId;
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

        $_setAssessmentByType(type) {
            this.assessment = {};
            this.assessment = baseAssessmentHelper.$_setAssessmentByType({
                type,
                key: 'usuarioId',
                userName: 'nombreEmpleado',
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.entity.organizacionId,
            });
        },
    },
};
</script>

<template>
    <div v-if="entity.indicatorId && entity.companyId">
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    Todos los colaboradores
                </section>
            </v-col>
        </v-row>
        <ScaleHelperViewComponent />
        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_viewProfile"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3">
                    <BaseCustomsButtonsGrid
                        label="Ver Perfil"
                        :fnMethod="$_viewProfile"
                        icon="mdi-account-search"
                        :color="app ? 'blueProgress600' : 'blue900'"
                    />

                    <AssessmentViewComponent
                        :entity="assessment"
                        :organizacionId="entity.organizacionId"
                        :fn="$_setAssessmentByType"
                    />

                    <BaseCustomsButtonsGrid
                        label="Comparar PDA"
                        :outlined="false"
                        :fnMethod="$_userDetails"
                        icon="mdi-account-group-outline"
                    />
                </v-row>
            </div>
        </BaseServerDataTable>

        <RadarViewComponent
            :key="componentKey"
            :usuarioIdList="usuarioIdList"
            v-if="usuarioIdList && usuarioIdList.length > 0"
        />
    </div>
</template>
