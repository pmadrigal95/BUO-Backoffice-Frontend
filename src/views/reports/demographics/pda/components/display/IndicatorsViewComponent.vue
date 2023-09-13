<script>
/**
 * Descripción: Pantalla
 *
 * @displayName IndicatorsViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/views/reports/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

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

        color: {
            type: String,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        RadarChartViewComponent,
    },

    computed: {
        borderColor() {
            return baseDataVisualizationColorsHelper.$_getColor({
                profile: this.color.toLowerCase(),
                type: 'backgroundColor',
            });
        },
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
            <RadarChartViewComponent :data="data" :borderColor="borderColor" />
        </section>
    </BaseCardViewComponent>
</template>
