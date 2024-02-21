<script>
/**
 * Descripción: Pantalla  ExitInterviewsChartComponent
 *
 * @displayName ExitInterviewsChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/pieChart/BasePieChartViewComponent'
    );

export default {
    name: 'ExitInterviewsChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: { BasePieChartViewComponent },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Entrevistas de salida"
        :chartData="chartData"
    />
</template>
