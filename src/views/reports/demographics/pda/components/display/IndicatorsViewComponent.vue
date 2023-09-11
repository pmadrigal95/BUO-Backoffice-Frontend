<script>
/**
 * Descripción: Pantalla
 *
 * @displayName IndicatorsViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const RadarChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/RadarChartViewComponent'
    );

export default {
    name: 'IndicatorsViewComponent',

    props: {
        isDepartmentFilter: {
            type: Boolean,
            default: false,
        },

        data: {
            type: Array,
            required: true,
        },
    },

    components: {
        BaseCardViewComponent,
        RadarChartViewComponent,
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Indicadores"
        :subtitle="`Promedio de mapeo de indicadores acumulado por ${
            isDepartmentFilter ? 'área' : 'empresa'
        }`"
    >
        <section slot="body">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <RadarChartViewComponent :data="data" />
        </section>
    </BaseCardViewComponent>
</template>
