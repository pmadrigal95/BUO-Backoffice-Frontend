<script>
/**
 * Descripción: Grafico Stacked Bar reutilizable
 *
 * @displayName BaseStackedBarImpl
 */

const darkTheme = '#282828';
const lightTheme = '#fff';

const BaseBarChart = () => import('@/components/core/charts/BaseBarChart');
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

        positionLegend: {
            type: String,
            default: 'top',
        },

        alignLegend: {
            type: String,
            default: 'center',
        },

        showLegend: {
            type: Boolean,
            required: true,
        },
    },

    components: {
        BaseBarChart,
    },

    data() {
        return {
            delayed: undefined,
        };
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: this.$vuetify.breakpoint.mdAndUp,
                borderWidth: 2,
                borderRadius: {
                    topLeft: 8,
                    topRight: 8,
                    bottomLeft: 8,
                    bottomRight: 8,
                },
                borderSkipped: false,
                animation: {
                    onComplete: () => {
                        this.delayed = true;
                    },
                    delay: (context) => {
                        let delay = 0;
                        if (
                            context.type === 'data' &&
                            context.mode === 'default' &&
                            !this.delayed
                        ) {
                            delay =
                                context.dataIndex * 35 +
                                context.datasetIndex * 12;
                        }
                        return delay;
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: {
                            color: this.dark ? lightTheme : darkTheme,
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
                            color: this.dark ? lightTheme : darkTheme,
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
                        display: this.showLegend,
                        position: this.positionLegend,
                        align: this.alignLegend,
                        labels: {
                            padding: 20,
                            color: this.dark ? lightTheme : darkTheme,
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
