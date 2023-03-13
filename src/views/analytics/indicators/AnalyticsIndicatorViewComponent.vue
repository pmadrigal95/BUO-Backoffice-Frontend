<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsViewComponent
 */
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

    created() {
        !this.entity.indicatorsData && this.$_sendToAPI();
    },

    methods: {
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
                baseSharedFnHelper.$_checkValueNull(
                    this.entity.filter.startDate
                ) &&
                baseSharedFnHelper.$_checkValueNull(this.entity.filter.endDate)
            ) {
                return {
                    endpoint: this.entity.isAccumulated
                        ? 'analytics/dashboardAcc'
                        : 'analytics/dashboard',
                    method: 'get',
                };
            }

            if (
                !baseSharedFnHelper.$_checkValueNull(
                    this.entity.filter.startDate
                ) &&
                !baseSharedFnHelper.$_checkValueNull(this.entity.filter.endDate)
            ) {
                return {
                    endpoint: 'analytics/dashboardByDate',
                    method: 'post',
                    params: {
                        startDate: new Date(this.entity.filter.startDate),
                        endDate: new Date(this.entity.filter.endDate),
                        accumulated: this.entity.filter.isAccumulated,
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

        $_sendToAPI() {
            this.entity.loading = true;
            const request = this.$_dataRequest();

            httpService[request.method](request.endpoint, request.params).then(
                (response) => {
                    if (response) {
                        // Encontro la entidad
                        this.entity.indicatorsData =
                            response.data.indicadorDtoList;

                        this.entity.filter = {
                            startDate: this.$_formatDate(
                                response.data.fechaInicio
                            ),
                            endDate: this.$_formatDate(
                                response.data.fechaFinal
                            ),
                            previewStartDate: this.$_formatDate(
                                response.data.fechaInicioAnterior
                            ),
                            previewEndDate: this.$_formatDate(
                                response.data.fechaFinalAnterior
                            ),
                            isAccumulated: this.entity.filter.isAccumulated,
                        };
                    }
                    this.entity.loading = false;
                }
            );
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="BUO Analytics" md="12" offset="0">
        <div slot="card-text">
            <BaseSkeletonLoader
                v-if="!entity.indicatorsData || entity.loading"
                type="table-heading, image"
            />
            <v-card flat color="transparent" v-else>
                <AnalyticsFilterViewComponent
                    :entity="entity"
                    :fn="$_sendToAPI"
                />
                <br />
                <IndicatorsViewComponent :entity="entity" />
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
