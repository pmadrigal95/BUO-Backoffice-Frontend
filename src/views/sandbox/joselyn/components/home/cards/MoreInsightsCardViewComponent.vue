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

    props: {
        title: {
            type: String,
            required: true,
        },

        subtitle: {
            type: String,
            required: true,
        },

        nameButton: {
            type: String,
            required: true,
        },
    },

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
        class="mt-4"
    >
        <div slot="column" class="text-start px-4" style="max-width: 70%">
            <section>
                <strong class="BUO-Label-Small-SemiBold aidBlue900--text"
                    >{{ title }}
                </strong>
                <p class="BUO-Label-Small aidBlue900--text pt-3">
                    {{ subtitle }}
                </p>
                <v-btn
                    small
                    dark
                    color="blue800"
                    outlined
                    class="BUO-Paragraph-Small-SemiBold no-uppercase blue800--text"
                    style="background: white"
                    >{{ nameButton }}</v-btn
                >
            </section>
        </div>
        <div slot="column" style="position: absolute; right: 0; top: 0">
            <v-img
                contain
                max-height="200px"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/more-insights.svg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
