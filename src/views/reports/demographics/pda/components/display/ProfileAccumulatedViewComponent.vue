<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileAccumulatedViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const PieChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/PieChartViewComponent'
    );

export default {
    name: 'ProfileAccumulatedViewComponent',

    props: {
        isDepartmentFilter: {
            type: Boolean,
            default: false,
        },

        data: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
        PieChartViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfil Conductual"
        :subtitle="`Demográfico Acumulado de Perfiles en ${
            isDepartmentFilter ? 'un área' : 'toda la empresa'
        }`"
    >
        <section slot="body">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <PieChartViewComponent :data="data" />
        </section>
    </BaseCardViewComponent>
</template>
