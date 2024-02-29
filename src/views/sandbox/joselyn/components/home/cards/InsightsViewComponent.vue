<script>
/**
 * Descripción: Pantalla InsightsViewComponent
 *
 * @displayName InsightsViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'InsightsViewComponent',

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
        height="200px"
    >
        <div slot="column" class="text-center pt-4 pb-8 px-12">
            <v-card
                color="aidBlue900"
                width="245px"
                height="55px"
                class="d-flex justify-start align-center rounded-xxl"
            >
                <v-card-text>
                    <section
                        class="d-flex flex-row justify-center align-center"
                    >
                        <v-img
                            contain
                            width="24px"
                            height="27px"
                            src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                            lazy-src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg"
                        />
                        <p
                            class="BUO-Paragraph-Large-SemiBold aidMint500--text pt-4 pr-1"
                        >
                            AI driven insights
                        </p>
                    </section>
                </v-card-text>
            </v-card>
        </div>
        <div slot="column" class="text-start pt-4 pb-8">
            <section style="max-width: 80%">
                <strong class="BUO-Paragraph-Large-SemiBold aidBlue900--text"
                    >En BUO, nuestra tecnología AI provee indicadores cruciales
                    para decisiones más informadas.
                </strong>
                <p class="BUO-Paragraph-Large aidBlue900--text pt-3">
                    Proporcionanos más datos y personalizaremos esta sección
                    para ti.
                </p>
                <v-btn
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
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-insights.svg"
                class="rounded-lg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
