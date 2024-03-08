<script>
/**
 * Descripción: Grafico Burbuja Custom reutilizable
 *
 * @displayName BaseCustomBubbleChart
 */

import { v4 as uuidv4 } from 'uuid';

import baseArrayHelper from '@/helpers/baseArrayHelper';

const BaseTooltipViewComponent = () =>
    import('@/components/core/tooltip/BaseTooltipViewComponent');

export default {
    name: 'BaseCustomBubbleChart',

    props: {
        chartData: {
            type: Object,
            required: true,
        },

        chartOptions: {
            type: Object,
            default: () => {},
        },
    },

    components: {
        BaseTooltipViewComponent,
    },

    data() {
        return {
            componentKey: 0,
            refBubble: 'BaseCustomBubbleChart_',
        };
    },

    computed: {
        datasets() {
            return this.chartData.datasets;
        },

        alignLegend() {
            switch (this.chartOptions?.plugins?.legend?.position) {
                case 'left':
                    return 'flex-row-reverse justify-space-around';
                case 'right':
                    return 'flex-row justify-space-around';
                case 'top':
                    return 'flex-column-reverse align-center';
                case 'bottom':
                    return 'flex-column align-center';
                default:
                    return 'flex-row';
            }
        },

        alignText() {
            return this.chartOptions?.plugins?.legend?.position
                ? this.chartOptions.plugins.legend.position === 'right' ||
                  this.chartOptions.plugins.legend.position === 'left'
                    ? 'flex-column justify-center w-30'
                    : 'flex-row justify-center align-center pt-3'
                : 'flex-column justify-center w-30';
        },

        showLabels() {
            if (!this.chartOptions?.plugins?.legend?.display) {
                return false;
            }

            return this.chartData?.labels && this.chartData?.labels?.length > 0
                ? true
                : false;
        },

        iconLegend() {
            return `mdi-${
                this.chartOptions?.plugins?.legend?.icon
                    ? this.chartOptions?.plugins?.legend?.icon
                    : 'circle-medium'
            }`;
        },

        app() {
            return this.chartOptions?.plugins?.legend?.labels?.isDarkTheme
                ? this.chartOptions?.plugins?.legend?.labels?.isDarkTheme
                : false;
        },

        styleLabels() {
            return {
                name: this.chartOptions?.plugins?.legend?.labels?.font?.name
                    ? this.chartOptions?.plugins?.legend?.labels?.font?.name
                    : 'BUO-Label-XSmall',
                value: this.chartOptions?.plugins?.legend?.labels?.font?.value
                    ? this.chartOptions?.plugins?.legend?.labels?.font?.value
                    : 'BUO-Label-Small-SemiBold',
            };
        },

        innerWidth() {
            return this.chartOptions?.plugins?.legend?.innerWidth;
        },

        styleTooltip() {
            return {
                name: this.chartOptions?.plugins?.legend?.tooltip?.font?.name
                    ? this.chartOptions?.plugins?.legend?.tooltip?.font?.name
                    : 'BUO-Label-XSmall',
                value: this.chartOptions?.plugins?.legend?.tooltip?.font?.value
                    ? this.chartOptions?.plugins?.legend?.tooltip?.font?.value
                    : 'BUO-Paragraph-Medium',
            };
        },
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refBubble = this.refBubble + randomID;

        this.$_configDatasets();
    },

    methods: {
        $_showCircle(index) {
            this.chartData.datasets[index].show =
                !this.chartData.datasets[index].show;
            this.componentKey++;
        },

        $_shuffleChartData() {
            return baseArrayHelper.ShuffleArray(this.chartData?.datasets);
        },

        $_configDatasets() {
            this.chartData.datasets = this.chartData.datasets.map(
                (element, index) => ({
                    ...element,
                    size: `size-${index}`,
                    show: true,
                })
            );

            this.$_shuffleChartData();
        },
    },
};
</script>

<template>
    <section class="d-flex" :class="alignLegend" :key="componentKey">
        <!--Bubbles-->
        <section
            :class="`${
                innerWidth < 1450 ||
                innerWidth < 1300 ||
                $vuetify.breakpoint.mobile
                    ? 'graphic-sm-container'
                    : 'graphic-container w-70'
            }`"
        >
            <section v-for="(item, index) in datasets" :key="index">
                <BaseTooltipViewComponent>
                    <div slot="activator">
                        <div
                            v-if="item.show"
                            transition="fab-transition"
                            class="circle rounded-pill scale-up-center"
                            :class="`${item.size ? item.size : 'size-0'}`"
                            :style="{
                                order: index,
                                boxShadow: '1px 1px 10px',
                                backgroundColor: `${
                                    item.backgroundColor
                                        ? item.backgroundColor
                                        : '#4C798E'
                                }`,
                            }"
                        />
                    </div>
                    <div
                        slot="title"
                        :class="styleTooltip.name"
                        v-if="item.label"
                    >
                        {{ item.label }}
                    </div>
                    <div
                        slot="text"
                        :class="styleTooltip.value"
                        v-if="item.data"
                    >
                        {{ item.data }}
                    </div>
                </BaseTooltipViewComponent>
            </section>
        </section>
        <!--Label-->
        <section v-if="showLabels" class="d-flex flex-wrap" :class="alignText">
            <section v-for="(item, index) in datasets" :key="index">
                <section
                    class="d-flex flex-row align-center px-1"
                    style="cursor: pointer"
                    transition="fab-transition"
                    @click="$_showCircle(index)"
                >
                    <v-icon
                        :color="`${
                            item.backgroundColor
                                ? item.backgroundColor
                                : '#4C798E'
                        }`"
                        class="pb-4"
                    >
                        {{ iconLegend }}
                    </v-icon>
                    <p
                        :class="[
                            styleLabels.name,
                            !item.show && 'text-decoration-line-through',
                            app ? 'white--text' : 'grey700--text',
                        ]"
                    >
                        {{ item.label }} |
                        <strong :class="styleLabels.value">{{
                            item.data
                        }}</strong>
                    </p>
                </section>
            </section>
        </section>
    </section>
</template>

<style scoped>
.w-70 {
    width: 70%;
}

.w-30 {
    width: 30%;
}
.graphic-sm-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 15px;
}
.graphic-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 15px;
    height: 300px !important;
    justify-content: center;
    align-content: center;
}
.size-0 {
    width: 142px;
    height: 142px;
}

.size-1 {
    width: 107px;
    height: 107px;
}

.size-2 {
    width: 87px;
    height: 87px;
}

.size-3 {
    width: 60px;
    height: 60px;
}
.size-4 {
    width: 21px;
    height: 21px;
}

.circle:hover {
    transform: scale(1.2);
    animation: none;
}

.scale-up-center {
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
        both;
    animation: scale-up-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes scale-up-center {
    0% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
@keyframes scale-up-center {
    0% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
    }
    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}
</style>
