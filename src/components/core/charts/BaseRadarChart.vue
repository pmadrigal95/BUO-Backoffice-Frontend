<script>
/**
 * Descripción: Grafico Radar reutilizable
 *
 * @displayName BaseRadarChart
 */

import { v4 as uuidv4 } from 'uuid';

import { Radar } from 'vue-chartjs';

import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    Legend,
    RadialLinearScale,
    Filler,
} from 'chart.js';

ChartJS.register(PointElement, Legend, RadialLinearScale, LineElement, Filler);

export default {
    name: 'BaseRadarChart',

    components: {
        Radar,
    },

    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartOptions: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            refRadar: 'BaseRadarChart_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refRadar = this.refRadar + randomID;
    },
};
</script>

<template>
    <Radar
        :chart-id="refRadar"
        :chart-data="chartData"
        :chart-options="chartOptions"
    />
</template>
