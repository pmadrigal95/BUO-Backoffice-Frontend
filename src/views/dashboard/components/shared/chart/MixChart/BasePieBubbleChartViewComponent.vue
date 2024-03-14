<script>
/**
 * Descripción: Pantalla  BasePieBubbleChartViewComponent
 *
 * @displayName BasePieBubbleChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

import baseDataVisualizationColorsHelperPDA from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BasePieChartImpl = () =>
    import('@/components/backoffice/chart/BasePieChartImpl');

const BaseCustomBubbleChartImpl = () =>
    import('@/components/backoffice/chart/BaseCustomBubbleChartImpl');

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'BasePieBubbleChartViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        chartData: {
            type: Object,
            requiered: true,
        },

        showLegend: {
            type: Boolean,
            default: true,
        },

        isPDA: {
            type: Boolean,
            default: false,
        },

        isPie: {
            type: Boolean,
            default: false,
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
        BasePieChartImpl,
        BaseCustomBubbleChartImpl,
        BaseBasicCardViewComponent,
    },

    data() {
        return {
            isBubbleChart: true,
            showContent: !this.isOnlyChart,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        md() {
            return this.showContent ? this.chartColumns : 12;
        },

        chartConfig() {
            return {
                labels: this.chartData.labels,
                datasets: [
                    {
                        ...this.$_setDatasets(),
                        data: this.chartData.data,
                    },
                ],
            };
        },
    },

    methods: {
        $_setColor(array) {
            let colorPaletteList = [];
            array.forEach((element, index) => {
                colorPaletteList.push(
                    baseDataVisualizationColorsHelper.$_getColor(index)
                );
            });

            return colorPaletteList;
        },

        $_setDatasets() {
            if (this.isPDA) {
                return {
                    backgroundColor: this.chartData.colors.map((profile) =>
                        baseDataVisualizationColorsHelperPDA.$_getColor({
                            profile: profile.toLowerCase(),
                            type: 'backgroundColor',
                        })
                    ),
                    hoverBackgroundColor: this.chartData.colors.map((profile) =>
                        baseDataVisualizationColorsHelperPDA.$_getColor({
                            profile: profile.toLowerCase(),
                            type: 'hoverBackgroundColor',
                        })
                    ),
                    hoverBorderColor: this.chartData.colors.map((profile) =>
                        baseDataVisualizationColorsHelperPDA.$_getColor({
                            profile: profile.toLowerCase(),
                            type: 'hoverBorderColor',
                        })
                    ),
                    borderColor: this.chartData.colors.map((profile) =>
                        baseDataVisualizationColorsHelperPDA.$_getColor({
                            profile: profile.toLowerCase(),
                            type: 'borderColor',
                        })
                    ),
                };
            } else {
                return {
                    backgroundColor: this.$_setColor(this.chartData.data).map(
                        (colorPalette) => colorPalette.secondary80
                    ),
                    hoverBackgroundColor: this.$_setColor(
                        this.chartData.data
                    ).map((colorPalette) => colorPalette.main),

                    hoverBorderColor: this.$_setColor(this.chartData.data).map(
                        (colorPalette) => colorPalette.secondary80
                    ),

                    borderColor: this.$_setColor(this.chartData.data).map(
                        (colorPalette) => colorPalette.main
                    ),
                };
            }
        },
    },
};
</script>

<template>
    <BaseBasicCardViewComponent :title="title">
        <section slot="top-actions">
            <v-btn
                icon
                :color="app ? 'clouds' : 'black'"
                @click="isBubbleChart = !isBubbleChart"
            >
                <v-icon>{{
                    `mdi-${isBubbleChart ? 'chart-pie' : 'chart-bubble'}`
                }}</v-icon>
            </v-btn>

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
                    <BaseCustomBubbleChartImpl
                        v-if="isBubbleChart"
                        :chartData="chartConfig"
                        positionLegend="right"
                        :dark="app"
                        :showLegend="showLegend && !$vuetify.breakpoint.mobile"
                    />
                    <BasePieChartImpl
                        v-else
                        :chartData="chartConfig"
                        positionLegend="right"
                        :dark="app"
                        :showLegend="showLegend && !$vuetify.breakpoint.mobile"
                        :isPie="isPie"
                    />
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
    </BaseBasicCardViewComponent>
</template>
