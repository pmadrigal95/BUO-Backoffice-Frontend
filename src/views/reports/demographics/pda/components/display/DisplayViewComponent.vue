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
            return this.report.stackDto;
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
            <v-col cols="12" order-sm="1" order-md="1">
                <ProfileViewComponent
                    :entity="entity"
                    :profile="profile"
                    :profileUrl="report.imageUrl"
                />
            </v-col>

            <v-col cols="12" md="6" order-sm="2" order-md="2">
                <ProfileAccumulatedViewComponent
                    :data="pie"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>

            <v-col cols="12" md="6" order-sm="4" order-md="3">
                <IndicatorsViewComponent
                    :data="radar"
                    :color="report.selfName"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>

            <v-col cols="12" order-sm="3" order-md="4">
                <ProfileDistributionViewComponent :data="bar" />
            </v-col>

            <v-col cols="12" order-sm="5" order-md="5">
                <AxesBehaviorViewComponent
                    :data="axes"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>
        </v-row>
    </section>
</template>
