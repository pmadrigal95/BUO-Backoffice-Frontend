<script>
/**
 * Descripción: Pantalla  AscendingPersonalitiesChartComponent
 *
 * @displayName AscendingPersonalitiesChartComponent
 *
 */

const BasePieBubbleChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/MixChart/BasePieBubbleChartViewComponent'
    );

export default {
    name: 'AscendingPersonalitiesChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
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
        :innerWidth="innerWidth"
    />
</template>
