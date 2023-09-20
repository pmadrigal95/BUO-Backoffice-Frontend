<script>
/**
 * Descripción: Grafico Pie
 *
 * @displayName StackedBarChartViewComponent
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/views/demographics/assessments/components/shared/baseDataVisualizationColorsHelper';

const BaseStackedBarImpl = () =>
    import('@/components/backoffice/chart/BaseStackedBarImpl');

export default {
    name: 'StackedBarChartViewComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseStackedBarImpl,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return {
                labels: this.data.labels,
                datasets: this.data.dataSet.map((item) => this.$_setItem(item)),
            };
        },
    },

    methods: {
        $_setItem(item) {
            return {
                label: item.label,
                data: item.data,
                backgroundColor: baseDataVisualizationColorsHelper.$_getColor({
                    value: item.color,
                }),
                hoverBackgroundColor:
                    baseDataVisualizationColorsHelper.$_getColor({
                        value: item.color,
                    }),
                hoverBorderColor: baseDataVisualizationColorsHelper.$_getColor({
                    value: item.color,
                }),
                borderColor: baseDataVisualizationColorsHelper.$_getColor({
                    value: item.color,
                }),
            };
        },
    },
};
</script>

<template>
    <BaseStackedBarImpl
        :chartData="chartData"
        :dark="app"
        :showLegend="!$vuetify.breakpoint.mobile"
    />
</template>
