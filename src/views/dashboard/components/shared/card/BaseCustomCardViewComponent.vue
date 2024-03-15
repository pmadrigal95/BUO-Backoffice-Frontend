<script>
/**
 * Descripción: Pantalla Card que maneja la cantidad de columnas que necesite
 *
 * @displayName BaseCustomCardViewComponent
 *
 */

export default {
    name: 'BaseCustomCardViewComponent',

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
                    rounded: 'lg',
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
    },

    computed: {
        cardSetUp() {
            return {
                width: this.card?.width || '100%',
                height: this.card?.height || '100%',
                color: this.card?.color,
                elevation: this.card?.elevation || 0,
                borderColor: this.card?.borderColor || this.card?.color,
                content: this.card?.content || 'pa-0',
                display: {
                    rounded: this.card?.display?.rounded || 'lg',
                    flex: this.card?.display?.flex || 'flex-row',
                    justify: this.card?.display?.justify,
                    align: this.card?.display?.align || 'align-center',
                },
            };
        },

        cardDisplaySetUp() {
            return {
                ...this.cardSetUp?.display,
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

        iconSizeSetUp() {
            return {
                ...this.iconSetUp?.size,
            };
        },

        iconContainerSetUp() {
            return {
                ...this.iconSetUp?.container,
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

        headerStyleSetUp() {
            return `${this.headerSetUp?.color} ${this.headerSetUp?.style} ${this.headerSetUp?.content}`;
        },

        isvalidIcon() {
            return this.iconSetUp?.src.includes('mdi-');
        },
    },
};
</script>

<template>
    <v-sheet
        outlined
        :rounded="cardDisplaySetUp.rounded"
        :color="cardSetUp.borderColor"
        width="100%"
        height="100%"
    >
        <v-card
            :class="`rounded-${cardDisplaySetUp.rounded}`"
            :color="cardSetUp.color"
            :width="cardSetUp.width"
            :height="cardSetUp.height"
            :elevation="cardSetUp.elevation"
        >
            <v-card-text :class="cardSetUp.content">
                <section v-if="icon.src">
                    <v-card
                        :width="iconContainerSetUp.width"
                        :height="iconContainerSetUp.height"
                        :color="iconSetUp.backgroundColor"
                        class="d-flex justify-start align-center rounded-xxl img-position"
                    >
                        <v-card-text>
                            <section class="d-flex flex-row align-center">
                                <v-icon
                                    v-if="isvalidIcon"
                                    :color="iconSetUp.color"
                                >
                                    {{ iconSetUp.src }}
                                </v-icon>
                                <v-img
                                    contain
                                    v-else
                                    :width="iconSizeSetUp.width"
                                    :height="iconSizeSetUp.height"
                                    :src="iconSetUp.src"
                                    :lazy-src="iconSetUp.src"
                                />
                                <p
                                    v-if="headerSetUp.title"
                                    :class="headerStyleSetUp"
                                >
                                    {{ headerSetUp.title }}
                                </p>
                            </section>
                        </v-card-text>
                    </v-card>
                </section>

                <section
                    class="d-flex mb-4"
                    :class="`${cardDisplaySetUp.flex} ${cardDisplaySetUp.justify} ${cardDisplaySetUp.align}`"
                >
                    <slot name="column"></slot>
                </section>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<style scoped>
.img-position {
    top: -20px;
    left: 15px;
    position: relative !important;
}
</style>
