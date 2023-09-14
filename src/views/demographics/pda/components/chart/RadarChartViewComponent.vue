<script>
/**
 * Descripción: Grafico Radar
 *
 * @displayName RadarChartViewComponent
 */

import { mapGetters } from 'vuex';

const BaseRadarChartImpl = () =>
    import('@/components/backoffice/chart/BaseRadarChartImpl');

export default {
    name: 'RadarChartViewComponent',

    props: {
        data: {
            type: Array,
            required: true,
        },

        borderColor: {
            type: String,
            default: '#003F5E',
        },
    },

    components: {
        BaseRadarChartImpl,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return {
                labels: this.data.map((element) =>
                    this.$vuetify.breakpoint.mobile
                        ? element.abilityUI
                        : element.ability
                ),
                datasets: [
                    {
                        borderColor: this.borderColor,
                        data: this.data.map((element) => element.value),
                    },
                ],
            };
        },
    },
};
</script>

<template>
    <BaseRadarChartImpl :chartData="chartData" :dark="app" />
</template>
