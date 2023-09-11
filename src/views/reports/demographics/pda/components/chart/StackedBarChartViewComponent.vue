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
    },
};
</script>

<template>
    <BaseStackedBarImpl :chartData="chartData" :dark="app" />
</template>
