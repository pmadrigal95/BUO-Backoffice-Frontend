<script>
/**
 * Descripción: Pantalla  EmployeeDeparturesChartComponent
 *
 * @displayName EmployeeDeparturesChartComponent
 *
 */

const BasePieBubbleChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/MixChart/BasePieBubbleChartViewComponent'
    );

export default {
    name: 'EmployeeDeparturesChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: { BasePieBubbleChartViewComponent },
};
</script>

<template>
    <BasePieBubbleChartViewComponent
        title="% y número de salidas de colaboradores"
        :chartData="chartData"
        :showLegend="true"
        isPie
    />
</template>
