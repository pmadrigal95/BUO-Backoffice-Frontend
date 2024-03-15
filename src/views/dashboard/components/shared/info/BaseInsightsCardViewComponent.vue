<script>
/**
 * Descripción: BaseInsightsCardViewComponent
 *
 * @displayName BaseInsightsCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseBackgroundImgCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBackgroundImgCardViewComponent'
    );

export default {
    name: 'BaseInsightsCardViewComponent',

    props: {
        src: {
            type: String,
        },

        header: {
            type: Object,
            default: () => ({
                title: {
                    color: 'aidMint500',
                    style: 'BUO-Heading-Small',
                    label: '¿Quieres obtener más insights?',
                },
                subtitle: {
                    color: 'white',
                    style: 'BUO-Paragraph-Large pt-3',
                    label: 'Necesitamos más  datos para  ofrecerte mejores sugerencias.',
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
                color: 'aidBlue900',
                display: {
                    justify: 'justify-space-around',
                },
            }),
        },
    },

    components: { BaseBackgroundImgCardViewComponent },

    computed: {
        ...mapGetters('theme', ['app']),

        cardSetUp() {
            return {
                color: this.card?.color || 'aidBlue900',
                borderColor:
                    this.card?.borderColor || this.app
                        ? 'blue-grey darken-2'
                        : this.card?.color,
                display: {
                    justify: this.card?.display?.justify || 'justify-center',
                },
            };
        },

        headerSetUp() {
            return {
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

        titleSetUp() {
            return { ...this.headerSetUp.title };
        },

        subtitleSetUp() {
            return { ...this.headerSetUp.subtitle };
        },

        btnSetUp() {
            return { ...this.headerSetUp.button };
        },
    },
};
</script>

<template>
    <BaseBackgroundImgCardViewComponent :src="src" :card="cardSetUp">
        <section slot="container">
            <section class="text-center pt-8">
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
