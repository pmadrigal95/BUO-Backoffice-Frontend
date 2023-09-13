<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileDistributionViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const StackedBarChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/StackedBarChartViewComponent'
    );

export default {
    name: 'ProfileDistributionViewComponent',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
        StackedBarChartViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfil Conductual"
        subtitle="Distribución de perfiles conductuales por área"
    >
        <section slot="body">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <StackedBarChartViewComponent :data="data" />
        </section>
    </BaseCardViewComponent>
</template>
