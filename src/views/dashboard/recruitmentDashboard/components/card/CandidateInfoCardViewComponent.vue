<script>
/**
 * Descripción: Pantalla  CandidateInfoCardViewComponent
 *
 * @displayName CandidateInfoCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseColorConfig from '@/views/dashboard/components/shared/row-display/color-percentage-display';

const BaseHeaderMenu = () => import('@/components/core/drawers/BaseHeaderMenu');

const BaseCustomCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseCustomCardViewComponent'
    );

const ProgressCircularComponent = () =>
    import(
        '@/views/dashboard/components/shared/chart/progressCircularChart/ProgressCircularComponent'
    );

const BaseMsgConfirmActionPopUpViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/modal/BaseMsgConfirmActionPopUpViewComponent'
    );

export default {
    name: 'CandidateInfoCardViewComponent',

    props: {
        chartData: {
            type: Object,
            requiered: true,
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    components: {
        BaseHeaderMenu,
        ProgressCircularComponent,
        BaseCustomCardViewComponent,
        BaseMsgConfirmActionPopUpViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        cardSetUp() {
            return {
                width: '360px',
                display: {
                    rounded: 'xl',
                },
            };
        },

        name() {
            return this.chartData.name ? this.chartData.name : 'Sin Nombre';
        },

        email() {
            return this.chartData.email ? this.chartData.email : undefined;
        },

        icon() {
            return this.chartData.name
                ? baseSharedFnHelper.$_set_initials(this.name)
                : null;
        },

        value() {
            return this.chartData.value ? this.chartData.value.toFixed(2) : 0;
        },

        color() {
            return baseColorConfig.$_setColor(this.value);
        },

        candidates() {
            return baseConfigHelper.$_statusCode.active;
        },

        selectedCandidates() {
            return baseConfigHelper.$_statusCode.selectedCandidates;
        },

        rejectedCandidates() {
            return baseConfigHelper.$_statusCode.rejectedCandidates;
        },
    },

    methods: {
        $_setCandidate() {
            this.$refs['MsgConfirmActionPopUp'].$_setData({
                title: 'Seleccionar',
                statusId: this.selectedCandidates,
                name: this.name,
                id: this.chartData.key,
            });
        },

        $_rejectCandidate() {
            this.$refs['MsgConfirmActionPopUp'].$_setData({
                title: 'Rechazar',
                statusId: this.rejectedCandidates,
                name: this.name,
                id: this.chartData.key,
            });
        },
    },
};
</script>

<template>
    <section>
        <BaseMsgConfirmActionPopUpViewComponent
            ref="MsgConfirmActionPopUp"
            :callback="callback"
        />

        <BaseCustomCardViewComponent :card="cardSetUp" v-if="chartData">
            <section slot="container" class="pa-3">
                <section>
                    <BaseHeaderMenu
                        :title="name"
                        :subtitle="email"
                        :userAvatar="icon"
                    />
                </section>

                <section class="ml-2 my-6">
                    <ProgressCircularComponent
                        title="Coincidencia de perfil"
                        :value="value"
                        :color="color"
                        isLandscape
                        isPercentage
                    />
                </section>

                <section class="mx-n3 mb-n4">
                    <v-layout justify-space-between align-end>
                        <v-btn
                            :disabled="chartData.statusId == rejectedCandidates"
                            @click="$_rejectCandidate"
                            color="red"
                            elevation="0"
                            text
                            depressed
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        >
                            Rechazar
                        </v-btn>
                        <v-btn
                            :disabled="chartData.statusId == selectedCandidates"
                            @click="$_setCandidate"
                            elevation="0"
                            outlined
                            depressed
                            :color="app ? 'blue500' : 'blue900'"
                            class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                        >
                            Seleccionar
                        </v-btn>
                    </v-layout>
                </section>
            </section>
        </BaseCustomCardViewComponent>
    </section>
</template>
