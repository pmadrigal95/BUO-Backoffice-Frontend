<script>
/**
 * Descripción: BaseAIDrivenInsightsCardViewComponent
 *
 * @displayName BaseAIDrivenInsightsCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseBackgroundImgCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBackgroundImgCardViewComponent'
    );

export default {
    name: 'BaseAIDrivenInsightsCardViewComponent',

    props: {
        src: {
            type: String,
        },

        header: {
            type: Object,
            default: () => ({
                chip: {
                    color: 'aidBlue900',
                    rounded: 'rounded-xxl',
                    label: 'AI driven insights',
                    src: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                },
                title: {
                    color: 'aidBlue900',
                    style: 'BUO-Paragraph-Large-SemiBold',
                    label: 'En BUO, nuestra tecnología AI provee indicadores cruciales para decisiones más informadas.',
                },
                subtitle: {
                    color: 'aidBlue900',
                    style: 'BUO-Paragraph-Large pt-3',
                    label: 'Proporcionanos más datos y personalizaremos esta sección para ti.',
                },
                button: {
                    action: undefined,
                    color: 'blue800',
                    style: 'BUO-Paragraph-Small-SemiBold no-uppercase Buo-White-Background rounded-lg',
                    label: 'Empezar proceso',
                },
            }),
        },

        card: {
            type: Object,
            default: () => ({
                color: 'aidMint500',
                display: {
                    justify: 'justify-start',
                },
            }),
        },
    },

    components: { BaseBackgroundImgCardViewComponent },

    computed: {
        ...mapGetters('theme', ['app']),

        cardSetUp() {
            return {
                color: this.card?.color || 'aidMint500',
                borderColor: this.card?.borderColor || this.card?.color,
                display: {
                    justify: this.$vuetify.breakpoint.mobile
                        ? 'justify-center'
                        : this.card?.display?.justify || 'justify-start',
                },
            };
        },

        headerSetUp() {
            return {
                chip: {
                    color: this.header?.chip?.color || 'aidBlue900',
                    rounded: this.header?.chip?.rounded || 'rounded-xxl',
                    label: this.header?.chip?.label || 'AI driven insights',
                    src:
                        this.header?.chip?.src ||
                        'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
                },
                title: {
                    color: this.header?.title?.color || 'aidMint500',
                    style: this.header?.title?.style || 'BUO-Heading-Small',
                    label:
                        this.header?.title?.label ||
                        '¿Quieres obtener más insights?',
                },
                subtitle: {
                    color: this.header?.subtitle?.color || 'white',
                    style:
                        this.header?.subtitle?.style ||
                        'BUO-Paragraph-Large pt-3',
                    label:
                        this.header?.subtitle?.label ||
                        'Necesitamos más  datos para  ofrecerte mejores sugerencias.',
                },
                button: {
                    action: this.header?.button?.action || (() => {}),
                    color: this.header?.button?.color || 'blue800',
                    style:
                        this.header?.button?.style ||
                        'BUO-Paragraph-Small-SemiBold no-uppercase Buo-White-Background rounded-lg',
                    label: this.header?.button?.label || 'Empezar proceso',
                },
            };
        },

        chipSetUp() {
            return { ...this.headerSetUp.chip };
        },

        titleSetUp() {
            return { ...this.headerSetUp.title };
        },

        subtitleSetUp() {
            return { ...this.headerSetUp.subtitle };
        },

        btnSetUp() {
            return { ...this.headerSetUp.button };
        },

        iconSetUp() {
            return this.$vuetify.breakpoint.mobile
                ? {
                      src: this.chipSetUp?.src,
                      container: {
                          width: '190px',
                      },
                      color: this.icon?.color || this.app ? 'black' : 'white',
                      backgroundColor:
                          this.icon?.backgroundColor || this.app
                              ? 'blue-grey darken-2'
                              : 'aidBlue900',
                  }
                : undefined;
        },

        headerChipSetUp() {
            return this.$vuetify.breakpoint.mobile
                ? {
                      title: this.chipSetUp?.label,
                  }
                : undefined;
        },
    },
};
</script>

<template>
    <BaseBackgroundImgCardViewComponent
        :src="src"
        :card="cardSetUp"
        :icon="iconSetUp"
        :header="headerChipSetUp"
    >
        <section
            slot="container"
            class="d-flex mt-1"
            :style="`max-width: ${$vuetify.breakpoint.mobile ? '100%' : '75%'}`"
        >
            <section
                v-if="!$vuetify.breakpoint.mobile"
                class="text-center pt-4 pb-8 px-12 mt-10"
            >
                <v-card
                    width="245px"
                    height="55px"
                    :color="chipSetUp.color"
                    :class="`d-flex justify-start align-center ${chipSetUp.rounded}`"
                >
                    <v-card-text>
                        <section
                            class="d-flex flex-row justify-center align-center"
                        >
                            <v-img
                                contain
                                width="24px"
                                height="27px"
                                :src="chipSetUp.src"
                                :lazy-src="chipSetUp.src"
                            />
                            <p
                                class="BUO-Paragraph-Large-SemiBold aidMint500--text pt-4 pr-1"
                            >
                                {{ chipSetUp.label }}
                            </p>
                        </section>
                    </v-card-text>
                </v-card>
            </section>
            <section
                :class="[
                    !$vuetify.breakpoint.mobile
                        ? 'text-start pt-4 pb-8'
                        : 'text-center',
                ]"
            >
                <strong
                    :class="`${titleSetUp.style} ${titleSetUp.color}--text`"
                >
                    {{ titleSetUp.label }}
                </strong>

                <p
                    :class="`${subtitleSetUp.style} ${subtitleSetUp.color}--text`"
                >
                    {{ subtitleSetUp.label }}
                </p>

                <v-btn
                    dark
                    large
                    outlined
                    :color="btnSetUp.color"
                    @click="btnSetUp.action"
                    :class="`${btnSetUp.style} ${btnSetUp.color}--text`"
                    >{{ btnSetUp.label }}</v-btn
                >
            </section>
        </section>
    </BaseBackgroundImgCardViewComponent>
</template>
