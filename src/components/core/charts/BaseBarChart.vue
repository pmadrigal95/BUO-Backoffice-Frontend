<script>
/**
 * Descripción: Grafico Bar reutilizable
 *
 * @displayName BaseBarChart
 */

import { v4 as uuidv4 } from 'uuid';

import { Bar } from 'vue-chartjs';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: 'BaseBarChart',

    components: {
        Bar,
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
            refBar: 'BaseBarChart_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refBar = this.refBar + randomID;
    },
};
</script>

<template>
    <Bar
        :chart-id="refBar"
        :chart-data="chartData"
        :chart-options="chartOptions"
    />
</template>
