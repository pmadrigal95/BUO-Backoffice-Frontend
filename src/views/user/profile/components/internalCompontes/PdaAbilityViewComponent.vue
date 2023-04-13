<script>
/**
 * Descripción: Componente Resumen PDA
 *
 * @displayName PdaAbilityViewComponent
 */

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
    },

    created() {
        this.$_reviewStatus();
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
                    'Usuario no cuenta con test PDA'
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
                <div class="grey700--text BUO-Paragraph-Large-SemiBold pl-6">
                    Indicadores PDA
                </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end">
                <BaseCustomsButtonsGrid
                    label="Compartir PDA"
                    :fnMethod="$_fnSendReportPDA"
                    icon="mdi-share-variant-outline"
                    v-if="permission"
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
                <div class="px-8">
                    <div class="pt-2">
                        <v-layout>
                            <div class="pr-3" v-if="pda">
                                <div
                                    class="BUO-Label-XSmall grey600--text pb-1"
                                >
                                    Eres una persona:
                                </div>
                                <v-chip
                                    outlined
                                    color="grey500"
                                    class="BUO-Label-XSmall-SemiBold"
                                >
                                    {{ pda.perfilPDAVisual }}
                                </v-chip>
                            </div>
                            <v-divider vertical></v-divider>
                            <div class="pl-3" v-if="pda">
                                <div
                                    class="BUO-Label-XSmall grey600--text pb-1"
                                >
                                    Tu super poder es:
                                </div>
                                <v-chip
                                    color="grey500"
                                    outlined
                                    class="BUO-Label-XSmall-SemiBold"
                                >
                                    {{ pda.superpoder }}
                                </v-chip>
                            </div>
                        </v-layout>
                    </div>
                </div>
            </v-row>

            <v-col cols="12" class="pt-6">
                <PDARadarChart
                    :data="pda.habilidadPDADTOSet"
                    :profile="
                        $vuetify.theme.themes.light[pda.perfilPDA.toLowerCase()]
                    "
                    :dark="false"
                />
            </v-col>

            <v-col cols="12" class="px-5 pb-10">
                <v-card flat>
                    <v-card-title class="grey700--text BUO-Paragraph-Large pt-6"
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
                                <div>
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
                                                        pda.perfilPDA.toLowerCase()
                                                    "
                                                />
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <div
                                        class="pr-5 pl-7 black--text BUO-Label-XSmall"
                                    >
                                        {{ item.caracteristicas }}
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
