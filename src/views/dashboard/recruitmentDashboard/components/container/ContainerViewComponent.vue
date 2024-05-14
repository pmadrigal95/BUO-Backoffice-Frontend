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
        '@/views/dashboard/recruitmentDashboard/components/header/HeaderVacantDetailsViewComponent'
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
        '@/views/dashboard/recruitmentDashboard/components/card/CandidateInfoListCardViewComponent'
    );

const GridContainerViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/grid/GridContainerViewComponent'
    );

const ActionCardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/card/ActionCardViewComponent'
    );

const NotFoundCardViewComponent = () =>
    import(
        '@/views/dashboard/recruitmentDashboard/components/card/NotFoundCardViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    props: {
        vacancyId: {
            type: [Number, String],
            requiered: true,
        },

        callback: {
            type: Function,
            default: undefined,
        },
    },

    components: {
        BaseCardViewComponent,
        HeaderVacantDetailsViewComponent,
        StatisticalRecruitmentCardsViewComponent,
        HistoricalRecruitmentChartComponent,
        CandidateInfoListCardViewComponent,
        GridContainerViewComponent,
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

        ...mapGetters('dashboard', ['filter']),
    },

    created() {
        this.$_getObject();
    },

    methods: {
        $_setFilter() {
            return {
                organizacionId: this.filter?.companyId,
                departamentoId: this.filter?.departmentId
                    ? this.filter?.departmentId
                    : 0,
                fecha: this.filter?.month
                    ? `${this.filter?.month}-01T00:00:00`
                    : undefined,
                vacanteId: this.vacancyId,
            };
        },

        /**
         * Determinar vacante
         */
        $_getObject() {
            if (this.vacancyId) {
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
        class="mt-1 ml-1"
        v-else
        md="12"
        offset="0"
        title="Nombre de vacante pendiente"
        :btnAction="callback"
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

                    <v-col cols="12" v-if="vacancyId">
                        <GridContainerViewComponent :vacancyId="vacancyId" />
                    </v-col>

                    <v-col cols="12">
                        <ActionCardViewComponent />
                    </v-col>
                </v-row>
            </section>
        </div>
    </BaseCardViewComponent>
</template>
