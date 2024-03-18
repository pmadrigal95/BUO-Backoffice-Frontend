<script>
/**
 * Descripción: Pantalla  BaseAIDrivenInsightViewComponent
 *
 * @displayName BaseAIDrivenInsightViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseInsightCardContainer = () =>
    import(
        '@/views/dashboard/components/shared/insight/shared/BaseInsightCardContainer'
    );

export default {
    name: 'BaseAIDrivenInsightViewComponent',

    props: {
        color: {
            type: String,
            default: 'aidMint500',
        },

        title: {
            type: String,
        },

        header: {
            type: String,
            default: 'AI driven insights',
        },

        src: {
            type: Object,
            default: () => ({
                icon: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                image: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/BodyAIInsights.svg',
            }),
        },

        list: {
            type: Array,
            required: true,
        },
    },

    components: { BaseInsightCardContainer },

    computed: {
        ...mapGetters('theme', ['app']),

        iconSetUp() {
            return {
                src:
                    this.src?.icon ||
                    'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                container: {
                    width: '190px',
                },
                backgroundColor: this.app ? 'blue-grey darken-2' : 'aidBlue900',
            };
        },

        headerSetUp() {
            return {
                title: this.header,
            };
        },

        bodySetUp() {
            return {
                title: this.title,
                color: this.color,
                image:
                    this.src?.image ||
                    'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/BodyAIInsights.svg',
            };
        },

        tooltipSetUp() {
            return {
                title: 'AI driven',
                text: 'Esta sección fue generada mediante AI al procesar data de la empresa con el objetivo de predecir insights valiosos',
                color: 'grey700',
            };
        },
    },
};
</script>

<template>
    <BaseInsightCardContainer
        :list="list"
        :body="bodySetUp"
        :icon="iconSetUp"
        :header="headerSetUp"
        :tooltip="tooltipSetUp"
    />
</template>
