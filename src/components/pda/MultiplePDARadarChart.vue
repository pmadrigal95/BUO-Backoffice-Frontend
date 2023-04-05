<script>
/**
 * Descripción: Grafico Radar PDA reutilizable
 *
 * @displayName MultiplePDARadarChart
 */

const BaseRadarChart = () => import('@/components/core/charts/BaseRadarChart');

export default {
    name: 'MultiplePDARadarChart',

    components: {
        BaseRadarChart,
    },

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        borderJoinStyle: 'round',
                        tension: 0.4,
                    },
                },
                scales: {
                    r: {
                        grid: {
                            circular: true,
                            lineWidth: 5,
                        },
                        beginAtZero: true,
                        ticks: {
                            display: false,
                        },
                        pointLabels: {
                            font: {
                                size: this.$vuetify.breakpoint.smAndDown
                                    ? 10
                                    : 15,
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'chartArea',
                        align: 'start',
                        labels: {
                            padding: 15,
                            font: {
                                size: this.$vuetify.breakpoint.smAndDown
                                    ? 10
                                    : 12,
                            },
                            usePointStyle: true,
                            pointStyle: 'circle',
                        },
                    },
                },
            };
        },
    },
};
</script>

<template>
    <BaseRadarChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
