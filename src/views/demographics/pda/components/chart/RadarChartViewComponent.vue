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

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        chartData() {
            return this.data.map((element, index) => {
                return {
                    id: index,
                    habilidadUI: element.abilityUI,
                    porcentajeNaturalHabilidad: element.value,
                    porcentajeNaturalHabilidadFormato: element.value * 100,
                    resaltar: element.highlight,
                };
            });
        },
    },

    watch: {
        app: {
            handler() {
                this.key++;
            },
        },
    },
};
</script>

<template>
    <PDARadarChart
        :data="chartData"
        :profile="pdaColor"
        :dark="app"
        :key="key"
    />
</template>
