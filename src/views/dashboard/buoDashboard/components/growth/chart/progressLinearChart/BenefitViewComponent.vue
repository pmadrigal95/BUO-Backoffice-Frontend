<script>
/**
 * Descripción: Pantalla  BenefitViewComponent
 *
 * @displayName BenefitViewComponent
 *
 */

const BaseDashboardAlertCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseDashboardAlertCardViewComponent'
    );

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

    components: {
        ProgressLinearComponent,
        BaseDashboardAlertCardViewComponent,
    },
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
            <BaseDashboardAlertCardViewComponent
                label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
            />
        </section>
    </ProgressLinearComponent>
</template>
