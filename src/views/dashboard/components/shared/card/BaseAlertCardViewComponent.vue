<script>
/**
 * Descripción: Pantalla  BaseAlertCardViewComponent
 *
 * @displayName BaseAlertCardViewComponent
 *
 */

const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

export default {
    name: 'BaseAlertCardViewComponent',

    props: {
        card: {
            type: Object,
            default: () => ({
                color: 'aidMint400',
                borderColor: 'aidMint500',
                display: {
                    justify: 'justify-center',
                },
            }),
        },

        icon: {
            type: Object,
            requiered: true,
            // default: () => ({
            //     src: undefined,
            //     color: undefined,
            //     backgroundColor: undefined,
            // }),
        },

        label: {
            type: String,
            default: undefined,
        },
    },

    components: { BaseCustomCardViewComponent },

    computed: {
        cardSetUp() {
            return {
                width: this.$vuetify.breakpoint.mobile
                    ? 'auto'
                    : this.card?.width,
                height: 'auto',
                color: this.card?.color,
                borderColor: this.card?.borderColor,
                display: {
                    justify: this.card?.display?.justify,
                },
            };
        },

        iconSetUp() {
            return {
                src: this.icon?.src,
                color: this.icon?.color || 'white',
                backgroundColor: this.icon?.backgroundColor || 'aidBlue900',
            };
        },
    },
};
</script>

<template>
    <BaseCustomCardViewComponent :card="cardSetUp" :icon="iconSetUp">
        <div slot="column">
            <div
                class="BUO-Label-XSmall grey600--text px-4 pb-2"
                v-html="label"
            ></div>
        </div>
    </BaseCustomCardViewComponent>
</template>
