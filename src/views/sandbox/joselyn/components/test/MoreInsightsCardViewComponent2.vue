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
    <BaseCardFlexViewComponent justifyContent="justify-center" color="#79FFCC">
        <div slot="column">
            <h1>
                En BUO, nuestra tecnología AI provee indicadores cruciales para
                decisiones más informadas.
            </h1>
            <p>
                Proporcionanos más datos y personalizaremos esta sección para
                ti.
            </p>
            <v-btn
                text
                color="blue900"
                outlined
                @click="test()"
                class="BUO-Label-XSmall no-uppercase"
                >Empezar proceso</v-btn
            >
        </div>
    </BaseCardFlexViewComponent>
</template>
