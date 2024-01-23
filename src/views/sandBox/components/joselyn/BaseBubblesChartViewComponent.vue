<script>
/**
 * Descripción: Pantalla  BaseBubblesChartViewComponent
 *
 * @displayName BaseBubblesChartViewComponent
 *
 */
import { mapGetters } from 'vuex';

import baseArrayHelper from '@/helpers/baseArrayHelper.js';

const BaseCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCardViewComponent'
    );

const BaseTooltipViewComponent = () =>
    import(
        '@/views/sandBox/components/dashboard/shared/tooltip/BaseTooltipViewComponent'
    );

export default {
    name: 'BaseBubblesChartViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        showLegend: {
            type: Boolean,
            default: true,
        },

        // top, bottom, left, right
        positionLegend: {
            type: String,
            default: 'right',
        },

        entity: {
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

        directionLegends() {
            switch (this.positionLegend) {
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

        shuffleChartData() {
            return baseArrayHelper.ShuffleArray(this.entity);
        },
    },

    methods: {
        $_showCircle(item) {
            item.show = !item.show;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <section class="d-flex" :class="directionLegends">
                <section
                    :class="`${
                        $vuetify.breakpoint.mobile
                            ? 'graphic-sm-container'
                            : 'graphic-container w-70'
                    }`"
                >
                    <section
                        v-for="(item, index) in shuffleChartData"
                        :key="index"
                    >
                        <BaseTooltipViewComponent>
                            <div slot="activator">
                                <div
                                    v-if="item.show"
                                    class="circle rounded-pill"
                                    :class="`${item.style}`"
                                    :style="{
                                        order: index,
                                        boxShadow: '1px 1px 10px',
                                        backgroundColor: `${item.color}`,
                                    }"
                                ></div>
                            </div>

                            <div slot="title" class="BUO-Label-XSmall">
                                {{ item.name }}
                            </div>
                            <div slot="text" class="BUO-Paragraph-Medium">
                                {{ item.value }}
                            </div>
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
                    </section>
                </section>
                <section
                    v-if="showLegend && !$vuetify.breakpoint.mobile"
                    class="d-flex flex-wrap"
                    :class="`${
                        this.positionLegend === 'right' ||
                        this.positionLegend === 'left'
                            ? 'flex-column justify-center w-30'
                            : 'flex-row justify-center align-center pt-3'
                    }`"
                >
                    <section
                        v-for="(item, index) in shuffleChartData"
                        :key="index"
                    >
                        <section
                            class="d-flex flex-row align-center"
                            @click="$_showCircle(item)"
                        >
                            <v-icon :color="item.color" class="pb-4">
                                {{ item.iconLegend }}
                            </v-icon>
                            <p
                                class="BUO-Label-XSmall"
                                :class="[
                                    !item.show &&
                                        'text-decoration-line-through',
                                    app ? 'white--text' : 'grey700--text',
                                ]"
                            >
                                {{ item.name }} |
                                <strong class="BUO-Label-Small-SemiBold"
                                    >{{ item.value }}%</strong
                                >
                            </p>
                        </section>
                    </section>
                </section>
            </section>
        </div>
    </BaseCardViewComponent>
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
</style>
