<script>
/**
 * Descripción: Pantalla  WordsChartViewComponent
 *
 * @displayName WordsChartViewComponent
 *
 */

import { mapGetters } from 'vuex';

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
    },
};
</script>

<template>
    <BaseCardViewComponent :title="title">
        <div slot="card-text">
            <masonry
                :cols="{ default: 4, 1000: 3, 700: 2, 430: 1 }"
                :gutter="{ default: '30px', 700: '15px' }"
            >
                <div
                    v-for="(item, index) in chartData"
                    :key="index"
                    class="mx-n2"
                >
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
                    </BaseTooltipViewComponent>
                </div>
            </masonry>
        </div>
    </BaseCardViewComponent>
</template>
