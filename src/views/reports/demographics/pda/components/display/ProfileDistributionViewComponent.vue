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
                        backgroundColor: '#CED8F6',
                        data: [80, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                        hoverBackgroundColor: '#81BEF7',
                        hoverBorderColor: '#81BEF7',
                        borderColor: '#0080FF',
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: '#F2E0F7',
                        data: [20, 40, 60, 10, 80, 10, 5, 50, 10, 11, 40, 31],
                        hoverBackgroundColor: '#F781F3',
                        hoverBorderColor: '#F781F3',
                        borderColor: '#DF01D7',
                    },
                    {
                        label: 'Data Three',
                        backgroundColor: '#F6E3CE',
                        data: [20, 40, 60, 10, 40, 10, 5, 50, 10, 11, 40, 31],
                        hoverBackgroundColor: '#D7DF01',
                        hoverBorderColor: '#D7DF01',
                        borderColor: '#AEB404',
                    },
                    {
                        label: 'Data Four',
                        backgroundColor: '#F5F6CE',
                        data: [20, 40, 60, 10, 20, 10, 5, 50, 60, 11, 40, 31],
                        hoverBackgroundColor: '#3ADF00',
                        hoverBorderColor: '#3ADF00',
                        borderColor: '#088A08',
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
