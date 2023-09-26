<script>
/**
 * Descripción: Pantalla
 *
 * @displayName IndicatorsViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BaseCardViewComponent = () =>
    import('@/views/demographics/pda/components/shared/BaseCardViewComponent');

const RadarChartViewComponent = () =>
    import('@/views/demographics/pda/components/chart/RadarChartViewComponent');

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
        pdaColor() {
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
        <section slot="body" class="my-7">
            <BaseSkeletonLoader v-if="!data" type="card" />
            <RadarChartViewComponent :data="data" :pdaColor="pdaColor" />
        </section>
    </BaseCardViewComponent>
</template>
