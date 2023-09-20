<script>
/**
 * Descripción: Grafico Pie
 *
 * @displayName PieChartViewComponent
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/views/demographics/assessments/components/shared/baseDataVisualizationColorsHelper';

const BasePieChartImpl = () =>
    import('@/components/backoffice/chart/BasePieChartImpl');

export default {
    name: 'PieChartViewComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BasePieChartImpl,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return {
                labels: this.data.labels,
                datasets: [
                    {
                        backgroundColor: this.data.colors.map((value) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                value,
                            })
                        ),
                        hoverBackgroundColor: this.data.colors.map((value) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                value,
                            })
                        ),
                        hoverBorderColor: this.data.colors.map((value) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                value,
                            })
                        ),
                        borderColor: this.data.colors.map((value) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                value,
                            })
                        ),
                        data: this.data.data,
                    },
                ],
            };
        },
    },
};
</script>

<template>
    <BasePieChartImpl
        :chartData="chartData"
        :dark="app"
        :showLegend="!$vuetify.breakpoint.mobile"
    />
</template>
