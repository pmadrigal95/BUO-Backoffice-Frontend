<script>
/**
 * Descripción: Grafico Radar reutilizable
 *
 * @displayName BaseRadarChart
 */

import { v4 as uuidv4 } from 'uuid';

import { Line as LineChartGenerator } from 'vue-chartjs';

import {
    Chart as ChartJS,
    Title,
    Filler,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement,
} from 'chart.js';

ChartJS.register(
    Title,
    Filler,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
);

export default {
    name: 'BaseLinearChart',

    components: {
        LineChartGenerator,
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
            refLine: 'BaseLinearChart_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refLine = this.refLine + randomID;
    },
};
</script>

<template>
    <LineChartGenerator
        :chart-id="refLine"
        :chart-data="chartData"
        :chart-options="chartOptions"
    />
</template>
