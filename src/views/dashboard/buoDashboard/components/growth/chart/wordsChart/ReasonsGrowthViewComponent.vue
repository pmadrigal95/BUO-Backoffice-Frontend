<script>
/**
 * Descripción: Pantalla  ReasonsGrowthViewComponent
 *
 * @displayName ReasonsGrowthViewComponent
 *
 */

const BaseWordsChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/wordsChart/BaseWordsChartViewComponent'
    );

export default {
    name: 'ReasonsGrowthViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },

    components: { BaseWordsChartViewComponent },
};
</script>

<template>
    <BaseWordsChartViewComponent
        title="Motivos de crecimiento"
        :chartData="chartData"
    />
</template>
