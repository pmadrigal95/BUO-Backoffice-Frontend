<script>
/**
 * Descripción: BaseInsightCardContainer
 *
 * @displayName BaseInsightCardContainer
 *
 */

const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

export default {
    name: 'BaseInsightCardContainer',

    props: {
        card: {
            type: Object,
            default: () => ({
                width: '100%',
                height: '110',
                color: 'aidBlue900',
                display: {
                    rounded: 'xl',
                    flex: 'flex-row',
                    justify: 'justify-space-between',
                    align: 'align-center',
                },
            }),
        },

        body: {
            type: Object,
            default: () => ({
                title: undefined,
                titleStyle: {
                    style: 'BUO-Paragraph-Large-SemiBold',
                    color: 'white',
                },
                description: undefined,
                descriptionStyle: {
                    style: 'BUO-Label-XSmall',
                    color: 'white',
                },
                fn: undefined,
            }),
        },
    },

    components: { BaseCustomCardViewComponent },

    computed: {
        cardSetUp() {
            return {
                width: this.card?.width || '100%',
                height: this.$vuetify.breakpoint.mobile
                    ? '100%'
                    : this.card?.height || '100%',
                color: this.card?.color || 'aidBlue900',
                display: {
                    rounded: this.card?.display?.rounded || 'xl',
                    flex: this.card?.display?.flex || 'flex-row',
                    justify: this.card?.display?.justify,
                    align: this.card?.display?.align || 'align-center',
                },
            };
        },

        bodySetUp() {
            return {
                title: this.body?.title,
                titleStyle: {
                    style:
                        this.body?.titleStyle?.style ||
                        'BUO-Paragraph-Large-SemiBold',
                    color: this.body?.titleStyle?.color || 'white',
                },
                description: this.body?.description,
                descriptionStyle: {
                    style:
                        this.body?.descriptionStyle?.style ||
                        'BUO-Label-XSmall',
                    color: this.body?.descriptionStyle?.color || 'white',
                },
                fn: this.body?.fn,
            };
        },

        titleStyleSetUp() {
            return {
                ...this.bodySetUp?.titleStyle,
            };
        },

        descriptionStyleSetUp() {
            return {
                ...this.bodySetUp?.descriptionStyle,
            };
        },
    },
};
</script>

<template>
    <BaseCustomCardViewComponent
        :card="cardSetUp"
        v-if="bodySetUp?.title && bodySetUp?.description"
    >
        <section slot="container" class="mt-6">
            <strong
                :class="`${titleStyleSetUp?.style} ${titleStyleSetUp?.color}--text ma-3`"
                >{{ this.bodySetUp?.title }}</strong
            >
        </section>

        <section slot="column">
            <p
                :class="`${descriptionStyleSetUp?.style} ${descriptionStyleSetUp?.color}--text ma-3`"
            >
                {{ this.bodySetUp?.description }}
            </p>
        </section>

        <section slot="column" class="mr-4">
            <v-icon color="aidMint500"> mdi-chevron-right </v-icon>
        </section>
    </BaseCustomCardViewComponent>
</template>
