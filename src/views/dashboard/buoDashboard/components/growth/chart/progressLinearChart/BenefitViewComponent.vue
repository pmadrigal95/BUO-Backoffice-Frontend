<script>
/**
 * Descripción: Pantalla  BenefitViewComponent
 *
 * @displayName BenefitViewComponent
 *
 */

const ProgressLinearComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressLinearChart/ProgressLinearComponent'
    );

export default {
    name: 'BenefitViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },

    components: { ProgressLinearComponent },
};
</script>

<template>
    <ProgressLinearComponent
        title="Beneficios"
        :list="chartData"
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
    </ProgressLinearComponent>
</template>
