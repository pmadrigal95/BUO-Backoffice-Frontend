<script>
/**
 * Descripción: Componente Lista de habilidades del colaborador
 *
 * @displayName BuoAbilityViewComponent
 */

import sharingLinks from '@/services/sharing/sharingLinks.js';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid.vue');

const BaseMyAbilitiesList = () =>
    import('@/views/user/profile/components/buoAbilities/BaseMyAbilitiesList');

const BaseSocialLinkSharing = () =>
    import('@/components/core/sharing/BaseSocialLinkSharing');

export default {
    name: 'BuoAbilityViewComponent',

    props: {
        userName: {
            type: String,
            requiered: true,
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
            validatedList: undefined,
            inReviewList: undefined,
            notValidatedList: undefined,
            userId: undefined,
            link: undefined,
        };
    },

    computed: {
        sharing() {
            return {
                url: this.link,
                title: `Perfil de ${this.userName}`,
                copy: this.copyURL,
                socialNetworks: ['email', 'whatsapp'],
            };
        },
    },

    created() {
        this.$_getSkills();
        this.$_requestLink();
    },

    methods: {
        $_fnSendReportPDA() {
            const useNavigatorShare = false;
            sharingLinks.$_share(
                this.link,
                `BUO ${this.userName}`,
                this.$refs['BuoShareableLink'].$_open,
                useNavigatorShare
            );
        },

        copyURL() {
            sharingLinks.$_copyLink(this.link);
        },

        $_getSkills() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                this.loading = true;
                this.userId = data;
                httpService
                    .get(`wallet/getByUsuarioId/${this.userId}`)
                    .then((response) => {
                        this.loading = false;
                        if (response != undefined) {
                            this.mySkills = BaseArrayHelper.SetObject(
                                {},
                                response.data
                            );

                            if (this.mySkills != null) {
                                this.$_getValidatedList();
                                this.$_getInReviewList();
                                this.$_getNotValidatedList();
                            }
                        }
                        this.loading = false;
                    });
            }
        },

        $_getValidatedList() {
            this.validatedList = this.mySkills.habilidades
                .filter(
                    (x) =>
                        x.estadoId ==
                        baseLocalHelper.$_statusAbility.validatedCode
                )
                .slice(0, 100);
        },

        $_getInReviewList() {
            this.inReviewList = this.mySkills.habilidades
                .filter(
                    (x) =>
                        x.estadoId ==
                        baseLocalHelper.$_statusAbility.inProgressCode
                )
                .slice(0, 100);
        },

        $_getNotValidatedList() {
            this.notValidatedList = this.mySkills.habilidades
                .filter(
                    (x) =>
                        x.estadoId ==
                        baseLocalHelper.$_statusAbility.notValidatedCode
                )
                .slice(0, 100);
        },

        $_requestLink() {
            this.loading = true;
            httpService
                .post('user/createShareableLink', {
                    usuarioId: this.userId,
                })
                .then((response) => {
                    if (response != undefined) {
                        this.link = response.data;
                        this.loading = false;
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article, actions" />
    <v-card flat v-else-if="mySkills">
        <v-row class="pb-5 pt-8">
            <v-col cols="12" md="8" class="d-flex align-self-end">
                <div class="grey700--text BUO-Paragraph-Large-SemiBold pl-6">
                    Skills ID
                </div>
            </v-col>
            <v-col cols="12" md="4" class="d-flex justify-end">
                <BaseCustomsButtonsGrid
                    label="Compartir Skills ID"
                    :fnMethod="$_fnSendReportPDA"
                    icon="mdi-share-variant-outline"
                />
            </v-col>
        </v-row>

        <BaseSocialLinkSharing
            ref="BuoShareableLink"
            v-if="link"
            :sharing="sharing"
        />

        <v-tabs v-model="tab" right show-arrows height="25" class="pa-3">
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab class="rounded-pill no-uppercase"> En Progreso </v-tab>
            <v-tab class="rounded-pill no-uppercase"> Validadas </v-tab>
            <v-tab class="rounded-pill no-uppercase"> Por Validar </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5">
            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="inReviewList" />
            </v-tab-item>

            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="validatedList" />
            </v-tab-item>

            <v-tab-item>
                <BaseMyAbilitiesList :myAbilitiesList="notValidatedList" />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>
