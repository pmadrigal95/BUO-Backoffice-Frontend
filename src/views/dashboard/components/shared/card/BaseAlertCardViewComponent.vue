<script>
/**
 * Descripción: Pantalla  BaseAlertCardViewComponent
 *
 * @displayName BaseAlertCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

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
                content: 'pa-2',
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
        ...mapGetters('theme', ['app']),

        cardSetUp() {
            return {
                content: this.card?.content || 'pa-2',
                width: this.$vuetify.breakpoint.mobile
                    ? 'auto'
                    : this.card?.width,
                height: 'auto',
                color: this.card?.color || 'aidMint400',
                borderColor: this.card?.borderColor || 'aidMint500',
                display: {
                    justify: this.card?.display?.justify || 'justify-center',
                },
            };
        },

        iconSetUp() {
            return {
                src: this.icon?.src,
                color: this.icon?.color || this.app ? 'black' : 'white',
                backgroundColor:
                    this.icon?.backgroundColor || this.app
                        ? 'blue-grey darken-2'
                        : 'aidBlue900',
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
            />
        </div>
    </BaseCustomCardViewComponent>
</template>
