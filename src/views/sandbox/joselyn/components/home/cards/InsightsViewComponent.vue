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

    props: {
        title: {
            type: String,
            required: true,
        },

        subtitle: {
            type: String,
            required: true,
        },

        description: {
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
        height="auto"
    >
        <div
            slot="column"
            class="text-center pt-4 pb-8"
            :class="$vuetify.breakpoint.mobile ? 'px-4' : 'px-12'"
        >
            <v-card
                color="aidBlue900"
                :width="$vuetify.breakpoint.mobile ? '150px' : '245px'"
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
                            class="aidMint500--text pt-4 pr-1"
                            :class="
                                $vuetify.breakpoint.mobile
                                    ? 'BUO-Paragraph-Medium-SemiBold'
                                    : 'BUO-Paragraph-Large-SemiBold'
                            "
                        >
                            {{ title }}
                        </p>
                    </section>
                </v-card-text>
            </v-card>
        </div>
        <div slot="column" class="text-start pt-4 pb-8">
            <section style="max-width: 80%">
                <strong
                    class="aidBlue900--text"
                    :class="
                        $vuetify.breakpoint.mobile
                            ? 'BUO-Paragraph-Small-SemiBold'
                            : 'BUO-Paragraph-Large-SemiBold '
                    "
                >
                    {{ subtitle }}
                </strong>
                <p
                    class="aidBlue900--text pt-3"
                    :class="
                        $vuetify.breakpoint.mobile
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Large'
                    "
                >
                    {{ description }}
                </p>
                <v-btn
                    dark
                    color="blue800"
                    outlined
                    class="no-uppercase blue800--text"
                    :class="
                        $vuetify.breakpoint.mobile
                            ? 'BUO-Paragraph-XSmall-SemiBold'
                            : 'BUO-Paragraph-Small-SemiBold'
                    "
                    style="background: white"
                    >{{ nameButton }}</v-btn
                >
            </section>
        </div>
        <div
            slot="column"
            style="position: absolute; right: 0; top: 0"
            v-if="!$vuetify.breakpoint.mobile"
        >
            <v-img
                contain
                max-height="200px"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-insights.svg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
