<script>
/**
 * Descripción: Componente Lista de habilidades del colaborador
 *
 * @displayName BuoAbilityViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import sharingLinks from '@/services/sharing/sharingLinks';

const BaseSocialLinkSharing = () =>
    import('@/components/core/sharing/BaseSocialLinkSharing');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

const BaseMyAbilitiesList = () =>
    import(
        '@/views/user/profile/components/internalCompontes/buoAbilities/BaseMyAbilitiesList'
    );

export default {
    name: 'BuoAbilityViewComponent',

    props: {
        userName: {
            type: String,
            requiered: true,
        },

        userId: {
            type: [Number, String],
        },
    },

    components: {
        BaseCustomsButtonsGrid,
        BaseMyAbilitiesList,
        BaseSocialLinkSharing,
    },

    data() {
        return {
            tab: null,
            mySkills: undefined,
            loading: false,
            loadingBtn: false,
            link: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        sharing() {
            return {
                url: this.link,
                title: `Perfil de ${this.userName}`,
                copy: this.copyURL,
                socialNetworks: ['email', 'whatsapp'],
            };
        },

        $_ValidatedList() {
            return this.mySkills.habilidades.filter(
                (x) => x.estadoId == baseConfigHelper.$_statusCode.certificate
            );
        },

        $_InReviewList() {
            return this.mySkills.habilidades.filter(
                (x) => x.estadoId == baseConfigHelper.$_statusCode.certifying
            );
        },

        $_NotValidatedList() {
            return this.mySkills.habilidades.filter(
                (x) => x.estadoId == baseConfigHelper.$_statusCode.uncertified
            );
        },
    },

    created() {
        this.$_getSkills();
    },

    methods: {
        $_fnSendReportPDA() {
            if (this.link) {
                sharingLinks.$_share(
                    this.link,
                    `BUO ${this.userName}`,
                    this.$refs.BuoShareableLink.$_open,
                    false
                );
            }
        },

        copyURL() {
            sharingLinks.$_copyLink(this.link);
        },

        $_getSkills() {
            let data = this.userId
                ? this.userId
                : this.$router.currentRoute.params.Id;
            if (data) {
                this.loading = true;
                httpService
                    .get(`wallet/getByUsuarioId/${data}`)
                    .then((response) => {
                        this.loading = false;
                        if (response != undefined) {
                            this.mySkills = BaseArrayHelper.SetObject(
                                {},
                                response.data
                            );
                        }
                        this.loading = false;
                    });
            }
        },

        $_requestLink() {
            this.loadingBtn = true;
            let data = this.userId
                ? this.userId
                : this.$router.currentRoute.params.Id;
            if (!this.link) {
                httpService
                    .post('user/createShareableLink', {
                        usuarioId: data,
                    })
                    .then((response) => {
                        this.loadingBtn = false;
                        if (response != undefined) {
                            this.link = response.data;
                            this.$_fnSendReportPDA();
                        }
                    });
            } else {
                this.$_fnSendReportPDA();
            }
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article, actions" />
    <v-card flat v-else-if="mySkills">
        <v-row class="pb-5 pt-8">
            <v-col cols="12" md="8" class="d-flex align-self-end">
                <section
                    class="BUO-Paragraph-Large-SemiBold pl-6"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Skill - ID
                </section>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end">
                <BaseCustomsButtonsGrid
                    label="Compartir Skill - ID"
                    :fnMethod="$_requestLink"
                    icon="mdi-share-variant-outline"
                    :loading="loadingBtn"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />
            </v-col>
        </v-row>

        <BaseSocialLinkSharing ref="BuoShareableLink" :sharing="sharing" />

        <v-tabs
            v-model="tab"
            right
            show-arrows
            height="34"
            class="pa-3"
            :color="app ? 'blueProgress600' : 'blue800'"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-tab-idle-dark black--text BUO-Display-Large'
                        : 'bg-tab-idle-clear grey600--text'
                }`"
                active-class="bg-tab-active white--text"
                ><p class="BUO-Label-Small pt-4">En Progreso</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-tab-idle-dark black--text BUO-Display-Large'
                        : 'bg-tab-idle-clear grey600--text'
                }`"
                active-class="bg-tab-active white--text"
                ><p class="BUO-Label-Small pt-4">Validadas</p>
            </v-tab>
            <v-tab
                :class="`rounded-pill no-uppercase mr-3 ${
                    app
                        ? 'bg-tab-idle-dark black--text BUO-Display-Large'
                        : 'bg-tab-idle-clear grey600--text'
                }`"
                active-class="bg-tab-active white--text"
                ><p class="BUO-Label-Small pt-4">Por Validar</p>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5">
            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="$_InReviewList" />
            </v-tab-item>

            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="$_ValidatedList" />
            </v-tab-item>

            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="$_NotValidatedList" />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
