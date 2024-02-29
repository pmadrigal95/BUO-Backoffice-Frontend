<script>
/**
 * Descripción: Pantalla MoreInsightsCardViewComponent
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
        justifyContent="justify-start"
        alignContent="align-center"
        color="aidMint500"
        paddingContent="pa-0"
        width="278px"
        height="200px"
    >
        <div slot="column" class="text-start px-4" style="max-width: 70%">
            <section>
                <strong class="BUO-Label-Small-SemiBold aidBlue900--text"
                    >¿Quieres obtener más insights?
                </strong>
                <p class="BUO-Label-Small aidBlue900--text pt-3">
                    Necesitamos más datos para ofrecerte mejores sugerencias.
                </p>
                <v-btn
                    small
                    dark
                    color="blue800"
                    outlined
                    class="BUO-Paragraph-Small-SemiBold no-uppercase blue800--text"
                    style="background: white"
                    >Empezar proceso</v-btn
                >
            </section>
        </div>
        <div slot="column" style="position: absolute; right: 0; top: 0">
            <v-img
                contain
                max-height="200px"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/more-insights.svg"
                class="rounded-lg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
