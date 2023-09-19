<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileAccumulatedViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/shared/BaseCardViewComponent'
    );

const PieChartViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/chart/PieChartViewComponent'
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
        :subtitle="`Demográfico acumulado de perfiles en ${
            isDepartmentFilter ? 'un área' : 'toda la empresa'
        }`"
    >
        <section slot="body" class="my-7">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <PieChartViewComponent :data="data" />
        </section>
    </BaseCardViewComponent>
</template>
