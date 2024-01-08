<script>
/**
 * Descripción: Pantalla  HistoricalRotationChartComponent
 *
 * @displayName HistoricalRotationChartComponent
 *
 */

const BaseLinearChartViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/linearChart/BaseLinearChartViewComponent'
    );

export default {
    name: 'HistoricalRotationChartComponent',

    components: {
        BaseLinearChartViewComponent,
    },

    computed: {
        fake() {
            return {
                labels: [
                    'Ene',
                    'Feb',
                    'Mar',
                    'Abr',
                    'May',
                    'Jun',
                    'Jul',
                    'Agto',
                    'Sept',
                    'Oct',
                    'Nov',
                    'Dic',
                ],
                datasets: [
                    {
                        label: '',
                        data: [
                            250, 500, 500, 50, 750, 1000, 250, 500, 500, 50,
                            750, 1000,
                        ],
                    },
                ],
            };
        },
    },
};
</script>

<template>
    <BaseLinearChartViewComponent
        title="Histórico de rotación"
        :chartData="fake"
        :isRound="false"
        :showLegend="false"
    />
</template>
