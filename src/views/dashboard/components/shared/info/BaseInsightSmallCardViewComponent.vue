<script>
/**
 * Descripción: BaseInsightSmallCardViewComponent
 *
 * @displayName BaseInsightSmallCardViewComponent
 *
 */
const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

export default {
    name: 'BaseInsightSmallCardViewComponent',

    props: {
        src: {
            type: String,
            default:
                'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/more-insights.svg',
        },

        header: {
            type: Object,
            default: () => ({
                title: {
                    color: 'aidBlue900',
                    style: 'BUO-Label-Small-SemiBold',
                    label: '¿Quieres obtener más insights?',
                },
                subtitle: {
                    color: 'aidBlue900',
                    style: 'BUO-Label-Small pt-3',
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
                width: '278px',
                height: '195px',
                color: 'aidMint500',
                display: {
                    justify: 'justify-start',
                },
            }),
        },
    },

    components: { BaseCustomCardViewComponent },

    computed: {
        cardSetUp() {
            return {
                width: this.card?.width || '278px',
                height: this.card?.height || '195px',
                content: this.card?.content || 'pa-1',
                color: this.card?.color || 'aidMint500',
                borderColor: this.card?.borderColor || this.card?.color,
                display: {
                    justify: this.card?.display?.justify || 'justify-start',
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
    <BaseCustomCardViewComponent
        :src="src"
        :card="cardSetUp"
        style="max-width: 290px"
    >
        <div slot="column" class="text-start px-4 pt-2" style="max-width: 70%">
            <section>
                <strong :class="`${titleSetUp.style} ${titleSetUp.color}--text`"
                    >{{ titleSetUp.label }}
                </strong>
                <p
                    :class="`${subtitleSetUp.style} ${subtitleSetUp.color}--text`"
                >
                    {{ subtitleSetUp.label }}
                </p>
                <v-btn
                    style="z-index: 1"
                    dark
                    outlined
                    :color="btnSetUp.color"
                    @click="btnSetUp.action"
                    :class="`${btnSetUp.style} ${btnSetUp.color}--text`"
                    >{{ btnSetUp.label }}</v-btn
                >
            </section>
        </div>
        <div slot="column" style="position: absolute; right: 0; top: 0">
            <v-img contain max-height="200px" :src="src"> </v-img>
        </div>
    </BaseCustomCardViewComponent>
</template>
