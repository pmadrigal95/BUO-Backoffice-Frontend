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
        '@/views/sandBox/components/dashboard/shared/card/BaseCardViewComponent'
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
            requiered: true,
        },

        isPDA: {
            type: Boolean,
            default: false,
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
                    return 'flex-row-reverse';
                case 'right':
                    return 'flex-row';
                case 'top':
                    return 'flex-column-reverse';
                case 'bottom':
                    return 'flex-column';
                default:
                    return 'flex-row';
            }
        },

        shuffleChartData() {
            return baseArrayHelper.ShuffleArray(this.entity);
        },
    },

    methods: {
        $_showCircle() {
            alert('hola');
        },
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <section
                class="d-flex justify-space-around"
                :class="directionLegends"
            >
                <section class="graphic-container">
                    <section
                        v-for="(item, index) in shuffleChartData"
                        :key="index"
                    >
                        <BaseTooltipViewComponent>
                            <div slot="activator">
                                <div
                                    class="circle rounded-pill"
                                    :class="`${item.style} ${item.color}`"
                                    :style="{
                                        order: index,
                                    }"
                                ></div>
                            </div>

                            <div
                                slot="title"
                                class="BUO-Label-XSmall grey700--text"
                            >
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
                    v-if="showLegend"
                    class="d-flex"
                    :class="`${
                        this.positionLegend === 'right' ||
                        this.positionLegend === 'left'
                            ? 'flex-column justify-center'
                            : 'flex-row justify-center align-center'
                    }`"
                >
                    <section v-for="(item, index) in entity" :key="index">
                        <section
                            class="d-flex flex-row align-center pl-4"
                            @click="$_showCircle"
                        >
                            <v-icon :color="item.color" class="pb-3">
                                mdi-circle-medium
                            </v-icon>
                            <p class="BUO-Label-XSmall grey700--text">
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
.graphic-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
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

.circle {
    box-shadow: 5px 5px;
}
.circle:hover {
    transform: scale(1.2);
    animation: none;
}
</style>
