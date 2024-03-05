<script>
/**
 * Descripción: Pantalla  GrowingPersonalitiesChartComponent
 *
 * @displayName GrowingPersonalitiesChartComponent
 *
 */

const BasePieBubbleChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/MixChart/BasePieBubbleChartViewComponent'
    );

export default {
    name: 'GrowingPersonalitiesChartComponent',

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
        title="Personalidades con más crecimiento"
        :chartData="chartData"
        isPDA
        isPie
    />
</template>
