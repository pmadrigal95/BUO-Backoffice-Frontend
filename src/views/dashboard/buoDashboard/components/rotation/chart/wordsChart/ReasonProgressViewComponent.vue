<script>
/**
 * Descripción: Pantalla  ReasonProgressViewComponent
 *
 * @displayName ReasonProgressViewComponent
 *
 */

const BaseWordsChartViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/wordsChart/BaseWordsChartViewComponent'
    );

export default {
    name: 'ReasonProgressViewComponent',

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
        title="Motivos de rotación"
        :chartData="chartData"
    />
</template>
