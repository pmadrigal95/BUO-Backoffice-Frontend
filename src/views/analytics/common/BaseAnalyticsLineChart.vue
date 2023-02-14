<script>
/**
 * Descripción: Grafico Lineal BUO Analytics reutilizable
 *
 * @displayName BaseAnalyticsLineChart
 */

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

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

    data() {
        return {
            delayed: undefined,
        };
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
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
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        borderJoinStyle: 'round',
                        tension: 0.4,
                    },
                },
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

    created() {
        this.chartData.datasets.forEach((element, index) => {
            const color = baseDataVisualizationColorsHelper.$_getColor(index);
            element.borderColor = color.main;
            element.backgroundColor = color.secondary50;
        });
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
