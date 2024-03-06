<script>
/**
 * Descripción: Pantalla  ManagersGrowthChartComponent
 *
 * @displayName ManagersGrowthChartComponent
 *
 */

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

    components: { BasePieChartViewComponent },
};
</script>

<template>
    <BasePieChartViewComponent
        title="Managers y su porcentaje de crecimiento"
        :chartData="chartData"
        :isOnlyChart="false"
    >
        <section slot="content">
            <v-card dark flat>
                <v-card-title></v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-card-text>
                    De acuerdo a insights de rotación, el Beneficio 3 es un gran
                    motivador para tus colaboradores por lo que te recomendamos
                    aumentar esfuerzos relacionados con este beneficio
                </v-card-text>

                <v-card-actions></v-card-actions>
            </v-card>
        </section>
    </BasePieChartViewComponent>
</template>
