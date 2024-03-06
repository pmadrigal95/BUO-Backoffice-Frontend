<script>
/**
 * Descripción: Pantalla  HistoricalGrowthChartComponent
 *
 * @displayName HistoricalGrowthChartComponent
 *
 */

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
    </BaseLinearChartViewComponent>
</template>
