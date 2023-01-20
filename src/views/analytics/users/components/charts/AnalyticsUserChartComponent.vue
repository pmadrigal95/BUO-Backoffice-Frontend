<script>
/**
 * Descripción: Pantalla Analytics Chart
 *
 * @displayName AnalyticsUserChartComponent
 */

const BaseAnalyticsLineChart = () =>
    import('@/views/analytics/common/BaseAnalyticsLineChart');

export default {
    name: 'AnalyticsUserFilterComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseAnalyticsLineChart,
    },
};
</script>

<template>
    <v-layout justify-center>
        <v-card flat width="100%" height="100%" class="rounded-t-xl">
            <v-card-text>
                <BaseSkeletonLoader v-if="entity.loading" type="image" />
                <BaseAnalyticsLineChart :chartData="entity.chartData" v-else />
            </v-card-text>
        </v-card>
    </v-layout>
</template>
