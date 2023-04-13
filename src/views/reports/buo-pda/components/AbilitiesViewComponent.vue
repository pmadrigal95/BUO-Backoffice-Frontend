<script>
const PDARadarChart = () => import('@/components/pda/PDARadarChart.vue');

export default {
    name: 'AbilitiesViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        PDARadarChart,
    },
};
</script>

<template>
    <v-card flat class="pt-6">
        <v-card flat outlined class="rounded-lg">
            <v-card-title class="grey700--text BUO-Paragraph-Large"
                >Tus indicadores</v-card-title
            >

            <v-card-text>
                <PDARadarChart
                    :data="entity.habilidadPDADTOSet"
                    :profile="
                        $vuetify.theme.themes.light[
                            entity.perfilPDA.toLowerCase()
                        ]
                    "
                    :dark="false"
                />
                <v-alert
                    text
                    outlined
                    :color="entity.perfilPDA.toLowerCase()"
                    type="warning"
                    class="rounded-lg"
                    dismissible
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                >
                    <div class="black--text"><b>Importante</b></div>
                    <div class="black--text">
                        El porcentaje en cada indicador no indica la falta o
                        presencia de la misma, sino cuanto esfuerzo toma
                        desempeñar ese indicador.
                    </div>
                </v-alert>
            </v-card-text>
        </v-card>
        <v-card flat>
            <v-card-title class="grey700--text BUO-Paragraph-Large"
                >Indicadores</v-card-title
            >
            <v-card-text>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                        v-for="item in entity.habilidadPDADTOSet"
                        :key="item.id"
                    >
                        <div>
                            <v-list-item class="buo-headerAbility-position"
                                ><v-list-item-avatar>
                                    <v-icon
                                        :color="entity.perfilPDA.toLowerCase()"
                                        >mdi-shield-star</v-icon
                                    >
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title
                                        class="BUO-Paragraph-Small buo-word-break buo-white-space black--text"
                                    >
                                        <div
                                            class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                        >
                                            <span>
                                                {{ item.habilidad }}
                                            </span>
                                            <span>
                                                {{
                                                    item.porcentajeNaturalHabilidadFormato +
                                                    '%'
                                                }}
                                            </span>
                                        </div>
                                        <v-progress-linear
                                            rounded
                                            :value="
                                                item.porcentajeNaturalHabilidadFormato
                                            "
                                            :color="
                                                entity.perfilPDA.toLowerCase()
                                            "
                                        />
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="pr-5 pl-7 black--text BUO-Label-XSmall">
                                {{ item.caracteristicas }}
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>
