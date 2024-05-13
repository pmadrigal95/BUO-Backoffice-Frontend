<script>
/**
 * Descripción: Pantalla  DisplayViewComponent
 *
 * @displayName DisplayViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDisplay from '@/views/dashboard/components/shared/row-display/container-display';

const OpenVacantListViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/OpenVacantListViewComponent'
    );

const StatisticalRecruitmentCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/StatisticalRecruitmentCardsViewComponent'
    );

const HistoricalRecruitmentChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/chart/linealChart/HistoricalRecruitmentChartComponent'
    );

const RecruitmentProgressLinearViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/chart/progressLinearChart/RecruitmentProgressLinearViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    props: {
        type: {
            type: String,
            default: 'recruitment',
        },

        settings: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        OpenVacantListViewComponent,
        StatisticalRecruitmentCardsViewComponent,
        HistoricalRecruitmentChartComponent,
        RecruitmentProgressLinearViewComponent,
    },

    computed: {
        ...mapGetters('dashboard', ['dashboardById']),

        entity() {
            return this.dashboardById(this.type);
        },
    },

    methods: {
        md(nextColumn) {
            return baseDisplay.$_setLayout(nextColumn);
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" v-if="entity.cardList && entity.cardList.length > 0">
            <StatisticalRecruitmentCardsViewComponent
                :chartData="entity.cardList"
            />
        </v-col>

        <v-col cols="12" v-if="entity.historicUser">
            <HistoricalRecruitmentChartComponent
                :chartData="entity.historicUser"
            />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.departmentGrowth)"
            v-if="entity.positionGrowth && entity.perks.positionGrowth > 0"
        >
            <RecruitmentProgressLinearViewComponent
                title="Puesto con mayor índice de rotación"
                :chartData="entity.positionGrowth"
            />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.positionGrowth)"
            v-if="entity.departmentGrowth && entity.departmentGrowth.length > 0"
        >
            <RecruitmentProgressLinearViewComponent
                title="Departamentos con mayor índice de rotación"
                :chartData="entity.departmentGrowth"
            />
        </v-col>

        <v-col
            cols="12"
            v-if="entity.openPositions && entity.openPositions.length > 0"
        >
            <OpenVacantListViewComponent
                :cardList="entity.openPositions"
                :settings="settings"
            />
        </v-col>
    </v-row>
</template>
