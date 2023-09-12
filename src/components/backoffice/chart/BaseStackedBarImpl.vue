<script>
/**
 * Descripción: Grafico Stacked Bar reutilizable
 *
 * @displayName BaseStackedBarImpl
 */

// import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BaseBarChart = () => import('@/components/core/charts/BaseBarChart');
export let delayed;
export default {
    name: 'BaseStackedBarImpl',

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

    components: {
        BaseBarChart,
    },

    data() {
        return {
            darkTheme: '#000000',
            lightTheme: '#fff',
        };
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                borderWidth: 2,
                borderRadius: {
                    topLeft: 3,
                    topRight: 3,
                    bottomLeft: 3,
                    bottomRight: 3,
                },
                borderSkipped: false,
                animation: {
                    onComplete: () => {
                        delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (
                            context.type === 'data' &&
                            context.mode === 'default' &&
                            !delayed
                        ) {
                            delay =
                                context.dataIndex * 300 +
                                context.datasetIndex * 100;
                        }
                        return delay;
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: () =>
                                this.dark ? this.lightTheme : this.darkTheme,
                            font: {
                                size: 14,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '400',
                            },
                        },
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            color: () =>
                                this.dark ? this.lightTheme : this.darkTheme,
                            font: {
                                size: 14,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '400',
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        labels: {
                            padding: 20,
                            color: () =>
                                this.dark ? this.lightTheme : this.darkTheme,
                            font: {
                                size: 14,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '500',
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
    <BaseBarChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
