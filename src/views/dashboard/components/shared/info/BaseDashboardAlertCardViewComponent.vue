<script>
/**
 * Descripción: BaseDashboardAlertCardViewComponent
 *
 * @displayName BaseDashboardAlertCardViewComponent
 *
 */

const BaseAlertCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseAlertCardViewComponent'
    );

export default {
    name: 'BaseDashboardAlertCardViewComponent',

    props: {
        label: {
            type: String,
            default: undefined,
        },

        src: {
            type: String,
            default:
                'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
        },
    },

    components: { BaseAlertCardViewComponent },

    computed: {
        iconSetUp() {
            return {
                src: this.src,
            };
        },
    },
};
</script>

<template>
    <BaseAlertCardViewComponent :icon="iconSetUp" :label="label" />
</template>
