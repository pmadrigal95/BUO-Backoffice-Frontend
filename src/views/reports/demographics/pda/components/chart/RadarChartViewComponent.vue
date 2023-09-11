<script>
/**
 * Descripción: Grafico Radar
 *
 * @displayName RadarChartViewComponent
 */

const BaseRadarChartImpl = () =>
    import('@/components/backoffice/chart/BaseRadarChartImpl');

export default {
    name: 'RadarChartViewComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseRadarChartImpl,
    },

    computed: {
        chartData() {
            return this.data;
        },
    },
};
</script>

<template>
    <BaseRadarChartImpl :chartData="chartData" />
</template>
