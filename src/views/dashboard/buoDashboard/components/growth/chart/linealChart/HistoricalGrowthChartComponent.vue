<script>
/**
 * Descripción: Pantalla  HistoricalGrowthChartComponent
 *
 * @displayName HistoricalGrowthChartComponent
 *
 */

const BaseLinearChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/linearChart/BaseLinearChartViewComponent'
    );

export default {
    name: 'HistoricalGrowthChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseLinearChartViewComponent,
    },
};
</script>

<template>
    <BaseLinearChartViewComponent
        title="Histórico de crecimiento"
        :chartData="chartData"
        :isRound="false"
        :showLegend="false"
    />
</template>
