<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileDistributionViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

const StackedBarChartViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/chart/StackedBarChartViewComponent'
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

    computed: {
        chartData() {
            return {
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                    },
                    {
                        label: 'Data One',
                        backgroundColor: '#f829',
                        data: [20, 40, 60, 10, 20, 10, 5, 50, 10, 11, 40, 31],
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
        subtitle="Distribución de perfiles conductuales por área"
    >
        <section slot="body">
            <!-- <BaseSkeletonLoader v-if="!data" type="card" /> -->
            <StackedBarChartViewComponent :data="chartData" />
        </section>
    </BaseCardViewComponent>
</template>
