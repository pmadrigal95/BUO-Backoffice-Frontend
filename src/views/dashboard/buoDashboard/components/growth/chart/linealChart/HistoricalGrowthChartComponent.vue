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
};
</script>

<template>
    <BaseLinearChartViewComponent
        title="Histórico de crecimiento"
        :chartData="chartData"
        :isRound="false"
        :showLegend="false"
        :isOnlyChart="false"
        :chartColumns="$vuetify.breakpoint.mobile ? 12 : 8"
        :contentColumns="$vuetify.breakpoint.mobile ? 12 : 4"
    >
        <section slot="content">
            <BaseDashboardAlertCardViewComponent
                label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </section>
    </BaseLinearChartViewComponent>
</template>
