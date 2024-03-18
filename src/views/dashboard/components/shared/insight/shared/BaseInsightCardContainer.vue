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
                height: '100%',
                color: undefined,
                borderColor: undefined,
                content: 'pa-0',
                elevation: 0,
                display: {
                    rounded: 'xl',
                    flex: 'flex-row',
                    justify: undefined,
                    align: 'align-center',
                },
            }),
        },

        icon: {
            type: Object,
            default: () => ({
                src: undefined,
                size: {
                    width: '17px',
                    height: '19px',
                },
                container: {
                    width: '49px',
                    height: '39px',
                },
                color: undefined,
                backgroundColor: undefined,
            }),
        },

        header: {
            type: Object,
            default: () => ({
                title: undefined,
                color: 'aidMint500--text',
                style: 'BUO-Label-Small',
                content: 'pt-4',
            }),
        },

        body: {
            type: Object,
        },

        list: {
            type: Array,
            required: true,
        },

        tooltip: {
            type: Object,
            default: () => ({
                title: undefined,
                text: undefined,
                color: 'grey700',
            }),
        },
    },

    components: { BaseCustomCardViewComponent },

    computed: {
        cardSetUp() {
            return {
                width: this.card?.width || '100%',
                height: this.card?.height || '100%',
                color: this.body?.color ? this.body?.color : this.card?.color,
                elevation: this.card?.elevation || 0,
                borderColor: this.card?.borderColor || this.card?.color,
                content: this.card?.content || 'pa-0',
                display: {
                    rounded: this.card?.display?.rounded || 'xl',
                    flex: this.card?.display?.flex || 'flex-row',
                    justify: this.card?.display?.justify,
                    align: this.card?.display?.align || 'align-center',
                },
            };
        },

        iconSetUp() {
            return {
                src: this.icon?.src,
                size: {
                    width: this.icon?.size?.width || '17px',
                    height: this.icon?.size?.height || '19px',
                },
                container: {
                    width: this.icon?.container?.width || '49px',
                    height: this.icon?.container?.height || '39px',
                },
                color: this.icon?.color,
                backgroundColor: this.icon?.backgroundColor || this.icon?.color,
            };
        },

        headerSetUp() {
            return {
                title: this.header?.title,
                color: this.header?.color || 'aidMint500--text',
                style: this.header?.style || 'BUO-Label-Small',
                content: this.header?.content || 'pt-4',
            };
        },

        bodySetUp() {
            return {
                title: this.body?.title || 'Insights estadísticos',
                color: this.body?.color,
                image: this.body?.image,
            };
        },

        tooltipSetUp() {
            return {
                title: this.tooltip?.title,
                text: this.tooltip?.text,
                color: this.tooltip?.color,
            };
        },
    },
};
</script>

<template>
    <BaseCustomCardViewComponent
        :card="cardSetUp"
        :icon="iconSetUp"
        :header="headerSetUp"
        :tooltip="tooltipSetUp"
    >
        <section slot="container">
            <v-container fluid>
                <span class="BUO-Paragraph-Large-SemiBold aidBlue900--text">{{
                    this.bodySetUp?.title
                }}</span>
            </v-container>
        </section>

        <section slot="column">
            <span>Hola</span>
        </section>

        <section slot="column" class="pl-4" v-if="!$vuetify.breakpoint.mobile">
            <v-img contain height="100%" :src="bodySetUp.image" />
        </section>
    </BaseCustomCardViewComponent>
</template>
