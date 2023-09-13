<script>
/**
 * Descripción: Pantalla
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const ProfileViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileViewComponent'
    );

const AxesBehaviorViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/AxesBehaviorViewComponent'
    );

const IndicatorsViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/IndicatorsViewComponent'
    );

const ProfileAccumulatedViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileAccumulatedViewComponent'
    );

const ProfileDistributionViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/ProfileDistributionViewComponent'
    );

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        ProfileViewComponent,
        IndicatorsViewComponent,
        AxesBehaviorViewComponent,
        ProfileAccumulatedViewComponent,
        ProfileDistributionViewComponent,
    },

    data() {
        return {
            loading: false,
            report: undefined,
        };
    },

    computed: {
        isDepartmentFilter() {
            return this.entity.departmentId ? true : false;
        },

        profile() {
            return this.report.selfNameUI;
        },

        pie() {
            return this.report.pieDto;
        },

        bar() {
            return {};
        },

        radar() {
            return this.report.pdaAbilities;
        },

        axes() {
            return this.report.pdaAxes;
        },
    },

    created() {
        this.$_getObject();
    },

    methods: {
        $_setBody() {
            return {
                organizacionId: this.entity.companyId,
                departamentoId: this.entity.departmentId,
            };
        },

        /**
         * Determinar Reporte
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService
                .post('analytics/pda', this.$_setBody())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        console.log(response.data);
                        // Encontro la entidad
                        this.report = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <v-row dense>
            <v-col cols="12">
                <ProfileViewComponent
                    :entity="entity"
                    :profile="profile"
                    :profileUrl="report.imageUrl"
                />
            </v-col>

            <v-col cols="12" md="12">
                <ProfileAccumulatedViewComponent :data="pie" />
            </v-col>

            <v-col cols="12">
                <ProfileDistributionViewComponent :data="bar" />
            </v-col>

            <v-col cols="12" md="12">
                <IndicatorsViewComponent
                    :data="radar"
                    :color="report.selfName"
                />
            </v-col>

            <v-col cols="12">
                <AxesBehaviorViewComponent :data="axes" />
            </v-col>
        </v-row>
    </section>
</template>
