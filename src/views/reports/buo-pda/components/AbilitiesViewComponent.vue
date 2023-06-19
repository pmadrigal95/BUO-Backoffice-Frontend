<script>
import { mapGetters } from 'vuex';

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

    computed: { ...mapGetters('theme', ['app']) },

    watch: {
        app: {
            handler() {
                this.key++;
            },
        },
    },
};
</script>

<template>
    <v-card flat class="pt-6" color="transparent">
        <v-card flat outlined class="rounded-lg">
            <v-card-title
                class="BUO-Paragraph-Large"
                :class="[app ? 'white--text' : 'grey700--text']"
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
                    :dark="app ? true : false"
                    :key="key"
                />
                <v-alert
                    text
                    outlined
                    :color="entity.perfilPDA.toLowerCase()"
                    type="warning"
                    class="rounded-lg mt-9"
                    dismissible
                    :class="[
                        $vuetify.breakpoint.smAndDown
                            ? 'BUO-Paragraph-Small'
                            : 'BUO-Paragraph-Medium',
                    ]"
                >
                    <section :class="[app ? 'white--text' : 'black--text']">
                        <b>Importante</b>
                    </section>
                    <section :class="[app ? 'white--text' : 'grey700--text']">
                        El porcentaje en cada indicador no indica la falta o
                        presencia de la misma, sino cuanto esfuerzo toma
                        desempeñar ese indicador.
                    </section>
                </v-alert>
            </v-card-text>
        </v-card>
        <v-card flat color="transparent">
            <v-card-title
                class="BUO-Paragraph-Large"
                :class="[app ? 'white--text' : 'grey700--text']"
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
                                    <v-list-item-title>
                                        <section
                                            class="d-flex flex-no-wrap justify-space-between buo-word-break"
                                        >
                                            <span
                                                class="BUO-Paragraph-Small-SemiBold buo-word-break buo-white-space grey500--text"
                                            >
                                                {{ item.habilidad }}
                                            </span>
                                            <span
                                                class="BUO-Paragraph-Small-SemiBold buo-word-break buo-white-space grey500--text"
                                            >
                                                {{
                                                    item.porcentajeNaturalHabilidadFormato +
                                                    '%'
                                                }}
                                            </span>
                                        </section>
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
                            <div
                                class="pr-5 pl-7 BUO-Label-XSmall"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'grey600--text',
                                ]"
                            >
                                {{ item.caracteristicas }}
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>
