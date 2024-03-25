<script>
/**
 * Descripción: Pantalla  MixAiInsightGrowthViewComponent
 *
 * @displayName MixAiInsightGrowthViewComponent
 *
 */

const BaseMixAiInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/mixaiInsight/BaseMixAiInsightViewComponent'
    );

export default {
    name: 'MixAiInsightGrowthViewComponent',

    props: {
        insights: {
            type: Array,
            default: () => [],
        },

        aiDrivenInsights: {
            type: Array,
            default: () => [],
        },
    },

    components: { BaseMixAiInsightViewComponent },

    computed: {
        insight() {
            return { list: this.insights };
        },

        aiDrivenInsight() {
            return { list: this.aiDrivenInsights };
        },
    },
};
</script>

<template>
    <BaseMixAiInsightViewComponent
        :insight="insight"
        :aiDrivenInsight="aiDrivenInsight"
    />
</template>
