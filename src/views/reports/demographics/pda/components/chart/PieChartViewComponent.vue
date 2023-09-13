<script>
/**
 * Descripción: Grafico Pie
 *
 * @displayName PieChartViewComponent
 */

import { mapGetters } from 'vuex';

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

        //TODO: Implementar logica
        chartData() {
            return this.data;
        },

        showLegend() {
            return this.$vuetify.breakpoint.mobile ? false : true;
        },
    },
};
</script>

<template>
    <BasePieChartImpl
        :chartData="chartData"
        :dark="app"
        :showLegend="showLegend"
    />
</template>
