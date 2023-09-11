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

const BaseHtml2Pdf = () => import('@/components/core/html/BaseHtml2Pdf');

export default {
    name: 'BuoAssessmentsDemographicsViewComponent',

    components: {
        BaseHtml2Pdf,
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
                            '#c5fac0',
                            '#fae1c0',
                            '#c0cefa',
                            '#fac0c0',
                        ],
                        hoverBackgroundColor: [
                            '#98eee2',
                            '#dffac0',
                            '#fad4c0',
                            '#c0faf8',
                        ],
                        hoverBorderColor: [
                            '#98eee2',
                            '#dffac0',
                            '#fad4c0',
                            '#c0faf8',
                        ],
                        borderColor: [
                            '#41B800',
                            '#E46600',
                            '#00D8FE',
                            '#DD1B00',
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
                        backgroundColor: '#CED8F6',
                        data: [80, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                        hoverBackgroundColor: '#81BEF7',
                        hoverBorderColor: '#81BEF7',
                        borderColor: '#81BEF7',
                    },
                    {
                        label: 'Data Two',
                        backgroundColor: '#F2E0F7',
                        data: [20, 40, 60, 10, 80, 10, 5, 50, 10, 11, 40, 31],
                        hoverBackgroundColor: '#F781F3',
                        hoverBorderColor: '#F781F3',
                        borderColor: '#F781F3',
                    },
                    {
                        label: 'Data Three',
                        backgroundColor: '#F6E3CE',
                        data: [20, 40, 60, 10, 40, 10, 5, 50, 10, 11, 40, 31],
                        hoverBackgroundColor: '#D7DF01',
                        hoverBorderColor: '#D7DF01',
                        borderColor: '#D7DF01',
                    },
                    {
                        label: 'Data Four',
                        backgroundColor: '#F5F6CE',
                        data: [20, 40, 60, 10, 20, 10, 5, 50, 60, 11, 40, 31],
                        hoverBackgroundColor: '#3ADF00',
                        hoverBorderColor: '#3ADF00',
                        borderColor: '#3ADF00',
                    },
                ],
            };
        },
    },
};
</script>

<template>
    <BaseHtml2Pdf filename="test">
        <section slot="Content">
            <BaseCardViewComponent title="Test" subtitle="Test">
                <div slot="card-text">
                    <BasePieChartImpl :chartData="chartData" />
                    <br />
                    <BaseStackedBarImpl :chartData="chartData2" />
                </div>
            </BaseCardViewComponent>
        </section>
    </BaseHtml2Pdf>
</template>
