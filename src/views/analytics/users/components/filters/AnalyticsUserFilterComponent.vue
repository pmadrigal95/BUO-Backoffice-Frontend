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
    },

    components: {
        BaseDatePicker,
    },

    methods: {
        $_open() {
            this.$refs['popUp'].$_openModal();
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
                        <v-expansion-panels focusable flat multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-header
                                    >Fecha Inicial</v-expansion-panel-header
                                >
                                <v-expansion-panel-content>
                                    <BaseDatePicker
                                        label="Buscar"
                                        appendIcon="mdi-magnify"
                                        :max="entity.filter.endDate"
                                        v-model="entity.filter.startDate"
                                    />
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
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
                <v-btn icon color="blue800">
                    <v-icon small>mdi-autorenew</v-icon>
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>
