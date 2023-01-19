<script>
/**
 * Descripción: Grafico Lineal BUO Analytics reutilizable
 *
 * @displayName BaseAnalyticsLineChart
 */

const BaseLinearChart = () =>
    import('@/components/core/charts/BaseLinearChart');

export default {
    name: 'BaseAnalyticsLineChart',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseLinearChart,
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            footer: this.$_chartFooter,
                        },
                    },
                },
            };
        },
    },

    methods: {
        $_chartFooter(tooltipItems) {
            return (
                this.chartData.toolTipInfo &&
                this.chartData.toolTipInfo.length > 0 &&
                this.chartData.toolTipInfo[
                    this.chartData.labels.indexOf(tooltipItems[0].label)
                ]
            );
        },
    },
};
</script>

<template>
    <BaseLinearChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
