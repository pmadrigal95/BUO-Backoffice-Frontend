<script>
/**
 * Descripción: Pantalla  HistoricalRecruitmentChartComponent
 *
 * @displayName HistoricalRecruitmentChartComponent
 *
 */

const BaseLinearChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/linearChart/BaseLinearChartViewComponent'
    );

export default {
    name: 'HistoricalRecruitmentChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseLinearChartViewComponent,
    },

    computed: {
        chartDataSetUp() {
            return this.setUp();
        },
    },

    methods: {
        setUp() {
            if (this.chartData?.datasets[0]) {
                this.chartData.datasets[0].label = this.chartData.datasets[0]
                    ?.label
                    ? this.chartData.datasets[0]?.label
                    : 'Seleccionados';
            }

            if (this.chartData?.datasets[1]) {
                this.chartData.datasets[1].label = this.chartData.datasets[1]
                    ?.label
                    ? this.chartData.datasets[1]?.label
                    : 'Candidatos';
            }

            return this.chartData;
        },
    },
};
</script>

<template>
    <BaseLinearChartViewComponent
        :isRound="false"
        :showLegend="true"
        :chartData="chartDataSetUp"
        :requiredLinearGradient="chartData.datasets.length > 1 ? false : true"
        title="Histórico de selección"
    />
</template>
