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
                        data: [40, 20, 80, 10],
                        borderColor: [
                            '#41B800',
                            '#E46600',
                            '#00D8FE',
                            '#DD1B00',
                        ],
                        borderAlign: 'inner',
                        borderWidth: 2,
                        hoverOffset: 10,
                        borderJoinStyle: 'miter',
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
                        hoverBorderJoinStyle: 'bevel',
                        cutout: '80',
                        rotation: 10,
                        spacing: 10,
                    },
                ],
            };
        },

        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    fontFamily: 'Arial', // Cambia la fuente aquí
                    title: {
                        display: true,
                        text: 'Demográfico Acumulado de Perfiles en un Área o toda la empresa',
                        color: '#000000',
                        font: {
                            size: 18,
                            family: "'Montserrat', 'sans-serif'",
                            weight: '900',
                            lineHeight: 1.3,
                        },
                    },
                    legend: {
                        display: true,
                        position: 'right',
                        align: 'center',
                        labels: {
                            padding: 20,
                            left: 50,
                            color: '#000000',
                            font: {
                                size: 12,
                                family: "'Montserrat', 'sans-serif'",
                                weight: '400',
                                lineHeight: 1.3,
                            },
                            usePointStyle: true,
                            pointStyle: 'circle',
                        },
                    },
                    tooltip: {
                      
                    },
                },
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
