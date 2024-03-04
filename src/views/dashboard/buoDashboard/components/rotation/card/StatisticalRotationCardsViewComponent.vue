<script>
/**
 * Descripción: Pantalla  StatisticalRotationCardsViewComponent
 *
 * @displayName StatisticalRotationCardsViewComponent
 *
 */

const BaseSlideCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/slider/BaseSlideCardViewComponent'
    );

export default {
    name: 'StatisticalRotationCardsViewComponent',

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
