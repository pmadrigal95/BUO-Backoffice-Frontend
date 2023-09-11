<script>
/**
 * Descripción: Pantalla
 *
 * @displayName IndicatorsViewComponent
 *
 */

import { mapGetters } from 'vuex';

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

    computed: {
        ...mapGetters('theme', ['app']),

        chart() {
            return {
                labels: [
                    'Eating',
                    'Drinking',
                    'Sleeping',
                    'Designing',
                    'Coding',
                    'Cycling',
                    'Running',
                ],
                datasets: [
                    {
                        data: [65, 59, 90, 81, 56, 55, 40],
                    },
                ],
            };
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
            <RadarChartViewComponent :data="chart" />
        </section>
    </BaseCardViewComponent>
</template>
