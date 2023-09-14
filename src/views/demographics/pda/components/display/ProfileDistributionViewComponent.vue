<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileDistributionViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/views/demographics/pda/components/shared/BaseCardViewComponent');

const StackedBarChartViewComponent = () =>
    import(
        '@/views/demographics/pda/components/chart/StackedBarChartViewComponent'
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
        <section slot="body" class="my-7">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <StackedBarChartViewComponent :data="data" />
        </section>
    </BaseCardViewComponent>
</template>
