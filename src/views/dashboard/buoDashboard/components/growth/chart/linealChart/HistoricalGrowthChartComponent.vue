<script>
/**
 * Descripción: Pantalla  HistoricalGrowthChartComponent
 *
 * @displayName HistoricalGrowthChartComponent
 *
 */

const BaseDashboardAlertCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseDashboardAlertCardViewComponent'
    );

const BaseLinearChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/linearChart/BaseLinearChartViewComponent'
    );

export default {
    name: 'HistoricalGrowthChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseLinearChartViewComponent,
        BaseDashboardAlertCardViewComponent,
    },

    computed: {
        isOnlyChart() {
            //TODO: AI Missing
            return true;
        },

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
                    : 'Crecimiento Horizontal';
            }

            if (this.chartData?.datasets[1]) {
                this.chartData.datasets[1].label = this.chartData.datasets[1]
                    ?.label
                    ? this.chartData.datasets[1]?.label
                    : 'Crecimiento Vertical';
            }

            return this.chartData;
        },
    },
};
</script>

<template>
    <BaseLinearChartViewComponent
        title="Histórico de crecimiento"
        :chartData="chartDataSetUp"
        :isRound="false"
        :showLegend="true"
        :isOnlyChart="isOnlyChart"
        :chartColumns="$vuetify.breakpoint.mobile ? 12 : 8"
        :contentColumns="$vuetify.breakpoint.mobile ? 12 : 4"
    >
        <section slot="content">
            <!--TODO: AI Missing-->
            <BaseDashboardAlertCardViewComponent
                label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </section>
    </BaseLinearChartViewComponent>
</template>
