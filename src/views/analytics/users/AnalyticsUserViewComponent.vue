<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsUserViewComponent
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AnalyticsUserFilterComponent = () =>
    import(
        '@/views/analytics/users/components/filters/AnalyticsUserFilterComponent'
    );

const AnalyticsUserChartComponent = () =>
    import(
        '@/views/analytics/users/components/charts/AnalyticsUserChartComponent'
    );

export default {
    name: 'AnalyticsUserViewComponent',

    metaInfo: { title: 'Analytics' },

    props: {
        endpoint: {
            type: String,
            default: 'creados',
        },
    },

    components: {
        BaseCardViewComponent,
        AnalyticsUserFilterComponent,
        AnalyticsUserChartComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    created() {
        !this.entity.chartData && this.$_sendToApi();
    },

    methods: {
        $_Object() {
            return {
                filter: {
                    startDate: baseSharedFnHelper.$_addOrDiffDays(
                        new Date(),
                        -30
                    ),
                    endDate: baseSharedFnHelper.$_formatDate(new Date()),
                },
                chartData: undefined,
                loading: false,
            };
        },

        $_sendToApi() {
            this.entity.loading = true;
            let object = BaseArrayHelper.SetObject({}, this.entity.filter);

            httpService
                .post(`analytics/usuarios/${this.endpoint}`, object)
                .then((response) => {
                    this.entity.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.entity.chartData = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Usuarios" md="12" offset="0">
        <div slot="card-text">
            <AnalyticsUserFilterComponent :entity="entity" :fn="$_sendToApi" />
            <AnalyticsUserChartComponent :entity="entity" />
        </div>
    </BaseCardViewComponent>
</template>
