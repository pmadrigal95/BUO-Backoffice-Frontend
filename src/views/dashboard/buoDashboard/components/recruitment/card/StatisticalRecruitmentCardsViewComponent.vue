<script>
/**
 * Descripción: Pantalla  StatisticalRecruitmentCardsViewComponent
 *
 * @displayName StatisticalRecruitmentCardsViewComponent
 *
 */

const BaseSlideCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/slider/BaseSlideCardViewComponent'
    );

export default {
    name: 'StatisticalRecruitmentCardsViewComponent',

    props: {
        chartData: {
            type: Array,
            required: true,
        },
    },

    components: { BaseSlideCardViewComponent },
};
</script>

<template>
    <BaseSlideCardViewComponent
        class="mb-2 ml-n2"
        width="auto"
        height="auto"
        :chartData="chartData"
    />
</template>
