<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDisplay from '@/views/dashboard/components/shared/businessLogic/container-display';

const StatisticalGrowthCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/card/StatisticalGrowthCardsViewComponent'
    );

const HistoricalGrowthChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/linealChart/HistoricalGrowthChartComponent'
    );

const GrowthViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/progressLinearChart/GrowthViewComponent'
    );

const ReasonsGrowthViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/wordsChart/ReasonsGrowthViewComponent'
    );

const BenefitViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/growth/chart/progressLinearChart/BenefitViewComponent'
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
        HistoricalGrowthChartComponent,
        GrowthViewComponent,
        ReasonsGrowthViewComponent,
        BenefitViewComponent,
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

        <v-col cols="12" v-if="entity.historicUser">
            <HistoricalGrowthChartComponent :chartData="entity.historicUser" />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.reasonProgress)"
            v-if="
                entity.departmentRotation &&
                entity.departmentRotation.length > 0
            "
        >
            <GrowthViewComponent :chartData="entity.departmentRotation" />
        </v-col>

        <v-col
            cols="12"
            :md="
                $vuetify.breakpoint.mobile ? 12 : md(entity.departmentRotation)
            "
            v-if="entity.reasonProgress && entity.reasonProgress.length > 0"
        >
            <ReasonsGrowthViewComponent :chartData="entity.reasonProgress" />
        </v-col>

        <v-col cols="12" v-if="entity.perks && entity.perks.length > 0">
            <BenefitViewComponent :chartData="entity.perks" />
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
