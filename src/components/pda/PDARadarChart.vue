<script>
/**
 * Descripción: Grafico Radar PDA reutilizable
 *
 * @displayName PDARadarChart
 */

const BaseRadarChart = () => import('@/components/core/charts/BaseRadarChart');

const colorChart = '#b3b5c633';
const darkTheme = '#282828';
const lightTheme = '#fff';

export default {
    name: 'PDARadarChart',

    components: {
        BaseRadarChart,
    },

    props: {
        data: {
            type: Array,
            required: true,
        },

        profile: {
            type: String,
            required: true,
        },

        dark: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            colorIndex: [],
            borderIndex: 0,
            chartData: this.$_getObject(),
        };
    },

    computed: {
        chartOptions() {
            return {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        borderJoinStyle: 'round',
                        tension: 0.4,
                    },
                },
                scales: {
                    r: {
                        grid: {
                            circular: true,
                            lineWidth: 5,
                            color: (context) =>
                                context.index == this.borderIndex
                                    ? this.profile
                                    : colorChart,
                        },
                        beginAtZero: true,
                        ticks: {
                            display: false,
                        },
                        angleLines: {
                            color: colorChart,
                        },
                        pointLabels: {
                            color: (context) =>
                                this.colorIndex.includes(context.index)
                                    ? this.profile
                                    : this.dark
                                    ? lightTheme
                                    : darkTheme,

                            font: {
                                size: this.$vuetify.breakpoint.smAndDown
                                    ? 10
                                    : 15,
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            };
        },
    },

    created() {
        this.$_getValues();
    },

    methods: {
        $_getObject() {
            return {
                labels: [],
                datasets: [
                    {
                        borderColor: this.profile,
                        data: [],
                    },
                ],
            };
        },

        $_getValues() {
            this.data.forEach((element) => {
                this.$_getColorIndex(element);
                this.$_getLabels(element.habilidadUI);
                this.$_getDatasets(element.porcentajeNaturalHabilidad);
            });

            this.$_getBorderColor();
        },

        $_getLabels(label) {
            const result = label.split(' ');
            this.chartData.labels.push(result);
        },

        $_getDatasets(value) {
            this.chartData.datasets[0].data.push(value);
        },

        $_getBorderColor() {
            let temp = [];
            this.data.forEach((element) => {
                temp.push(element.porcentajeNaturalHabilidadFormato / 10);
            });

            this.borderIndex = Math.floor(Math.max.apply(null, temp));
        },

        $_getColorIndex(element) {
            if (element.resaltar) {
                const index = this.data.findIndex((object) => {
                    return object.id === element.id;
                });

                this.colorIndex.push(index);
            }
        },
    },
};
</script>

<template>
    <BaseRadarChart :chartData="chartData" :chartOptions="chartOptions" />
</template>
