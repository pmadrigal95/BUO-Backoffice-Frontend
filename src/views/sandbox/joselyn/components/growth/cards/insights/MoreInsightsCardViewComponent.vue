<script>
/**
 * Descripción: Pantalla Card More Insights
 *
 * @displayName MoreInsightsCardViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'MoreInsightsCardViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },
};
</script>

<template>
    <BaseCardFlexViewComponent
        justifyContent="justify-space-around"
        alignContent="align-center"
        color="aidBlue900"
        paddingContent="pa-0"
        height="184px"
    >
        <div slot="column" class="text-center pt-4 pb-8">
            <strong class="BUO-Heading-XSmall aidMint500--text"
                >¿Quieres obtener más insights?</strong
            >
            <p class="BUO-Label-XSmall white--text pt-3">
                Necesitamos más datos para ofrecerte mejores sugerencias.
            </p>
            <v-btn
                dark
                color="blue800"
                outlined
                class="BUO-Paragraph-Small-SemiBold no-uppercase blue800--text"
                style="background: white"
                >Empezar proceso</v-btn
            >
        </div>
        <div slot="column" style="position: absolute; right: 0; top: 0">
            <v-img
                contain
                max-height="184px"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-insights.svg"
                class="rounded-lg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
