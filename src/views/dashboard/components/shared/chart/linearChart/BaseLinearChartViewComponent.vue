<script>
/**
 * Descripción: Pantalla  BaseLinearChartViewComponent
 *
 * @displayName BaseLinearChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BaseLinearChartImpl = () =>
    import('@/components/backoffice/chart/BaseLinearChartImpl');

const BaseCardViewComponent = () =>
    import('@/views/dashboard/components/shared/card/BaseCardViewComponent');

export default {
    name: 'BaseLinearChartViewComponent',

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
            required: true,
        },

        isRound: {
            type: Boolean,
            default: true,
        },

        aspectRatio: {
            type: Number,
            default: 4,
        },

        requiredLinearGradient: {
            type: Boolean,
            default: true,
        },

        point: {
            type: Number,
            default: 6,
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
        BaseLinearChartImpl,
        BaseCardViewComponent,
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
    },

    created() {
        this.chartData.datasets.forEach((element, index) => {
            const color = baseDataVisualizationColorsHelper.$_getColor(index);
            element.fill = this.requiredLinearGradient;
            element.borderColor = color.main;
            element.borderWidth = 3;
            element.backgroundColor = (ctx) => {
                const canvas = ctx.chart.ctx;
                const gradient = canvas.createLinearGradient(0, 0, 0, 500);

                gradient.addColorStop(0, color.secondary80);
                gradient.addColorStop(0.35, color.secondary60);
                gradient.addColorStop(1, color.transparent);

                return gradient;
            };
        });
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
                    <BaseLinearChartImpl
                        :chartData="chartData"
                        :dark="app"
                        :showLegend="showLegend && !$vuetify.breakpoint.mobile"
                        :isRound="isRound"
                        :aspectRatio="aspectRatio"
                        :point="point"
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
    </BaseCardViewComponent>
</template>
