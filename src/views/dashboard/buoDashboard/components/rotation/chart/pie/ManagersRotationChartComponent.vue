<script>
/**
 * Descripción: Pantalla  ManagersRotationChartComponent
 *
 * @displayName ManagersRotationChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/pieChart/BasePieChartViewComponent'
    );

export default {
    name: 'ManagersRotationChartComponent',

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
        title="Managers y su porcentaje de rotación"
        :chartData="chartData"
    />
</template>
