<script>
/**
 * Descripción: Grafico Pie
 *
 * @displayName StackedBarChartViewComponent
 */

import { mapGetters } from 'vuex';

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
    <BaseStackedBarImpl
        :chartData="chartData"
        :dark="app"
        :showLegend="showLegend"
    />
</template>
