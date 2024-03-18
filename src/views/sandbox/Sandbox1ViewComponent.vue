<script>
/**
 * Descripción: Pantalla Sandbox 1
 *
 * @displayName Sandbox1ViewComponent
 *
 */

// const BaseInsightsCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseInsightsCardViewComponent'
//     );

// const BaseAIDrivenInsightsCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseAIDrivenInsightsCardViewComponent'
//     );

// const BaseInsightSmallCardViewComponent = () =>
//     import(
//         '@/views/dashboard/components/shared/info/BaseInsightSmallCardViewComponent'
//     );

const BaseAIDrivenInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/aiDrivenInsight/BaseAIDrivenInsightViewComponent'
    );

const BaseInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/insight/BaseInsightViewComponent'
    );

export default {
    name: 'Sandbox1ViewComponent',

    components: {
        // BaseInsightsCardViewComponent,
        // BaseAIDrivenInsightsCardViewComponent,
        // BaseInsightSmallCardViewComponent,
        BaseAIDrivenInsightViewComponent,
        BaseInsightViewComponent,
    },
};
</script>

<template>
    <section>
        <br />

        <!-- <h1>Sandbox 1</h1>

        <BaseInsightsCardViewComponent />

        <br />

        <BaseAIDrivenInsightsCardViewComponent />

        <br />

        <BaseInsightSmallCardViewComponent /> -->

        <BaseAIDrivenInsightViewComponent :list="[]" />

        <br />
        <br />

        <BaseInsightViewComponent :list="[]" />
    </section>
</template>
