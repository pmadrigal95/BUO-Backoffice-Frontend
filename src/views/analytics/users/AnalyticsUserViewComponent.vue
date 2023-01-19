<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsUserViewComponent
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

//import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AnalyticsUserFilterComponent = () =>
    import(
        '@/views/analytics/users/components/filters/AnalyticsUserFilterComponent'
    );

const BaseAnalyticsLineChart = () =>
    import('@/views/analytics/common/BaseAnalyticsLineChart');

export default {
    name: 'AnalyticsUserViewComponent',

    metaInfo: { title: 'Analytics Usuarios' },

    components: {
        BaseCardViewComponent,
        BaseAnalyticsLineChart,
        AnalyticsUserFilterComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    computed: {
        chartData() {
            return {
                labels: [
                    '2022-01-05',
                    '2022-01-06',
                    '2022-01-14',
                    '2022-01-17',
                    '2022-01-18',
                    '2022-01-19',
                    '2022-01-20',
                    '2022-01-22',
                    '2022-01-24',
                    '2022-02-01',
                    '2022-02-09',
                    '2022-02-10',
                    '2022-02-15',
                    '2022-02-21',
                    '2022-02-22',
                    '2022-03-03',
                    '2022-03-21',
                    '2022-03-22',
                    '2022-03-23',
                    '2022-03-24',
                    '2022-03-29',
                    '2022-04-04',
                    '2022-04-06',
                    '2022-04-18',
                    '2022-04-19',
                    '2022-04-21',
                    '2022-04-25',
                    '2022-04-26',
                    '2022-04-27',
                ],
                datasets: [
                    {
                        label: 'Total',
                        data: [
                            2, 13, 17, 3, 4, 2, 1, 1, 2, 2, 1, 4, 1, 1, 1, 1, 1,
                            1, 3, 2, 3, 9, 2, 1, 1, 1, 3, 13, 2,
                        ],
                    },
                ],
            };
        },
    },

    created() {
        !this.entity.chartData && this.$_sendToApi();
    },

    methods: {
        $_Object() {
            return {
                filter: {
                    startDate: '2022-01-01',
                    endDate: '2022-01-20',
                },
                chartData: undefined,
                loading: false,
            };
        },

        $_sendToApi() {
            this.entity.loading = true;
            let object = BaseArrayHelper.SetObject({}, this.entity.filter);

            httpService
                .post('analytics/usuarios/creados', object)
                .then((response) => {
                    this.entity.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.entity.chartData = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        console.log(response.data);
                        console.log(this.entity.chartData);
                    }
                });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Usuarios" md="12" offset="0">
        <div slot="card-text">
            <AnalyticsUserFilterComponent :entity="entity" />
            <v-card
                flat
                max-width="100%"
                max-height="100%"
                class="rounded-t-xl"
            >
                <v-card-text v-if="entity.chartData">
                    <BaseAnalyticsLineChart :chartData="entity.chartData" />
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
