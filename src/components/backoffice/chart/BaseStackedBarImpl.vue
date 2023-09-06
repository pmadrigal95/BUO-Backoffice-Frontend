<script>
/**
 * Descripción: Grafico Stacked Bar reutilizable
 *
 * @displayName BaseStackedBarImpl
 */

// import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BaseBarChart = () => import('@/components/core/charts/BaseBarChart');

export default {
    name: 'BaseStackedBarImpl',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseBarChart,
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                    },
                },
            };
        },
    },
};
</script>

<template>
    <BaseBarChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
