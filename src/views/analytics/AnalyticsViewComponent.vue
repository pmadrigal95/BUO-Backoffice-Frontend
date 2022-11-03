<script>
/**
 * Descripción: Pantalla Analytics
 *
 * @displayName AnalyticsViewComponent
 */

import { format } from 'date-fns';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

import httpService from '@/services/axios/httpService';

const BaseStadisticCard = () =>
    import('@/components/core/cards/BaseStadisticCard');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AnalyticsFilterViewComponent = () =>
    import('@/views/analytics/components/AnalyticsFilterViewComponent');

export default {
    name: 'AnalyticsViewComponent',

    components: {
        BaseStadisticCard,
        BaseCardViewComponent,
        AnalyticsFilterViewComponent,
    },

    data() {
        return {
            params: this.$_Object(),
            showDates: this.$_Object(),
            loading: false,
            items: undefined,
        };
    },

    computed: {
        Filter() {
            return !baseSharedFnHelper.$_checkValueNull(
                this.showDates?.startDate
            ) && !baseSharedFnHelper.$_checkValueNull(this.showDates?.endDate)
                ? `${this.showDates.startDate} al ${this.showDates.endDate}`
                : null;
        },

        previewFilter() {
            return !baseSharedFnHelper.$_checkValueNull(
                this.showDates?.previewStartDate
            ) &&
                !baseSharedFnHelper.$_checkValueNull(
                    this.showDates?.previewEndDate
                )
                ? `${this.showDates.previewStartDate} al ${this.showDates.previewEndDate}`
                : null;
        },
    },

    mounted() {
        this.$_sendToApi();
    },

    methods: {
        /**
         * Obj de Filtros
         */
        $_Object() {
            return {
                startDate: undefined,
                endDate: undefined,
                previewStartDate: undefined,
                previewEndDate: undefined,
            };
        },

        $_getEndpoint() {
            if (
                baseSharedFnHelper.$_checkValueNull(this.params.startDate) &&
                baseSharedFnHelper.$_checkValueNull(this.params.endDate)
            ) {
                return {
                    endpoint: 'analytics/dashboard',
                    method: 'get',
                };
            }

            if (
                !baseSharedFnHelper.$_checkValueNull(this.params.startDate) &&
                !baseSharedFnHelper.$_checkValueNull(this.params.endDate)
            ) {
                return {
                    endpoint: 'analytics/dashboardByDate',
                    method: 'post',
                    params: this.params,
                };
            }

            return null;
        },

        $_populateUI(data) {
            this.items = data.indicadorDtoList;
            this.params.startDate = format(
                new Date(data.fechaInicio),
                baseLocalHelper.$_DateFormat
            );
            this.params.endDate = format(
                new Date(data.fechaFinal),
                baseLocalHelper.$_DateFormat
            );

            this.showDates.startDate = format(
                new Date(data.fechaInicio),
                baseLocalHelper.$_DateFormat
            );
            this.showDates.endDate = format(
                new Date(data.fechaFinal),
                baseLocalHelper.$_DateFormat
            );

            this.showDates.previewStartDate = format(
                new Date(data.fechaInicioAnterior),
                baseLocalHelper.$_DateFormat
            );
            this.showDates.previewEndDate = format(
                new Date(data.fechaFinalAnterior),
                baseLocalHelper.$_DateFormat
            );
        },

        $_sendToApi() {
            this.loading = true;

            const request = this.$_getEndpoint();

            if (request) {
                httpService[request.method](
                    request.endpoint,
                    request.params
                ).then((response) => {
                    if (response != undefined) {
                        this.$_populateUI(response.data);
                        !this.$refs.AnalyticsFilter.$_checkStatus()
                            ? () => {}
                            : this.$refs.AnalyticsFilter.$_open();
                    }
                    this.loading = false;
                });
            }
        },

        $_goBack() {
            console.log('Atras');
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="BUO Analytics"
        :btnAction="$_goBack"
        md="12"
        offset="0"
    >
        <div slot="top-actions">
            <AnalyticsFilterViewComponent
                ref="AnalyticsFilter"
                :params="params"
                :request="$_sendToApi"
            />
        </div>
        <div slot="card-subtitle" v-if="Filter">
            <br />
            <div>
                <v-icon left color="primary">mdi-calendar-import-outline</v-icon
                ><span>{{ Filter }}</span>
            </div>
            <br />
            <div>
                <v-icon left color="primary">mdi-calendar-export-outline</v-icon
                ><span>{{ previewFilter }}</span>
            </div>
        </div>
        <div slot="card-text">
            <BaseSkeletonLoader
                v-if="loading || !items"
                type="card-avatar, article, actions"
            />
            <v-row dens v-else>
                <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
                    <BaseStadisticCard
                        :title="item.titulo"
                        :subtitle="item.subtitulo"
                        :icon="item.imagenUrl"
                        :value="item.valor"
                        :percentage="item.porcentaje"
                        :previousValue="item.valorAnterior"
                        :isUp="item.indicador"
                    />
                </v-col>
            </v-row>
        </div>
    </BaseCardViewComponent>
</template>
