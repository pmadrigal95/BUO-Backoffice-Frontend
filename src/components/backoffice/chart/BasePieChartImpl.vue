<script>
/**
 * Descripción: Grafico Pie reutilizable
 *
 * @displayName BasePieChartImpl
 */
const BasePieChart = () => import('@/components/core/charts/BasePieChart');

export default {
    name: 'BasePieChartImpl',

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

    data() {
        return {
            darkTheme: '#000000',
            lightTheme: '#fff',
        };
    },

    components: {
        BasePieChart,
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70',
                spacing: 1,
                borderAlign: 'inner',
                borderWidth: 2,
                hoverOffset: 10,
                plugins: {
                    legend: {
                        display: this.showLegend,
                        position: this.positionLegend,
                        align: this.alignLegend,
                        padding: 40,
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
    <BasePieChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
