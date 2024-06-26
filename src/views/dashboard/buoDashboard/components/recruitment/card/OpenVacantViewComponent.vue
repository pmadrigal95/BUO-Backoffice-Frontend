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

        fn: {
            type: Function,
            default: undefined,
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
            return this.chartData?.list.filter((x) => x.chart);
        },

        rowList() {
            return this.chartData?.list.filter((x) => !x.chart);
        },
    },

    methods: {
        $_returnToView(id) {
            this.$router.push({
                name: 'BuoRecruitmentDashboardViewComponent',
                params: { Id: id },
            });
        },

        $_callToAction(item) {
            if (this.fn) {
                this.fn(item);
                return;
            }
            this.$_returnToView(item.id);
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
                        :isPercentage="item.percentage"
                        :maxValue="item.percentage ? 100 : chartData.maxNumber"
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

            <section class="mt-3">
                <v-layout justify-end align-end>
                    <a
                        @click="$_callToAction(chartData)"
                        :class="[app ? 'blue600--text' : 'blue900--text']"
                        class="no-uppercase rounded-lg BUO-Paragraph-Small"
                    >
                        Ver más
                    </a>
                </v-layout>
            </section>
        </section>
    </BaseCustomCardViewComponent>
</template>
