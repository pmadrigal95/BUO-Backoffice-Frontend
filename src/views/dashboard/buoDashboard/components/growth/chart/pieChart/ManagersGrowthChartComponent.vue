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

    computed: {
        isOnlyChart() {
            //TODO: AI Missing
            return true;
        },
    },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Managers y su porcentaje de crecimiento"
        :chartData="chartData"
        :isOnlyChart="isOnlyChart"
    >
        <section slot="content">
            <!--TODO: AI Missing-->
            <BaseDashboardAlertCardViewComponent
                label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </section>
    </BasePieChartViewComponent>
</template>
