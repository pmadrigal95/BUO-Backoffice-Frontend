<script>
/**
 * Descripción: Pantalla  OpenVacantViewComponent
 *
 * @displayName OpenVacantViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

const ProgressCircularComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressCircularChart/ProgressCircularComponent'
    );

const BaseRowDisplayViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/row-display/BaseRowDisplayViewComponent'
    );

export default {
    name: 'OpenVacantViewComponent',

    props: {
        chartData: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        ProgressCircularComponent,
        BaseRowDisplayViewComponent,
        BaseCustomCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        cardSetUp() {
            return {
                width: '360px',
                display: {
                    rounded: 'xl',
                },
            };
        },

        chartList() {
            return this.chartData?.list.filter((x) => x.isChart);
        },

        rowList() {
            return this.chartData?.list.filter((x) => !x.isChart);
        },
    },
};
</script>

<template>
    <BaseCustomCardViewComponent :card="cardSetUp" v-if="chartData">
        <section slot="container">
            <section
                class="my-5 mx-4 BUO-Label-Small-SemiBold"
                :class="[app ? 'white--text' : 'grey700--text']"
            >
                {{ chartData.title }}
            </section>

            <section class="d-flex flex-wrap mb-10">
                <div v-for="(item, i) in chartList" :key="i" class="ma-auto">
                    <ProgressCircularComponent
                        :title="item.name"
                        :value="item.value"
                        :isPercentage="item.isPercentage"
                        :maxValue="
                            item.isPercentage ? 100 : chartData.maxNumber
                        "
                    />
                </div>
            </section>

            <section class="d-flex flex-column">
                <div v-for="(item, i) in rowList" :key="i" class="ma-2">
                    <BaseRowDisplayViewComponent
                        :title="item.name"
                        :value="item.value"
                    />
                </div>
            </section>
        </section>
    </BaseCustomCardViewComponent>
</template>
