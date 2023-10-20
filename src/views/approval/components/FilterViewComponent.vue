<script>
/**
 * Descripción: Pantalla Filtro Competencias
 *
 * @displayName CompetenceFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/assessment/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/assessment/AssessmentViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        /**
         * Status code of ability
         */
        statusCode: {
            type: Number,
            required: true,
        },

        companyId: {
            type: Number,
            required: true,
        },

        updateGrid: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        AssessmentViewComponent,
    },

    data() {
        return {
            key: 0,
            assessment: {},
            loading: false,
            comment: undefined,
            newStatusCode: undefined,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('Approval');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setApprovalSetting({
                companyId: this.user.companyId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.companyId,
                statusId: this.statusCode,
                userKey: 'userId',
                userId:
                    this.user.companyId != this.buoId && this.user.userId
                        ? this.user.userId
                        : undefined,
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                this.$router.currentRoute.meta.module,
                baseSecurityHelper.$_write
            );
            return result;
        },

        assessmentPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                baseSecurityHelper.$_assessment
            );
            return result;
        },

        showBottonApprove() {
            return this.statusCode ===
                baseConfigHelper.$_statusCode.certifying ||
                baseConfigHelper.$_statusCode.uncertified ||
                this.statusCode === baseConfigHelper.$_statusCode.rejected
                ? true
                : false;
        },

        showBottonDecline() {
            return this.statusCode ===
                baseConfigHelper.$_statusCode.certifying ||
                baseConfigHelper.$_statusCode.uncertified ||
                this.statusCode === baseConfigHelper.$_statusCode.certificate
                ? true
                : false;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setApprovalColumns({
                companyId: this.user.companyId,
                pageView: this.pageView,
            });
            this.key++;
        },

        /**
         * Open a modal
         */
        $_open() {
            this.$refs['popUp'].$_openModal();
        },

        /**
         * Close a modal
         */
        $_close() {
            if (this.$refs['popUp'].$_checkStatus()) {
                this.$_open();
            }
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        /**
         * Verify that select some ability
         */
        $_verifyAbility() {
            const rows = this.$_GetRow().length;

            switch (true) {
                case rows == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                case rows >= 1:
                    this.$_open();
                    break;
            }
        },

        /**
         * Set a certificate state for an ability
         */
        $_approveAbility() {
            this.$_verifyAbility();
            this.newStatusCode = baseConfigHelper.$_statusCode.certificate;
        },

        /**
         * Set a rejected state for an ability
         */
        $_rejectedAbility() {
            this.$_verifyAbility();
            this.newStatusCode = baseConfigHelper.$_statusCode.rejected;
        },

        /**
         * Set a information to ability or several
         */
        $_setAbility() {
            return this.$_GetRow().map((element) =>
                Object.assign({}, element, {
                    usuarioId: element.usuarioId,
                    usuarioModificaId: this.user.userId,
                    newEstadoId: this.newStatusCode,
                    comentario: this.comment,
                })
            );
        },

        $_sendToApi() {
            this.loading = true;
            httpService
                .post(
                    `empleadoCompetencia/updateStatusList`,
                    this.$_setAbility()
                )
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.updateGrid();
                    }
                });
        },

        $_setAssessmentByType(type) {
            this.assessment = {};
            this.assessment = baseAssessmentHelper.$_setAssessmentByType({
                type,
                key: 'usuarioId',
                userName: 'nombreEmpleado',
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.companyId,
            });
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
        >
            <div slot="Content">
                <v-card flat height="100%" width="100%">
                    <v-card-title class="BUO-Heading-Small buo-word-break"
                        >Competencias
                    </v-card-title>
                    <v-card-text>
                        <BaseSkeletonLoader
                            v-if="loading"
                            type="article, actions"
                        />
                        <BaseForm
                            :method="$_sendToApi"
                            :cancel="$_close"
                            v-else
                        >
                            <div slot="body">
                                <v-row dense>
                                    <v-col cols="12">
                                        <BaseTextArea
                                            label="Comentario"
                                            v-model.trim="comment"
                                            :validate="['text']"
                                            :max="255"
                                            :min="1"
                                            counter="255"
                                            required
                                            rows="10"
                                        />
                                    </v-col>
                                </v-row>
                            </div>
                        </BaseForm>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>
        <BaseServerDataTable
            :key="key"
            v-if="setting"
            :ref="pageView"
            :pageView="pageView"
            :setting="setting"
            :extraParams="extraParams"
            :fnResetConfig="$_setFilter"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3">
                    <BaseCustomsButtonsGrid
                        v-if="permission && showBottonApprove"
                        label="Aprobar"
                        :fnMethod="$_approveAbility"
                        icon="mdi-thumb-up-outline"
                        color="greenB900"
                    />

                    <BaseCustomsButtonsGrid
                        v-if="permission && showBottonDecline"
                        label="Rechazar"
                        :fnMethod="$_rejectedAbility"
                        icon="mdi-thumb-down-outline"
                        color="redError900"
                    />

                    <AssessmentViewComponent
                        v-if="assessmentPermission"
                        :entity="assessment"
                        :organizacionId="companyId"
                        :fn="$_setAssessmentByType"
                    />
                </v-row>
            </div>
        </BaseServerDataTable>
        <BaseSkeletonLoader v-else type="table" />
    </section>
</template>
