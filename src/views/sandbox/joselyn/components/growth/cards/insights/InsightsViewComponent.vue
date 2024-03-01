<script>
/**
 * Descripción: Pantalla Insights Estadísticos
 *
 * @displayName InsightsViewComponent
 *
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseCardFlexViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/shared/cards/BaseCardFlexViewComponent'
    );

const StatisticsCardViewComponent = () =>
    import(
        '@/views/sandbox/joselyn/components/growth/cards/insights/StatisticsCardViewComponent'
    );

export default {
    name: 'InsightsViewComponent',

    components: {
        BaseCardFlexViewComponent,
        StatisticsCardViewComponent,
    },

    props: {
        data: {
            type: Array,
            required: true,
        },

        image: {
            type: String,
            default: undefined,
        },

        width: {
            type: String,
            default: undefined,
        },

        height: {
            type: String,
            default: undefined,
        },
    },

    methods: {
        $_chuckSize(array) {
            return baseSharedFnHelper.$_chuckSize(array, 3);
        },
    },
};
</script>
<template>
    <BaseCardFlexViewComponent
        alignContent="align-center"
        color="aidMint500"
        :width="width"
        :height="height"
        :image="image"
        backgroundImage="aidBlue900"
        title="AI driven insights"
        widthBackgroundImage="185px"
    >
        <div slot="column" class="pl-4">
            <strong class="BUO-Paragraph-Large-SemiBold aidBlue900--text"
                >Insights estadísticos</strong
            >
            <section v-for="(item, i) in data" :key="i" class="py-2">
                <StatisticsCardViewComponent
                    :title="item.title"
                    :description="item.description"
                    width="422px"
                />
            </section>
        </div>
        <div slot="column" class="pl-4">
            <v-img
                contain
                :max-height="height"
                src="https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/BodyAIInsights.svg"
            >
            </v-img>
        </div>
    </BaseCardFlexViewComponent>
</template>
