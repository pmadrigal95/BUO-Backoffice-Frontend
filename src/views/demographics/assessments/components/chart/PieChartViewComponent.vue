<script>
/**
 * Descripción: Grafico Pie
 *
 * @displayName PieChartViewComponent
 */

import { mapGetters } from 'vuex';

// import baseDataVisualizationColorsHelper from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

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
                        // backgroundColor: this.data.colors.map((profile) =>
                        //     baseDataVisualizationColorsHelper.$_getColor({
                        //         profile: profile.toLowerCase(),
                        //         type: 'backgroundColor',
                        //     })
                        // ),
                        // hoverBackgroundColor: this.data.colors.map((profile) =>
                        //     baseDataVisualizationColorsHelper.$_getColor({
                        //         profile: profile.toLowerCase(),
                        //         type: 'hoverBackgroundColor',
                        //     })
                        // ),
                        // hoverBorderColor: this.data.colors.map((profile) =>
                        //     baseDataVisualizationColorsHelper.$_getColor({
                        //         profile: profile.toLowerCase(),
                        //         type: 'hoverBorderColor',
                        //     })
                        // ),
                        // borderColor: this.data.colors.map((profile) =>
                        //     baseDataVisualizationColorsHelper.$_getColor({
                        //         profile: profile.toLowerCase(),
                        //         type: 'borderColor',
                        //     })
                        // ),
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
