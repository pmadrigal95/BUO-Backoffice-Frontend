<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileAccumulatedViewComponent
 *
 */

import baseDataVisualizationColorsHelper from '@/views/reports/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

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

    computed: {
        chartData() {
            return {
                labels: this.data.labels,
                datasets: [
                    {
                        backgroundColor: [
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: 'amigable',
                                type: 'backgroundColor',
                            }),
                        ],
                        hoverBackgroundColor: [
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: 'amigable',
                                type: 'hoverBackgroundColor',
                            }),
                        ],
                        hoverBorderColor: [
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: 'amigable',
                                type: 'hoverBorderColor',
                            }),
                        ],
                        borderColor: [
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: 'amigables',
                                type: 'borderColor',
                            }),
                        ],
                        data: this.data.data,
                    },
                ],
            };
        },
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
            <!-- <BaseSkeletonLoader v-if="!data" type="card" /> -->
            <PieChartViewComponent :data="chartData" />
        </section>
    </BaseCardViewComponent>
</template>
