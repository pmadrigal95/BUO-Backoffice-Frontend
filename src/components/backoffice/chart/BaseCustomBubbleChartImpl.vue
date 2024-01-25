<script>
/**
 * Descripción: Grafico Burbuja Custom reutilizable
 *
 * @displayName BaseCustomBubbleChartImpl
 */

import baseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCustomBubbleChart = () =>
    import('@/components/core/charts/BaseCustomBubbleChart');

export default {
    name: 'BaseCustomBubbleChartImpl',

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

        iconLegend: {
            type: String,
            default: 'circle-medium',
        },
    },

    components: {
        BaseCustomBubbleChart,
    },

    computed: {
        $_mapperChartData() {
            return {
                labels: this.chartData?.labels,
                datasets: baseArrayHelper.SortArray(
                    this.chartData?.datasets[0]?.data.map(
                        (element, index) => ({
                            size: `size-${index}`,
                            label:
                                Array.isArray(this.chartData.labels) &&
                                this.chartData?.labels?.length > 0
                                    ? this.chartData?.labels[index]
                                    : undefined,
                            backgroundColor:
                                this.chartData?.datasets[0]?.backgroundColor[
                                    index
                                ],
                            hoverBackgroundColor:
                                this.chartData?.datasets[0]
                                    ?.hoverBackgroundColor[index],
                            hoverBorderColor:
                                this.chartData?.datasets[0]?.hoverBorderColor[
                                    index
                                ],
                            borderColor:
                                this.chartData?.datasets[0]?.borderColor[index],
                            data: element,
                        }),
                        'desc'
                    )
                ),
            };
        },

        chartOptions() {
            return {
                plugins: {
                    legend: {
                        icon: this.iconLegend,
                        display: this.showLegend,
                        position: this.positionLegend,
                        align: this.alignLegend,
                        labels: {
                            isDarkTheme: this.dark,
                            font: {
                                name: 'BUO-Label-XSmall',
                                value: 'BUO-Label-Small-SemiBold',
                            },
                        },
                    },
                },
            };
        },
    },
};
</script>

<template>
    <BaseCustomBubbleChart
        :chartData="$_mapperChartData"
        :chartOptions="chartOptions"
    />
</template>
