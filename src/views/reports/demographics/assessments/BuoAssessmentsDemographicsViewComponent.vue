<script>
/**
 * Descripción: Pantalla  demographics
 *
 * @displayName BuoAssessmentsDemographicsViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BasePieChartImpl = () =>
    import('@/components/backoffice/chart/BasePieChartImpl');

const BaseStackedBarImpl = () =>
    import('@/components/backoffice/chart/BaseStackedBarImpl');

export default {
    name: 'BuoAssessmentsDemographicsViewComponent',

    components: {
        BasePieChartImpl,
        BaseStackedBarImpl,
        BaseCardViewComponent,
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
                        data: [40, 20, 80, 10],
                    },
                ],
            };
        },

        chartData2() {
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
    <BaseCardViewComponent title="Test" subtitle="Test">
        <div slot="card-text">
            <BasePieChartImpl :chartData="chartData" />
            <br />
            <BaseStackedBarImpl :chartData="chartData2" />
        </div>
    </BaseCardViewComponent>
</template>
