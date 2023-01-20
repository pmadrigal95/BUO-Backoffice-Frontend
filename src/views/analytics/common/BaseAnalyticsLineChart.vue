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
                                context.dataIndex * 300 +
                                context.datasetIndex * 100;
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
        /*this.chartData.datasets.forEach((element) => {
            element.backgroundColor = this.poolColors(1);
            element.borderColor = this.poolColors(1);
            element.fill = true;
        });*/
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

        dynamicColors() {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
        },

        poolColors(a) {
            var pool = [];
            for (let i = 0; i < a; i++) {
                pool.push(this.dynamicColors());
            }
            return pool;
        },
    },
};
</script>

<template>
    <BaseLinearChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
