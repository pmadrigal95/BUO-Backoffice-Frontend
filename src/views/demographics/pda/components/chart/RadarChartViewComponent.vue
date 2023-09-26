<script>
/**
 * Descripción: Grafico Radar
 *
 * @displayName RadarChartViewComponent
 */

import { mapGetters } from 'vuex';

const PDARadarChart = () => import('@/components/pda/PDARadarChart');

export default {
    name: 'RadarChartViewComponent',

    props: {
        data: {
            type: Array,
            required: true,
        },

        pdaColor: {
            type: String,
            requiered: true,
        },
    },

    components: {
        PDARadarChart,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return this.data.map((element, index) => {
                return {
                    id: index,
                    habilidadUI: element.abilityUI,
                    porcentajeNaturalHabilidad: element.value,
                    porcentajeNaturalHabilidadFormato: element.value,
                    resaltar: element.highlight,
                };
            });
        },
    },
};
</script>

<template>
    <PDARadarChart :data="chartData" :profile="pdaColor" :dark="app" />
</template>
