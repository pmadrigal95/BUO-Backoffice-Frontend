<script>
/**
 * Descripción: Grafico Radar reutilizable
 *
 * @displayName BaseRadarChartImpl
 */

const BaseRadarChart = () => import('@/components/core/charts/BaseRadarChart');

const colorChart = '#b3b5c633';
const darkTheme = '#282828';
const lightTheme = '#fff';

export default {
    name: 'BaseRadarChartImpl',

    components: {
        BaseRadarChart,
    },

    props: {
        chartData: {
            type: Object,
            required: true,
        },

        dark: {
            type: Boolean,
            default: false,
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
                            color: colorChart,
                        },
                        beginAtZero: true,
                        ticks: {
                            display: false,
                        },
                        angleLines: {
                            color: colorChart,
                        },
                        pointLabels: {
                            color: this.dark ? lightTheme : darkTheme,
                            font: {
                                size: this.$vuetify.breakpoint.smAndDown
                                    ? 10
                                    : 14,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '500',
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
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
