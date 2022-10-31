<script>
/**
 * Descripción: Pantalla Analytics Filter
 *
 * @displayName AnalyticsFilterViewComponent
 */

export default {
    name: 'AnalyticsFilterViewComponent',

    props: {
        params: {
            type: Object,
            requiered: true,
        },

        request: {
            type: Function,
            requiered: true,
        },
    },

    data() {
        return {
            menuStartDate: false,
            menuEndDate: false,
        };
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_checkStatus() {
            return this.$refs['popUp'].$_checkStatus();
        },

        $_clean() {
            this.params.startDate = undefined;
            this.params.endDate = undefined;

            this.request();
        },
    },
};
</script>

<template>
    <v-layout justify-end align-center>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            scrollable
        >
            <div slot="Content">
                <v-card flat>
                    <v-card-title> Filtrar </v-card-title>
                    <v-card-text>
                        <v-expansion-panels focusable flat>
                            <v-expansion-panel>
                                <v-expansion-panel-header
                                    >Fecha Inicial</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <v-menu
                                        v-model="menuStartDate"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <br />
                                            <BaseInput
                                                v-model="params.startDate"
                                                label="Buscar"
                                                append-icon="mdi-magnify"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></BaseInput>
                                        </template>
                                        <v-date-picker
                                            v-model="params.startDate"
                                            no-title
                                            scrollable
                                            color="primary"
                                            @input="menuStartDate = false"
                                            :max="params.endDate"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel>
                                <v-expansion-panel-header
                                    >Fecha Final</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <v-menu
                                        v-model="menuEndDate"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <br />
                                            <BaseInput
                                                v-model="params.endDate"
                                                label="Buscar"
                                                append-icon="mdi-magnify"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></BaseInput>
                                        </template>
                                        <v-date-picker
                                            v-model="params.endDate"
                                            no-title
                                            scrollable
                                            color="primary"
                                            @input="menuEndDate = false"
                                            :min="params.startDate"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                    <v-card-actions>
                        <v-row justify="center">
                            <v-btn
                                outlined
                                color="grey500"
                                class="ma-2 no-uppercase rounded-lg"
                                @click="$_clean"
                            >
                                Limpiar
                            </v-btn>
                            <v-btn
                                color="primary"
                                class="ma-2 no-uppercase rounded-lg"
                                @click="request"
                            >
                                Filtrar
                            </v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </BasePopUp>
        <v-btn
            class="ma-1 no-uppercase rounded-lg"
            elevation="1"
            depressed
            color="white"
            @click="$_open"
        >
            <span class="BUO-Primary"> Filtrar </span>
            <v-icon small right dark color="primary"> mdi-tune </v-icon>
        </v-btn>
    </v-layout>
</template>
