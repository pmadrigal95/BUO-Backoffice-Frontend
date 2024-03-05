<script>
/**
 * Descripción: Pantalla  ManagersGrowthChartComponent
 *
 * @displayName ManagersGrowthChartComponent
 *
 */

const BasePieChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/pieChart/BasePieChartViewComponent'
    );

export default {
    name: 'ManagersGrowthChartComponent',

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
        title="Managers y su porcentaje de crecimiento"
        :chartData="chartData"
    />
</template>
