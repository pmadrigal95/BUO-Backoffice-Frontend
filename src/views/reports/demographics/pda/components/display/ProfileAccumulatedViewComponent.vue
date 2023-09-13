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
                        backgroundColor: this.data.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'backgroundColor',
                            })
                        ),
                        hoverBackgroundColor: this.data.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'hoverBackgroundColor',
                            })
                        ),
                        hoverBorderColor: this.data.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'hoverBorderColor',
                            })
                        ),
                        borderColor: this.data.colors.map((profile) =>
                            baseDataVisualizationColorsHelper.$_getColor({
                                profile: profile.toLowerCase(),
                                type: 'borderColor',
                            })
                        ),
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
            <BaseSkeletonLoader v-if="!data" type="card" />
            <PieChartViewComponent :data="chartData" />
        </section>
    </BaseCardViewComponent>
</template>
