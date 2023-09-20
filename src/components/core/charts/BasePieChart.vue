<script>
/**
 * Descripción: Grafico Pie reutilizable
 *
 * @displayName BasePieChart
 */

import { v4 as uuidv4 } from 'uuid';

import { Pie } from 'vue-chartjs';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: 'BasePieChart',

    components: {
        Pie,
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
            refPie: 'BasePieChart_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refPie = this.refPie + randomID;
    },
};
</script>

<template>
    <Pie
        :chart-id="refPie"
        :chart-data="chartData"
        :chart-options="chartOptions"
    />
</template>
