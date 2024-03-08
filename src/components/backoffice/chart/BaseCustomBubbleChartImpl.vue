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
            const objectChartData = {
                labels: this.chartData?.labels,
                datasets: this.chartData?.datasets[0]?.data.map(
                    (element, index) => ({
                        label:
                            Array.isArray(this.chartData.labels) &&
                            this.chartData?.labels?.length > 0
                                ? this.chartData?.labels[index]
                                : undefined,
                        backgroundColor:
                            this.chartData?.datasets[0]?.backgroundColor[index],
                        hoverBackgroundColor:
                            this.chartData?.datasets[0]?.hoverBackgroundColor[
                                index
                            ],
                        hoverBorderColor:
                            this.chartData?.datasets[0]?.hoverBorderColor[
                                index
                            ],
                        borderColor:
                            this.chartData?.datasets[0]?.borderColor[index],
                        data: element,
                    })
                ),
            };

            baseArrayHelper.SortArrayByProperty({
                array: objectChartData.datasets,
                prop: 'data',
            });

            return objectChartData;
        },

        chartOptions() {
            return {
                plugins: {
                    legend: {
                        icon: this.iconLegend,
                        display: this.showLegend,
                        position: this.positionLegend,
                        labels: {
                            isDarkTheme: this.dark,
                            font: {
                                name: 'BUO-Label-Small',
                                value: 'BUO-Label-Small-SemiBold',
                            },
                        },
                        tooltip: {
                            font: {
                                name: 'BUO-Label-XSmall',
                                value: 'BUO-Paragraph-Medium',
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
