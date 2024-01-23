<script>
/**
 * Descripción: Pantalla  HistoricalRotationChartComponent
 *
 * @displayName HistoricalRotationChartComponent
 *
 */

const BaseLinearChartViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/chart/linearChart/BaseLinearChartViewComponent'
    );

export default {
    name: 'HistoricalRotationChartComponent',

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
        title="Histórico de rotación"
        :chartData="chartData"
        :isRound="false"
        :showLegend="false"
    />
</template>
