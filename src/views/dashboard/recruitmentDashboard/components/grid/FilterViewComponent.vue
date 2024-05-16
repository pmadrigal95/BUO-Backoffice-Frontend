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
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        CandidateInfoModalViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('dashboard', ['filter']),

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
                                id: element.usuarioId,
                                name: element.nombreCandidato,
                                email: element.correo,
                                coincidence: element.coincidence,
                                education: element.education,
                                workExp: element.workExp,
                                psychometric: element.psychometric,
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

        empty() {},
    },
};
</script>

<template>
    <section>
        <CandidateInfoModalViewComponent ref="CandidateInfoModal" />
        <BaseServerDataTable
            ref="filter"
            v-if="setting"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_compare"
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    label="Descargar reporte"
                    :fnMethod="empty"
                    icon="mdi-download"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />

                <BaseCustomsButtonsGrid
                    label="Comparar"
                    :fnMethod="$_compare"
                    icon="mdi-select-compare"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />

                <BaseCustomsButtonsGrid
                    v-if="!statusCode || statusCode == selectedCandidates"
                    label="Rechazar"
                    :fnMethod="empty"
                    icon="mdi-close"
                    color="redError900"
                />

                <BaseCustomsButtonsGrid
                    v-if="!statusCode || statusCode == rejectedCandidates"
                    label="Seleccionar"
                    :fnMethod="empty"
                    icon="mdi-check"
                    color="greenB900"
                />
            </div>
        </BaseServerDataTable>
        <BaseSkeletonLoader v-else type="table" />
    </section>
</template>
