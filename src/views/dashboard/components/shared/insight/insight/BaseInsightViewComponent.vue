<script>
/**
 * Descripción: Pantalla  BaseInsightViewComponent
 *
 * @displayName BaseInsightViewComponent
 *
 */

const BaseInsightCardContainer = () =>
    import(
        '@/views/dashboard/components/shared/insight/shared/BaseInsightCardContainer'
    );

export default {
    name: 'BaseInsightViewComponent',

    props: {
        color: {
            type: String,
            default: 'aidBlue400',
        },

        title: {
            type: String,
        },

        header: {
            type: String,
            default: 'Tendencias',
        },

        src: {
            type: Object,
            default: () => ({
                icon: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                image: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/BodyDataInsights.svg',
            }),
        },

        list: {
            type: Array,
            required: true,
        },
    },

    components: { BaseInsightCardContainer },

    computed: {
        iconSetUp() {
            return {
                src:
                    this.src?.icon ||
                    'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                container: {
                    width: '150px',
                },
                backgroundColor: 'aidBlue500',
            };
        },

        headerSetUp() {
            return {
                title: this.header,
                color: 'white--text',
            };
        },

        bodySetUp() {
            return {
                title: this.title,
                color: this.color,
                image:
                    this.src?.image ||
                    'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/BodyDataInsights.svg',
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
    />
</template>
