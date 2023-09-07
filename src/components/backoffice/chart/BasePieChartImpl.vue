<script>
/**
 * Descripción: Grafico Pie reutilizable
 *
 * @displayName BasePieChartImpl
 */

// import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BasePieChart = () => import('@/components/core/charts/BasePieChart');

export default {
    name: 'BasePieChartImpl',

    props: {
        chartData: {
            type: Object,
            required: true,
        },

        chartOptions: {
            type: Object,
            default: () => {},
        },
    },

    components: {
        BasePieChart,
    },
};
</script>

<template>
    <BasePieChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
