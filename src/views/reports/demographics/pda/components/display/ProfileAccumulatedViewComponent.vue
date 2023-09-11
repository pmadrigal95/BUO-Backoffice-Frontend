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

    computed: {
        chartData() {
            return {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: [
                            '#41B883',
                            '#E46651',
                            '#00D8FF',
                            '#DD1B16',
                        ],
                        data: [40.5, 20, 80, 10],
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
