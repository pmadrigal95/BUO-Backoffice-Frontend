<script>
/**
 * Descripción: Pantalla Sandbox 1
 *
 * @displayName Sandbox1ViewComponent
 *
 */

const BaseInsightsCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseInsightsCardViewComponent'
    );

const BaseAIDrivenInsightsCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseAIDrivenInsightsCardViewComponent'
    );

    const BaseInsightSmallCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/info/BaseInsightSmallCardViewComponent'
    );

export default {
    name: 'Sandbox1ViewComponent',

    components: {
        BaseInsightsCardViewComponent,
        BaseAIDrivenInsightsCardViewComponent,
        BaseInsightSmallCardViewComponent,
    },
};
</script>

<template>
    <section>
        <h1>Sandbox 1</h1>

        <BaseInsightsCardViewComponent />

        <br />

        <BaseAIDrivenInsightsCardViewComponent />

        <br />

        <BaseInsightSmallCardViewComponent />
    </section>
</template>
