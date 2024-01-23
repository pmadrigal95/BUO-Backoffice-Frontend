<script>
/**
 * Descripción: Pantalla  WordsChartViewComponent
 *
 * @displayName WordsChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/shared/card/BaseCardViewComponent'
    );

const BaseTooltipViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/tooltip/BaseTooltipViewComponent'
    );

export default {
    name: 'WordsChartViewComponent',

    components: {
        BaseCardViewComponent,
        BaseTooltipViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        fake() {
            return [
                { name: 'Salarios', value: '456', bold: true },
                { name: 'Días de vacaciones', value: '342', bold: false },
                { name: 'Ambiente laboral', value: '300', bold: true },
                { name: 'Beneficios', value: '148', bold: false },
                { name: 'Poca motivación', value: '148', bold: false },
                { name: 'Salarios', value: '456', bold: true },
                { name: 'Días de vacaciones', value: '342', bold: false },
                { name: 'Ambiente laboral', value: '300', bold: true },
                { name: 'Beneficios', value: '148', bold: false },
                { name: 'Poca motivación', value: '148', bold: false },
            ];
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Motivos de rotación">
        <div slot="card-text">
            <masonry
                :cols="{ default: 4, 1000: 3, 700: 2, 430: 1 }"
                :gutter="{ default: '30px', 700: '15px' }"
            >
                <div v-for="(item, index) in fake" :key="index" class="mx-n2">
                    <BaseTooltipViewComponent>
                        <div slot="activator">
                            <v-card outlined flat class="rounded-lg my-3">
                                <v-card-text
                                    class="buo-word-break text-center"
                                    :class="[
                                        app ? 'white--text' : 'grey700--text',
                                    ]"
                                >
                                    <div
                                        :class="[
                                            item.bold
                                                ? 'BUO-Heading-Small'
                                                : 'BUO-Paragraph-Medium',
                                        ]"
                                    >
                                        {{ item.name }}
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>

                        <div slot="title">{{ item.name }}</div>
                        <div slot="text">{{ item.value }} votos</div>
                        <div slot="actions">
                            <v-btn
                                class="no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                                :color="app ? 'blueProgress600' : 'blue800'"
                                elevation="0"
                                large
                                text
                            >
                                Ver más
                            </v-btn>
                        </div>
                    </BaseTooltipViewComponent>
                </div>
            </masonry>
        </div>
    </BaseCardViewComponent>
</template>
