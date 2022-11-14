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
    import('@/views/analytics/components/filters/AnalyticsFilterViewComponent');

const IndicatorsViewComponent = () =>
    import('@/views/analytics/components/generalView/IndicatorsViewComponent');

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
        ...mapGetters('analytics', ['buoAnalytics', 'loadingbuoAnalytics']),
    },

    created() {
        this.$_request_buo_analytics();
    },

    methods: {
        ...mapActions('analytics', ['$_request_buo_analytics']),
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
