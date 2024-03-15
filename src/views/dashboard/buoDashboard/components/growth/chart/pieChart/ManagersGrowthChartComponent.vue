<script>
/**
 * Descripción: Pantalla  ManagersGrowthChartComponent
 *
 * @displayName ManagersGrowthChartComponent
 *
 */

const BaseDashboardAlertCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseDashboardAlertCardViewComponent'
    );

const BasePieChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/pieChart/BasePieChartViewComponent'
    );

export default {
    name: 'ManagersGrowthChartComponent',

    props: {
        chartData: {
            type: Object,
            required: true,
        },
    },

    components: {
        BasePieChartViewComponent,
        BaseDashboardAlertCardViewComponent,
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Managers y su porcentaje de crecimiento"
        :chartData="chartData"
        :isOnlyChart="false"
    >
        <section slot="content">
            <BaseDashboardAlertCardViewComponent
                label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </section>
    </BasePieChartViewComponent>
</template>
