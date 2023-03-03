<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

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

    data() {
        return {
            entity: this.$_Object(),
        };
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

        $_Object() {
            return {
                filter: {
                    startDate: undefined,
                    endDate: undefined,
                    isAccumulated: true,
                },
                indicatorsData: undefined,
                loading: false,
            };
        },

        $_dataRequest() {
            if (
                baseSharedFnHelper.$_checkValueNull(this.entity.startDate) &&
                baseSharedFnHelper.$_checkValueNull(this.entity.endDate)
            ) {
                return {
                    endpoint: this.entity.isAccumulated
                        ? 'analytics/dashboardAcc'
                        : 'analytics/dashboard',
                    method: 'get',
                };
            }

            if (
                !baseSharedFnHelper.$_checkValueNull(this.entity.startDate) &&
                !baseSharedFnHelper.$_checkValueNull(this.entity.endDate)
            ) {
                return {
                    endpoint: 'analytics/dashboardByDate',
                    method: 'post',
                    params: {
                        startDate: new Date(this.entity.startDate),
                        endDate: new Date(this.entity.endDate),
                        accumulated: this.entity.isAccumulated,
                    },
                };
            }

            return null;
        },

        $_formatDate(dateToConvert) {
            return baseSharedFnHelper.$_parseArrayToDateISOString(
                dateToConvert
            );
        },
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
