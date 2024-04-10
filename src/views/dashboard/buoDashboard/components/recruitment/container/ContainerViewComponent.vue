<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseDisplay from '@/views/dashboard/components/shared/row-display/container-display';

const StatisticalRecruitmentCardsViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/card/StatisticalRecruitmentCardsViewComponent'
    );

const HistoricalRecruitmentChartComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/chart/linealChart/HistoricalRecruitmentChartComponent'
    );

const RecruitmentProgressLinearViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/recruitment/chart/progressLinearChart/RecruitmentProgressLinearViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    props: {
        type: {
            type: String,
            default: 'recruitment',
        },
    },

    components: {
        StatisticalRecruitmentCardsViewComponent,
        HistoricalRecruitmentChartComponent,
        RecruitmentProgressLinearViewComponent,
    },

    computed: {
        ...mapGetters('dashboard', ['dashboardById']),

        entity() {
            return this.dashboardById(this.type);
        },
    },

    methods: {
        md(nextColumn) {
            return baseDisplay.$_setLayout(nextColumn);
        },
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" v-if="entity.cardList && entity.cardList.length > 0">
            <StatisticalRecruitmentCardsViewComponent
                :chartData="entity.cardList"
            />
        </v-col>

        <v-col cols="12" v-if="entity.historicUser">
            <HistoricalRecruitmentChartComponent
                :chartData="entity.historicUser"
            />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.perks)"
            v-if="entity.perks && entity.perks.length > 0"
        >
            <RecruitmentProgressLinearViewComponent
                title="Puesto con mayor índice de rotación"
                :chartData="entity.perks"
            />
        </v-col>

        <v-col
            cols="12"
            :md="$vuetify.breakpoint.mobile ? 12 : md(entity.perks)"
            v-if="entity.perks && entity.perks.length > 0"
        >
            <RecruitmentProgressLinearViewComponent
                title="Departamentos con mayor índice de rotación"
                :chartData="entity.perks"
            />
        </v-col>
    </v-row>
</template>
