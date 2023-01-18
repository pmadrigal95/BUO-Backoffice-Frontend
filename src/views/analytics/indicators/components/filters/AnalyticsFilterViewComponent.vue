<script>
/**
 * Descripción: Pantalla Analytics Filter
 *
 * @displayName AnalyticsFilterViewComponent
 */

import { mapGetters, mapActions } from 'vuex';

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'AnalyticsFilterViewComponent',

    components: {
        BaseDatePicker,
    },

    data() {
        return {
            params: undefined,
            menuStartDate: false,
            menuEndDate: false,
            drawer: null,
        };
    },

    computed: {
        /**
         * analytics
         */
        ...mapGetters('analyticsIndicators', ['buoFilters']),

        $_mode() {
            return this.buoFilters.isAccumulated ? 'Acumulado' : 'Períodos';
        },

        $_finalDateValidated() {
            return this.params.isAccumulated
                ? undefined
                : this.params.startDate;
        },
    },

    watch: {
        /**
         * Actualizar calendarios
         */
        buoFilters: {
            handler(buoFilter) {
                // this will be run immediately on component creation.
                this.$_setObject({
                    startDate: buoFilter.startDate,
                    endDate: buoFilter.endDate,
                    isAccumulated: buoFilter.isAccumulated,
                });
            },
            immediate: true,
        },
    },

    methods: {
        ...mapActions('analyticsIndicators', [
            '$_request_buo_analytics',
            '$_change_buo_analytics_mode',
            '$_set_buo_analytics_filters',
        ]),

        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_setObject(params) {
            this.params = { ...params };
        },

        $_sendToAPI() {
            this.$_set_buo_analytics_filters(this.params);
        },

        $_cleanSendToAPI() {
            this.params.startDate = undefined;
            this.params.endDate = undefined;
            this.$_sendToAPI();
        },
    },
};
</script>

<template>
    <v-card flat class="rounded-lg">
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title> Filtrar </v-card-title>
                    <v-card-text>
                        <v-expansion-panels focusable flat multiple>
                            <v-expansion-panel v-if="!params.isAccumulated">
                                <v-expansion-panel-header
                                    >Fecha Inicial</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <br />
                                    <BaseDatePicker
                                        label="Buscar"
                                        appendIcon="mdi-magnify"
                                        :max="params.endDate"
                                        v-model="params.startDate"
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-header
                                    >Fecha Final</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <br />
                                    <BaseDatePicker
                                        label="Buscar"
                                        appendIcon="mdi-magnify"
                                        reqCurrentMaxDate
                                        :min="$_finalDateValidated"
                                        v-model="params.endDate"
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-header
                                    >Visualización</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <br />
                                    <BaseSwitch
                                        v-model="params.isAccumulated"
                                        label="Información Acumulada"
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                    <v-card-actions v-if="$vuetify.breakpoint.mobile">
                        <v-row justify="center">
                            <v-btn
                                @click="$_cleanSendToAPI()"
                                outlined
                                color="grey500"
                                class="ma-2 no-uppercase rounded-lg"
                            >
                                Limpiar
                            </v-btn>
                            <v-btn
                                dark
                                @click="$_sendToAPI()"
                                color="blue900"
                                class="ma-2 no-uppercase rounded-lg"
                            >
                                Filtrar
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
                <v-footer
                    v-if="$vuetify.breakpoint.mdAndUp"
                    class="rounded-t-xl"
                    app
                    fixed
                    color="white"
                    dark
                >
                    <v-layout justify-center>
                        <v-btn
                            @click="$_cleanSendToAPI()"
                            outlined
                            color="grey500"
                            class="ma-2 no-uppercase rounded-lg"
                        >
                            Limpiar
                        </v-btn>
                        <v-btn
                            @click="$_sendToAPI()"
                            color="blue900"
                            class="ma-2 no-uppercase rounded-lg"
                        >
                            Filtrar
                        </v-btn>
                    </v-layout>
                </v-footer>
            </div>
        </BasePopUp>
        <v-card-text>
            <v-row justify="space-between">
                <div>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        color="blue800"
                        @click="$_change_buo_analytics_mode"
                    >
                        <v-icon left>mdi-swap-vertical-circle-outline</v-icon>
                        {{ $_mode }}
                    </v-btn>
                </div>

                <div>
                    <v-btn
                        class="no-uppercase rounded-lg"
                        text
                        color="blue800"
                        @click="$_open"
                    >
                        Filtrar
                        <v-icon right>mdi-tune</v-icon>
                    </v-btn>
                    <v-menu
                        :close-on-content-click="false"
                        :nudge-width="200"
                        offset-x
                        open-on-hover
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="no-uppercase rounded-lg"
                                text
                                color="blue800"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Periodo
                                <v-icon right>mdi-calendar-range</v-icon>
                            </v-btn>
                        </template>

                        <v-card>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-icon color="blue800"
                                            >mdi-calendar-outline</v-icon
                                        >
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-subtitle
                                            >Periodo
                                            Actual</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                            `${buoFilters.startDate} al ${buoFilters.endDate}`
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>

                            <v-divider></v-divider>

                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-icon color="blue800"
                                            >mdi-calendar-today-outline</v-icon
                                        >
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-subtitle
                                            >Periodo
                                            Anterior</v-list-item-subtitle
                                        >
                                        <v-list-item-title>{{
                                            `${buoFilters.previewStartDate} al ${buoFilters.previewEndDate}`
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                    <v-btn
                        icon
                        color="blue800"
                        @click="$_request_buo_analytics"
                    >
                        <v-icon small>mdi-autorenew</v-icon>
                    </v-btn>
                </div>
            </v-row>
        </v-card-text>
    </v-card>
</template>
