<script>
/**
 * Descripción: Pantalla StatisticsInsightsCardViewComponent
 * @displayName StatisticsInsightsCardViewComponent
 *
 */

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

export default {
    name: 'StatisticsInsightsCardViewComponent',

    components: {
        BaseCardFlexViewComponent,
    },

    props: {
        width: {
            type: String,
            default: '100%',
        },

        height: {
            type: String,
            default: '100%',
        },

        color: {
            type: String,
            default: 'aidBlue900',
        },

        title: {
            type: String,
            default: undefined,
        },

        styleTitle: {
            type: String,
            default: 'BUO-Paragraph-Large-SemiBold white--text',
        },

        description: {
            type: String,
            default: undefined,
        },

        styleDescription: {
            type: String,
            default: 'BUO-Label-XSmall  white--text pt-2',
        },
    },
};
</script>

<template>
    <BaseCardFlexViewComponent
        alignContent="align-center"
        :width="width"
        :height="height"
        :color="color"
        paddingContent="pa-0 px-4 pb-2 pt-0"
    >
        <div slot="column">
            <strong :class="styleTitle">{{ title }}</strong>
            <p :class="styleDescription">
                {{ description }}
            </p>
        </div>

        <div slot="column">
            <v-icon color="aidMint500"> mdi-chevron-right </v-icon>
        </div>
    </BaseCardFlexViewComponent>
</template>
