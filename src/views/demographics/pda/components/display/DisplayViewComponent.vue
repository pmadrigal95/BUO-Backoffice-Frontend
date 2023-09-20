<script>
/**
 * Descripción: Pantalla
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const ProfileViewComponent = () =>
    import('@/views/demographics/pda/components/display/ProfileViewComponent');

const AxesBehaviorViewComponent = () =>
    import(
        '@/views/demographics/pda/components/display/AxesBehaviorViewComponent'
    );

const IndicatorsViewComponent = () =>
    import(
        '@/views/demographics/pda/components/display/IndicatorsViewComponent'
    );

const ProfileAccumulatedViewComponent = () =>
    import(
        '@/views/demographics/pda/components/display/ProfileAccumulatedViewComponent'
    );

const ProfileDistributionViewComponent = () =>
    import(
        '@/views/demographics/pda/components/display/ProfileDistributionViewComponent'
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
        BaseNotFoundContent,
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
        <v-row dense v-if="report.selfName">
            <v-col cols="12">
                <ProfileViewComponent
                    :entity="entity"
                    :profile="profile"
                    :profileUrl="report.imageUrl"
                />
            </v-col>

            <v-col cols="12">
                <ProfileAccumulatedViewComponent
                    :data="pie"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>

            <v-col cols="12">
                <ProfileDistributionViewComponent :data="bar" />
            </v-col>

            <v-col cols="12">
                <IndicatorsViewComponent
                    :data="radar"
                    :color="report.selfName"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>

            <v-col cols="12">
                <AxesBehaviorViewComponent
                    :data="axes"
                    :isDepartmentFilter="isDepartmentFilter"
                />
            </v-col>
        </v-row>
        <BaseNotFoundContent
            msg="Lamentablemente, no se han encontrado datos al aplicar el filtro seleccionado."
            v-else
        />
    </section>
</template>
