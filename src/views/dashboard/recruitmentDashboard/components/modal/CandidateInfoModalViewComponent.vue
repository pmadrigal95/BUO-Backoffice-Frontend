<script>
/**
 * Descripción: Pantalla  CandidateInfoModalViewComponent
 *
 * @displayName CandidateInfoModalViewComponent
 *
 */
import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseHeaderMenu = () => import('@/components/core/drawers/BaseHeaderMenu');

const StatusCardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/card/StatusCardViewComponent'
    );

const CoincidenceCardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/card/CoincidenceCardViewComponent'
    );

export default {
    name: 'CandidateInfoModalViewComponent',

    components: {
        BaseHeaderMenu,
        StatusCardViewComponent,
        CoincidenceCardViewComponent,
    },

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',

            chartData: [],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },

        $_setData(data) {
            this.chartData = [];
            this.chartData = data;
            this.$_openModal();
        },

        $_setIcon(name) {
            return name ? baseSharedFnHelper.$_set_initials(name) : null;
        },

        $_setCandidate(id) {
            console.log(id);
        },

        $_rejectCandidate(id) {
            console.log(id);
        },
    },
};
</script>

<template>
    <BasePopUp
        :ref="refpopUp"
        :width="$vuetify.breakpoint.mobile ? '100%' : 'auto'"
        scrollable
    >
        <div
            slot="Content"
            class="d-flex flex-wrap"
            v-if="chartData && chartData.length > 0"
        >
            <div v-for="(item, i) in chartData" :key="i" class="ma-auto">
                <v-card
                    flat
                    :width="$vuetify.breakpoint.mobile ? '100%' : '500px'"
                    class="text-start"
                >
                    <v-card-text>
                        <div slot="body">
                            <v-row dense>
                                <v-col cols="12">
                                    <BaseHeaderMenu
                                        v-if="item.name && item.email"
                                        :title="item.name"
                                        :subtitle="item.email"
                                        :userAvatar="$_setIcon(item.name)"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="
                                        item.coincidence &&
                                        item.coincidence.length > 0
                                    "
                                >
                                    <CoincidenceCardViewComponent
                                        :chartData="item.coincidence"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="
                                        item.education &&
                                        item.education.length > 0
                                    "
                                >
                                    <StatusCardViewComponent
                                        title="Educación"
                                        :chartData="item.education"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="
                                        item.workExp && item.workExp.length > 0
                                    "
                                >
                                    <StatusCardViewComponent
                                        title="Exp. Laboral"
                                        :chartData="item.workExp"
                                    />
                                </v-col>
                                <v-col
                                    cols="12"
                                    v-if="
                                        item.psychometric &&
                                        item.psychometric.length > 0
                                    "
                                >
                                    <StatusCardViewComponent
                                        title="Psicométricos"
                                        :chartData="item.psychometric"
                                    />
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-layout justify-space-between align-end>
                            <v-btn
                                dark
                                color="red"
                                elevation="0"
                                text
                                depressed
                                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            >
                                Rechazar
                            </v-btn>
                            <v-btn
                                dark
                                elevation="0"
                                outlined
                                depressed
                                :color="app ? 'blue500' : 'blue900'"
                                class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                            >
                                Seleccionar
                            </v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </BasePopUp>
</template>
