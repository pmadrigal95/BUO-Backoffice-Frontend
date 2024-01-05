<script>
/**
 * Descripción: Pantalla  BasePieChartViewComponent
 *
 * @displayName BasePieChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

import baseDataVisualizationColorsHelperPDA from '@/views/demographics/pda/components/shared/baseDataVisualizationColorsHelper';

const BasePieChartImpl = () =>
    import('@/components/backoffice/chart/BasePieChartImpl');

const BaseCardViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
    );

export default {
    name: 'BasePieChartViewComponent',

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
    },

    components: {
        BasePieChartImpl,
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

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
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <BasePieChartImpl
                :chartData="chartConfig"
                positionLegend="right"
                :dark="app"
                :showLegend="showLegend && !$vuetify.breakpoint.mobile"
                :isPie="isPie"
            />
        </div>
    </BaseCardViewComponent>
</template>
