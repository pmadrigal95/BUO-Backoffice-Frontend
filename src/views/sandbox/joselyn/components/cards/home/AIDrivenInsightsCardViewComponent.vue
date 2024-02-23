<script>
/**
 * Descripción: Pantalla Card Ai Driven Insights
 *
 * @displayName AIDrivenInsightsCardViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'AIDrivenInsightsCardViewComponent',
    components: {
        BaseCardFlexViewComponent,
    },
};
</script>

<template>
    <BaseCardFlexViewComponent
        justifyContent="justify-center"
        color="#091623"
        paddingContent="py-12"
        alignContent="align-content-center"
    >
        <div slot="column" class="">
            <span class="BUO-Heading-Small white--text pt-12"
                >¿Quieres obtener más insights?</span
            >
            <p class="BUO-Paragraph-Small white--text">
                Necesitamos más datos para ofrecerte mejores sugerencias.
            </p>
            <v-btn
                dark
                color="blue900"
                @click="test()"
                class="BUO-Label-XSmall-SemiBold no-uppercase"
                >Empezar proceso</v-btn
            >
        </div>
    </BaseCardFlexViewComponent>
</template>
