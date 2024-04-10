<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDisplay from '@/views/dashboard/components/shared/row-display/container-display';

const StatisticalGrowthCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/card/StatisticalGrowthCardsViewComponent'
    );

const MixAiInsightGrowthViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/insight/MixAiInsightGrowthViewComponent'
    );

const HistoricalGrowthChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/linealChart/HistoricalGrowthChartComponent'
    );

const GrowthViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/progressLinearChart/GrowthViewComponent'
    );

const TenureGrowthViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/progressLinearChart/TenureGrowthViewComponent'
    );

const ManagersGrowthChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/pieChart/ManagersGrowthChartComponent'
    );

const GrowingPersonalitiesChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/bubbleChart/GrowingPersonalitiesChartComponent'
    );

export default {
    name: 'ContainerViewComponent',

    props: {
        type: {
            type: String,
            default: 'growth',
        },
    },

    components: {
        StatisticalGrowthCardsViewComponent,
        MixAiInsightGrowthViewComponent,
        HistoricalGrowthChartComponent,
        GrowthViewComponent,
        TenureGrowthViewComponent,
        ManagersGrowthChartComponent,
        GrowingPersonalitiesChartComponent,
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
            <StatisticalGrowthCardsViewComponent :chartData="entity.cardList" />
        </v-col>

        <v-col cols="12" v-if="entity?.insights || entity?.aiDrivenInsights">
            <MixAiInsightGrowthViewComponent
                :insights="entity.insights"
                :aiDrivenInsights="entity.aiDrivenInsights"
            />
        </v-col>

        <v-col cols="12" v-if="entity.historicUser">
            <HistoricalGrowthChartComponent :chartData="entity.historicUser" />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.tenureGrowth)"
            v-if="entity.departmentGrowth && entity.departmentGrowth.length > 0"
        >
            <GrowthViewComponent :chartData="entity.departmentGrowth" />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.departmentGrowth)"
            v-if="entity.tenureGrowth && entity.tenureGrowth.length > 0"
        >
            <TenureGrowthViewComponent :chartData="entity.tenureGrowth" />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.personalities)"
            v-if="entity.managersPie"
        >
            <ManagersGrowthChartComponent :chartData="entity.managersPie" />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.managersPie)"
            v-if="entity.personalities"
        >
            <GrowingPersonalitiesChartComponent
                :chartData="entity.personalities"
            />
        </v-col>
    </v-row>
</template>
