<script>
/**
 * Descripción: Pantalla Analytics Filter
 *
 * @displayName AnalyticsUserFilterComponent
 */

const BaseDatePicker = () => import('@/components/core/forms/BaseDatePicker');

export default {
    name: 'AnalyticsUserFilterComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        fn: {
            type: Function,
            requiered: true,
        },
    },

    components: {
        BaseDatePicker,
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        $_sendToApi() {
            this.fn();
            this.$_open();
        },
    },
};
</script>

<template>
    <v-card flat class="mb-4 rounded-lg">
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title> Filtrar </v-card-title>
                    <v-card-text>
                        <BaseSkeletonLoader
                            v-if="entity.loading"
                            type="article, actions"
                        />
                        <BaseForm
                            labelBtn="Filtrar"
                            icon="mdi-tune"
                            block
                            :method="$_sendToApi"
                            v-else
                        >
                            <div slot="body">
                                <v-expansion-panels focusable flat multiple>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header
                                            >Fecha
                                            Inicial</v-expansion-panel-header
                                        >
                                        <v-expansion-panel-content class="mt-4">
                                            <BaseDatePicker
                                                label="Buscar"
                                                appendIcon="mdi-magnify"
                                                :max="entity.filter.endDate"
                                                v-model="
                                                    entity.filter.startDate
                                                "
                                                :validate="['text']"
                                            />
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                    <v-expansion-panel>
                                        <v-expansion-panel-header
                                            >Fecha
                                            Final</v-expansion-panel-header
                                        >
                                        <v-expansion-panel-content class="mt-4">
                                            <BaseDatePicker
                                                label="Buscar"
                                                appendIcon="mdi-magnify"
                                                reqCurrentMaxDate
                                                :min="entity.filter.startDate"
                                                v-model="entity.filter.endDate"
                                                :validate="['text']"
                                            />
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <v-card-text>
            <v-row justify="end">
                <v-btn
                    class="no-uppercase rounded-lg BUO-Paragraph-Small"
                    text
                    color="blue800"
                    @click="$_open"
                >
                    Filtrar
                    <v-icon right>mdi-tune</v-icon>
                </v-btn>
                <v-btn icon color="blue800" @click="fn">
                    <v-icon small>mdi-autorenew</v-icon>
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>
