<script>
/**
 * Descripción: Pantalla  BaseBackgroundImgCardViewComponent
 *
 * @displayName BaseBackgroundImgCardViewComponent
 *
 */

const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

export default {
    name: 'BaseBackgroundImgCardViewComponent',

    props: {
        src: {
            type: String,
            default:
                'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-insights.svg',
        },

        card: {
            type: Object,
            default: () => ({
                color: 'aidBlue900',
                display: {
                    rounded: 'xl',
                    justify: 'justify-space-around',
                },
            }),
        },

        icon: {
            type: Object,
        },

        header: {
            type: Object,
        },
    },

    components: { BaseCustomCardViewComponent },

    computed: {
        cardSetUp() {
            return {
                content: this.card?.content || 'pa-2',
                color: this.card?.color || 'aidBlue900',
                height: this.$vuetify.breakpoint.mobile ? 'auto' : 200,
                borderColor: this.card?.borderColor || this.card?.color,
                display: {
                    rounded: this.card?.display?.rounded || 'xl',
                    justify: this.card?.display?.justify || 'justify-center',
                },
            };
        },
    },
};
</script>

<template>
    <BaseCustomCardViewComponent
        :card="cardSetUp"
        :icon="icon"
        :header="header"
    >
        <div slot="column">
            <slot name="container"></slot>
        </div>
        <div slot="column" v-if="!$vuetify.breakpoint.mobile" class="src">
            <v-img contain max-height="200px" :src="src" />
        </div>
    </BaseCustomCardViewComponent>
</template>

<style scoped>
.src {
    top: 0;
    right: 0;
    position: absolute;
}
</style>
