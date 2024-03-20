<script>
/**
 * Descripción: Pantalla  BaseMixAiInsightViewComponent
 *
 * @displayName BaseMixAiInsightViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/insight/BaseInsightViewComponent'
    );

const BaseAIDrivenInsightViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/insight/aiDrivenInsight/BaseAIDrivenInsightViewComponent'
    );

export default {
    name: 'BaseMixAiInsightViewComponent',

    props: {
        insight: {
            type: Object,
            default: () => ({
                title: 'Insights estadísticos',
                header: 'Tendencias',
                list: [],
            }),
        },

        aiDrivenInsight: {
            type: Object,
            default: () => ({
                title: 'Insights estadísticos',
                header: 'AI driven insights',
                list: [],
            }),
        },
    },

    components: {
        BaseInsightViewComponent,
        BaseAIDrivenInsightViewComponent,
    },

    data() {
        return {
            tab: null,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        insightSetUp() {
            return {
                title: this.insight?.title || 'Insights estadísticos',
                header: this.insight?.header || 'Tendencias',
                list: this.insight?.list || [],
            };
        },

        aiDrivenInsightSetUp() {
            return {
                title: this.aiDrivenInsight?.title || 'Insights estadísticos',
                header: this.aiDrivenInsight?.header || 'AI driven insights',
                list: this.aiDrivenInsight?.list || [],
            };
        },
    },
};
</script>

<template>
    <section>
        <v-tabs
            v-model="tab"
            right
            show-arrows
            height="34"
            class="pa-3"
            :color="app ? 'blueProgress600' : 'blue800'"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab
                :disabled="insightSetUp?.list.length <= 0"
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-white"
                ><p class="BUO-Label-Small pt-4">{{ insightSetUp?.header }}</p>
            </v-tab>
            <v-tab
                :disabled="aiDrivenInsightSetUp?.list.length <= 0"
                class="rounded-pill no-uppercase mr-3"
                active-class="tab-active-white"
                ><p class="BUO-Label-Small pt-4">
                    {{ aiDrivenInsightSetUp?.header }}
                </p>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pt-5 container-tab">
            <v-tab-item>
                <BaseInsightViewComponent
                    :list="insightSetUp?.list"
                    :title="insightSetUp?.title"
                    :header="insightSetUp?.header"
                />
            </v-tab-item>

            <v-tab-item>
                <BaseAIDrivenInsightViewComponent
                    :list="aiDrivenInsightSetUp?.list"
                    :title="aiDrivenInsightSetUp?.title"
                    :header="aiDrivenInsightSetUp?.header"
                />
            </v-tab-item>
        </v-tabs-items>
    </section>
</template>

<style scoped>
.container-tab {
    background-color: transparent;
}
</style>
