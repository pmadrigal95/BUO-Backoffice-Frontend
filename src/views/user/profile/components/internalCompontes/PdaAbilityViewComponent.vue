<script>
/**
 * Descripción: Componente Resumen PDA
 *
 * @displayName PdaAbilityViewComponent
 */

import { mapGetters } from 'vuex';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const PDARadarChart = () => import('@/components/pda/PDARadarChart.vue');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

export default {
    name: 'PdaAbilityViewComponent',

    props: {
        userName: {
            type: String,
            requiered: true,
        },

        conPda: {
            type: Boolean,
            requiered: true,
        },

        userId: {
            type: [Number, String],
        },
    },

    data() {
        return {
            skillsList: undefined,
            pda: undefined,
            loading: false,
            key: 0,
        };
    },
    components: {
        PDARadarChart,
        BaseCustomsButtonsGrid,
    },

    computed: {
        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'BUOPDAReportViewComponent',
                baseSecurityHelper.$_download
            );
            return result;
        },

        ...mapGetters('theme', ['app']),
    },

    created() {
        this.$_reviewStatus();
    },

    watch: {
        app: {
            handler() {
                this.key++;
            },
        },
    },

    methods: {
        $_fnSendReportPDA() {
            if (this.conPda) {
                let data = this.userId
                    ? this.userId
                    : this.$router.currentRoute.params.Id;

                this.$router.push({
                    name: 'BUOPDAUserDetailsReportViewComponent',
                    params: { Id: data },
                });
            } else {
                baseNotificationsHelper.Message(
                    true,
                    'Usuario no cuenta con test Buo Psychometric'
                );
            }
        },

        $_reviewStatus() {
            if (this.userName && this.conPda) {
                this.loading = true;
                httpService
                    .get(`/pda/getTest/${this.userName}`)
                    .then((response) => {
                        if (response != undefined) {
                            if (response.data && response.data != '') {
                                this.pda = BaseArrayHelper.SetObject(
                                    {},
                                    response.data
                                );
                                this.$_getSkillsList();
                            }
                        }
                        this.loading = false;
                    });
            }
        },

        $_getSkillsList() {
            this.skillsList = Object.keys(this.pda.habilidadPDADTOSet)
                .map((key) => this.pda.habilidadPDADTOSet[key])
                .sort(
                    (a, b) =>
                        b.porcentajeNaturalHabilidad -
                        a.porcentajeNaturalHabilidad
                )
                .slice(0, 3);
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article, actions" />
    <v-card
        flat
        class="pt-8 rounded-lg card"
        md="12"
        ref="card"
        v-else-if="pda && conPda"
    >
        <v-row class="pb-5">
            <v-col cols="12" md="8" class="d-flex align-self-end">
                <section
                    class="BUO-Paragraph-Large-SemiBold pl-6"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Indicadores Buo Psychometric
                </section>
            </v-col>
            <v-col cols="12" md="4" sm="12" class="d-flex justify-end">
                <BaseCustomsButtonsGrid
                    label="Ver Buo Psychometric"
                    :fnMethod="$_fnSendReportPDA"
                    icon="mdi-share-variant-outline"
                    v-if="permission"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />
            </v-col>
        </v-row>

        <v-row justify="start">
            <v-row dense class="px-10">
                <img
                    v-if="pda && pda.hotcakeSimpleURL"
                    height="95"
                    width="70"
                    :src="pda.hotcakeSimpleURL"
                />
                <section class="px-3">
                    <section class="pt-2">
                        <v-layout>
                            <section class="pr-3" v-if="pda">
                                <section
                                    class="BUO-Label-XSmall pb-4"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    Eres una persona:
                                </section>
                                <v-chip
                                    outlined
                                    color="grey500"
                                    class="BUO-Label-XSmall-SemiBold"
                                >
                                    <span
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                        >{{ pda.perfilPDAVisual }}</span
                                    >
                                </v-chip>
                            </section>
                            <v-divider vertical></v-divider>
                            <section class="pl-3" v-if="pda">
                                <section
                                    class="BUO-Label-XSmall pb-4"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ] "
                                >
                                    Tu super poder es:
                                </section>
                                <v-chip
                                    color="grey500"
                                    outlined
                                    class="BUO-Label-XSmall-SemiBold"
                                >
                                    <span
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                    >
                                        {{ pda.superpoder }}</span
                                    >
                                </v-chip>
                            </section>
                        </v-layout>
                    </section>
                </section>
            </v-row>

            <v-col cols="12" class="pt-6">
                <PDARadarChart
                    :data="pda.habilidadPDADTOSet"
                    :profile="
                        $vuetify.theme.themes.light[pda.perfilPDA.toLowerCase()]
                    "
                    :dark="app ? true : false"
                    :key="key"
                />
            </v-col>

            <v-col cols="12" class="px-5 pb-10">
                <v-card flat>
                    <v-card-title
                        class="BUO-Paragraph-Large pt-6"
                        :class="[app ? 'white--text' : 'grey700--text']"
                        >Indicadores principales</v-card-title
                    >
                    <v-card-text>
                        <v-row>
                            <v-col
                                cols="12"
                                md="12"
                                v-for="item in skillsList"
                                :key="item.id"
                            >
                                <section>
                                    <v-list-item
                                        class="buo-headerAbility-position"
                                        ><v-list-item-avatar>
                                            <v-icon
                                                :color="
                                                    pda.perfilPDA.toLowerCase()
                                                "
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
                                                        pda.perfilPDA.toLowerCase()
                                                    "
                                                />
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <section
                                        class="pr-5 pl-7 BUO-Label-XSmall"
                                        :class="[
                                            app ? 'white--text' : 'black--text',
                                        ]"
                                    >
                                        {{ item.caracteristicas }}
                                    </section>
                                </section>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
