<script>
/**
 * Descripción: Pantalla  WordsChartViewComponent
 *
 * @displayName WordsChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/views/dashboard/components/shared/card/BaseCardViewComponent');

const BaseTooltipViewComponent = () =>
    import('@/components/core/tooltip/BaseTooltipViewComponent');

export default {
    name: 'WordsChartViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        chartData: {
            type: Array,
            requiered: true,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseTooltipViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        $_shuffleChartData() {
            return baseArrayHelper.ShuffleArray(this.fakeData);
        },

        fakeData() {
            return [
                {
                    name: 'Salarios',
                    bold: true,
                    value: 1,
                },
                {
                    name: 'Días de vacaciones',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'WFH',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'Beneficios',
                    bold: true,
                    value: 1,
                },
                {
                    name: 'Ambiente laboral',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'Poca motivación',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'WFH',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'Falta de crecimiento',
                    bold: false,
                    value: 1,
                },
                {
                    name: 'Poca motivación',
                    bold: false,
                    value: 1,
                },
            ];
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <v-container class="mx-auto d-flex justify-center align">
                <masonry
                    class="mt-4"
                    :cols="{
                        default: 3,
                        1000: 3,
                        700: 2,
                        430: 1,
                    }"
                    :gutter="{ default: '25px', 700: '15px' }"
                    style="justify-content: center !important"
                >
                    <div
                        v-for="(item, index) in fakeData"
                        :key="index"
                        class="mx-n2"
                    >
                        <BaseTooltipViewComponent>
                            <div slot="activator">
                                <v-hover v-slot="{ hover }" open-delay="200">
                                    <v-card
                                        :elevation="hover ? 8 : 0"
                                        :class="{ 'on-hover': hover }"
                                        outlined
                                        flat
                                        class="d-flex align-center justify-center rounded-lg my-2 mx-1"
                                        :min-height="
                                            item.bold ? 70 : 'max-content'"
                                        min-width="max-content"
                                        :color="
                                            hover
                                                ? app
                                                    ? 'blue700'
                                                    : 'clouds'
                                                : 'default'
                                        "
                                    >
                                        <v-card-text
                                            class="buo-word-break text-center pa-2"
                                            :class="[
                                                app
                                                    ? item.bold
                                                        ? 'white--text'
                                                        : 'clouds--text'
                                                    : item.bold
                                                    ? 'black--text'
                                                    : 'grey700--text',
                                            ]"
                                        >
                                            <span
                                                :class="[
                                                    item.bold
                                                        ? 'BUO-Heading-Small'
                                                        : 'BUO-Paragraph-Small',
                                                ]"
                                            >
                                                {{ item.name }}
                                            </span>
                                        </v-card-text>
                                    </v-card>
                                </v-hover>
                            </div>

                            <div slot="title">{{ item.name }}</div>
                            <div slot="text">{{ item.value }} votos</div>
                        </BaseTooltipViewComponent>
                    </div>
                </masonry>
            </v-container>
        </div>
    </BaseCardViewComponent>
</template>
