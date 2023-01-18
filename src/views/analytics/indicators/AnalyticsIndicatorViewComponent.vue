<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AnalyticsFilterViewComponent = () =>
    import(
        '@/views/analytics/indicators/components/filters/AnalyticsFilterViewComponent'
    );

const IndicatorsViewComponent = () =>
    import(
        '@/views/analytics/indicators/components/generalView/IndicatorsViewComponent'
    );

export default {
    name: 'AnalyticsViewComponent',

    metaInfo: { title: 'Analytics' },

    components: {
        BaseCardViewComponent,
        AnalyticsFilterViewComponent,
        IndicatorsViewComponent,
    },

    computed: {
        /**
         * analytics
         */
        ...mapGetters('analyticsIndicators', [
            'buoAnalytics',
            'loadingbuoAnalytics',
        ]),
    },

    created() {
        !this.buoAnalytics && this.$_request_buo_analytics();
    },

    methods: {
        ...mapActions('analyticsIndicators', ['$_request_buo_analytics']),
    },
};
</script>

<template>
    <BaseCardViewComponent title="BUO Analytics" md="12" offset="0">
        <div slot="card-text">
            <BaseSkeletonLoader
                v-if="!buoAnalytics || loadingbuoAnalytics"
                type="table-heading, image"
            />
            <v-card flat color="transparent" v-else>
                <AnalyticsFilterViewComponent />
                <br />
                <IndicatorsViewComponent />
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
