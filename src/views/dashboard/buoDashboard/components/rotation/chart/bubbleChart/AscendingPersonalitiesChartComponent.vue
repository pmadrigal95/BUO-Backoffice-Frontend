<script>
/**
 * Descripción: Pantalla  AscendingPersonalitiesChartComponent
 *
 * @displayName AscendingPersonalitiesChartComponent
 *
 */

const BasePieBubbleChartViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/chart/MixChart/BasePieBubbleChartViewComponent'
    );

export default {
    name: 'AscendingPersonalitiesChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BasePieBubbleChartViewComponent,
    },
};
</script>

<template>
    <BasePieBubbleChartViewComponent
        title="Personalidades con más ascensos"
        :chartData="chartData"
        isPDA
        isPie
    />
</template>
