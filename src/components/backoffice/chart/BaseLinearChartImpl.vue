<script>
/**
 * Descripción: Grafico Lineal reutilizable
 *
 * @displayName BaseLinearChartImpl
 */

const darkTheme = '#282828';
const lightTheme = '#fff';

const BaseLinearChart = () =>
    import('@/components/core/charts/BaseLinearChart');

export default {
    name: 'BaseLinearChartImpl',

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

        isRound: {
            type: Boolean,
            default: false,
        },

        aspectRatio: {
            type: Number,
            default: 4,
        },

        point: {
            type: Number,
            default: 0,
        },
    },

    components: {
        BaseLinearChart,
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
                aspectRatio: this.aspectRatio,
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
                                size: 12,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '400',
                            },
                        },
                        grid: {
                            color: 'transparent',
                        },
                    },
                    y: {
                        stacked: true,
                        color: this.dark ? lightTheme : darkTheme,
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '400',
                            },
                        },
                    },
                },
                elements: {
                    point: {
                        radius: this.point,
                    },
                    line: {
                        borderJoinStyle:
                            this.isRound == true ? 'round' : 'miter',
                        tension: this.isRound == true ? 0.4 : 0,
                    },
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: this.showLegend,
                        position: this.positionLegend,
                        align: this.alignLegend,
                        padding: 40,
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
    <BaseLinearChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
