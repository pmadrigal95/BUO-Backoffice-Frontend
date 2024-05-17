<script>
/**
 * Descripción: Pantalla Filtro Vacante
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */
import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const CandidateInfoModalViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/modal/CandidateInfoModalViewComponent'
    );

const BaseMsgConfirmActionPopUpViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/modal/BaseMsgConfirmActionPopUpViewComponent'
    );

export default {
    name: 'FilterViewComponent',

    props: {
        /**
         * Status code of ability
         */
        statusCode: {
            type: [Number, String],
            default: undefined,
        },

        vacancyId: {
            type: [Number, String],
            requiered: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        CandidateInfoModalViewComponent,
        BaseMsgConfirmActionPopUpViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['filter']),

        candidates() {
            return baseConfigHelper.$_statusCode.active;
        },

        selectedCandidates() {
            return baseConfigHelper.$_statusCode.selectedCandidates;
        },

        rejectedCandidates() {
            return baseConfigHelper.$_statusCode.rejectedCandidates;
        },

        setting() {
            return baseFilterSettingsHelper.$_setDinamycRecruitmentVacantSetting(
                {
                    singleSelect: false,
                }
            );
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.filter?.companyId,
                departmentId: this.filter?.departmentId
                    ? this.filter?.departmentId
                    : 0,
                date: this.filter?.month
                    ? `${this.filter?.month}-01T00:00:00`
                    : undefined,
                vacancyId: this.vacancyId,
                statusId: this.statusCode,
            });
        },
    },

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs['filter'].$data.selected;
        },

        $_refreshGrid() {
            // this.$refs['filter'].$_ParamsToAPI();
            this.callback();
        },

        $_compare(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0 && row.length < 3:
                    this.$_openCandidateInfoModalViewComponent(
                        row.map((element) => {
                            return {
                                id: element.id,
                                name: element.nombreCandidato,
                                email: element.correo,
                                coincidence:
                                    element.coincidence &&
                                    element.coincidence.length > 0
                                        ? element.coincidence.map((item) => {
                                              return {
                                                  title: item.title,
                                                  type: item.type,
                                                  value: item.value
                                                      ? item.value.substring(
                                                            0,
                                                            item.value.length -
                                                                1
                                                        )
                                                      : 0,
                                              };
                                          })
                                        : element.coincidence,
                                education: element.education,
                                workExp: element.workExp,
                                psychometric: element.psychometric,
                                statusCode: element.estadoId,
                            };
                        })
                    );
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        'Puedes seleccionar hasta un máximo de dos candidatos.'
                    );
                    break;
            }
        },

        $_openCandidateInfoModalViewComponent(array) {
            this.$refs['CandidateInfoModal'].$_setData(array);
        },

        $_selectCandidate(params, statusId) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.$_openMsgConfirmActionPopUpViewComponent(
                        row[0],
                        statusId
                    );
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },

        $_openMsgConfirmActionPopUpViewComponent(item, statusId) {
            this.$refs['MsgConfirmActionPopUp'].$_setData({
                title:
                    statusId == this.rejectedCandidates
                        ? 'Rechazar'
                        : 'Seleccionar',
                statusId: statusId,
                name: item.nombreCandidato,
                id: item.id,
            });
        },

        $_setCandidate(params) {
            this.$_selectCandidate(params, this.selectedCandidates);
        },

        $_rejectCandidate(params) {
            this.$_selectCandidate(params, this.rejectedCandidates);
        },

        empty() {},
    },
};
</script>

<template>
    <section>
        <CandidateInfoModalViewComponent
            ref="CandidateInfoModal"
            :callback="$_refreshGrid"
        />

        <BaseMsgConfirmActionPopUpViewComponent
            ref="MsgConfirmActionPopUp"
            :callback="$_refreshGrid"
        />

        <BaseServerDataTable
            ref="filter"
            v-if="setting"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_compare"
        >
            <div slot="btns">
                <!--TODO: Cambiar valores-->
                <BaseCustomsButtonsGrid
                    label="Descargar reporte"
                    :fnMethod="empty"
                    icon="mdi-download"
                    :color="app ? 'blueProgress600' : 'blue800'"
                    disabled
                />

                <BaseCustomsButtonsGrid
                    label="Comparar"
                    :fnMethod="$_compare"
                    icon="mdi-select-compare"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />

                <BaseCustomsButtonsGrid
                    v-if="
                        statusCode == candidates ||
                        statusCode == selectedCandidates
                    "
                    label="Rechazar"
                    :fnMethod="$_rejectCandidate"
                    icon="mdi-close"
                    color="redError900"
                />

                <BaseCustomsButtonsGrid
                    v-if="
                        statusCode == candidates ||
                        statusCode == rejectedCandidates
                    "
                    label="Seleccionar"
                    :fnMethod="$_setCandidate"
                    icon="mdi-check"
                    color="greenB900"
                />
            </div>
        </BaseServerDataTable>
        <BaseSkeletonLoader v-else type="table" />
    </section>
</template>
