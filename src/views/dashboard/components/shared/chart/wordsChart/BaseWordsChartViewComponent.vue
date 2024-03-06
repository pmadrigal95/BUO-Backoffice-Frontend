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

        isOnlyChart: {
            type: Boolean,
            default: true,
        },

        chartColumns: {
            type: [Number, String],
            default: 12,
        },

        contentColumns: {
            type: [Number, String],
            default: 12,
        },
    },

    components: {
        BaseCardViewComponent,
        BaseTooltipViewComponent,
    },

    data() {
        return {
            showContent: !this.isOnlyChart,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        md() {
            return this.showContent ? this.chartColumns : 12;
        },

        $_shuffleChartData() {
            return baseArrayHelper.ShuffleArray(this.chartData);
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <section slot="top-actions">
            <v-btn
                v-if="!isOnlyChart"
                icon
                :color="app ? 'clouds' : 'black'"
                @click="showContent = !showContent"
            >
                <v-icon>{{
                    `mdi-${
                        showContent ? 'information' : 'information-off-outline'
                    }`
                }}</v-icon>
            </v-btn>
        </section>
        <section slot="card-text">
            <v-row>
                <v-col cols="12" :md="md" align-self="center">
                    <v-container class="mx-auto">
                        <masonry
                            class="mt-4"
                            :cols="{ default: 4, 1000: 3, 700: 2, 430: 1 }"
                            :gutter="{ default: '30px', 700: '15px' }"
                            style="justify-content: center !important"
                        >
                            <div
                                v-for="(item, index) in $_shuffleChartData"
                                :key="index"
                                class="mx-n2"
                            >
                                <BaseTooltipViewComponent>
                                    <div slot="activator">
                                        <v-hover
                                            v-slot="{ hover }"
                                            open-delay="200"
                                        >
                                            <v-card
                                                :elevation="hover ? 8 : 0"
                                                :class="{ 'on-hover': hover }"
                                                outlined
                                                flat
                                                class="d-flex align-center justify-center rounded-lg my-3"
                                                :min-height="
                                                    item.bold ? 100 : 50
                                                "
                                                :color="
                                                    hover
                                                        ? app
                                                            ? 'blue700'
                                                            : 'clouds'
                                                        : 'default'
                                                "
                                            >
                                                <v-card-text
                                                    class="buo-word-break text-center"
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
                                    <div slot="text">
                                        {{ item.value }} votos
                                    </div>
                                </BaseTooltipViewComponent>
                            </div>
                        </masonry>
                    </v-container>
                </v-col>
                <v-col
                    cols="12"
                    :md="contentColumns"
                    align-self="center"
                    v-if="showContent"
                >
                    <slot name="content"></slot>
                </v-col>
            </v-row>
        </section>
    </BaseCardViewComponent>
</template>
