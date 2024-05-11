<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */
import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const HeaderVacantDetailsViewComponent = () =>
    import(
        '@/views/recruitment/components/header/HeaderVacantDetailsViewComponent'
    );

const StatisticalRecruitmentCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/StatisticalRecruitmentCardsViewComponent'
    );

const HistoricalRecruitmentChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/chart/linealChart/HistoricalRecruitmentChartComponent'
    );

const CandidateInfoListCardViewComponent = () =>
    import(
        '@/views/recruitment/components/card/CandidateInfoListCardViewComponent'
    );

const ActionCardViewComponent = () =>
    import('@/views/recruitment/components/card/ActionCardViewComponent');

const NotFoundCardViewComponent = () =>
    import('@/views/recruitment/components/card/NotFoundCardViewComponent');

export default {
    name: 'RecruitmentDashboardViewComponent',

    components: {
        BaseCardViewComponent,
        HeaderVacantDetailsViewComponent,
        StatisticalRecruitmentCardsViewComponent,
        HistoricalRecruitmentChartComponent,
        CandidateInfoListCardViewComponent,
        ActionCardViewComponent,
        NotFoundCardViewComponent,
    },

    data() {
        return {
            entity: undefined,
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        positionId() {
            return this.$router.currentRoute.params.Id;
        },
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Function to return the Dashboard
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'BUODashboardViewComponent',
            });
        },

        $_setFilter() {
            return {
                organizacionId: 84,
                departamentoId: 0,
                fecha: '2024-05-01T00:00:00',
                vacanteId: this.positionId,
            };
        },

        /**
         * Determinar vacante
         */
        $_getObject() {
            if (this.positionId) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService
                    .post('dashboard/reclutamiento/vacante', this.$_setFilter())
                    .then((response) => {
                        this.loading = false;
                        if (response != undefined) {
                            // Encontro la entidad
                            this.entity = BaseArrayHelper.SetObject(
                                {},
                                response.data
                            );
                        }
                    });
            }
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <BaseCardViewComponent
        v-else
        md="12"
        offset="0"
        title="Nombre de vacante pendiente"
        :btnAction="$_returnToFilter"
    >
        <div slot="card-text">
            <section>
                <v-row>
                    <v-col cols="12" v-if="entity.header" class="mb-n4">
                        <HeaderVacantDetailsViewComponent
                            :entity="entity.header"
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        v-if="entity.cardList && entity.cardList.length > 0"
                    >
                        <StatisticalRecruitmentCardsViewComponent
                            :chartData="entity.cardList"
                        />
                    </v-col>

                    <v-col cols="12" v-if="entity.historicUser">
                        <HistoricalRecruitmentChartComponent
                            :chartData="entity.historicUser"
                        />
                    </v-col>
                </v-row>
            </section>

            <section>
                <h1
                    class="mt-12 mb-4 BUO-Heading-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                >
                    Resultados
                </h1>
                <v-row>
                    <v-col
                        cols="12"
                        v-if="
                            entity.topCandidates &&
                            entity.topCandidates.length > 0
                        "
                    >
                        <CandidateInfoListCardViewComponent
                            :cardList="entity.topCandidates"
                        />
                    </v-col>

                    <v-col cols="12" v-else>
                        <NotFoundCardViewComponent />
                    </v-col>

                    <v-col cols="12">
                        <ActionCardViewComponent />
                    </v-col>
                </v-row>
            </section>
        </div>
    </BaseCardViewComponent>
</template>
