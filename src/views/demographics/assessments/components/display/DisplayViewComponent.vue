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

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const ProfileAccumulatedViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/display/ProfileAccumulatedViewComponent'
    );

const ProfileDistributionViewComponent = () =>
    import(
        '@/views/demographics/assessments/components/display/ProfileDistributionViewComponent'
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
        BaseCustomsButtonsGrid,
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

        pie() {
            return this.report.pieDto;
        },

        bar() {
            return this.report.stackDto;
        },
    },

    created() {
        this.$_getObject();
    },

    methods: {
        $_showAdvFilter() {
            this.entity.show = !this.entity.show;
        },

        $_sendToApi() {},

        $_setBody() {
            return {
                organizacionId: this.entity.companyId,
                departamentoId: this.entity.departmentId,
                pruebaId: this.entity.assessmentId,
            };
        },

        /**
         * Determinar Reporte
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService
                .post('analytics/assessments', this.$_setBody())
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
        <v-row
            dense
            v-if="
                report.pieDto.labels.length > 0 ||
                report.stackDto.labels.length > 0
            "
        >
            <v-col cols="12" v-if="report.pieDto.labels.length > 0">
                <v-card flat class="rounded-t-xl">
                    <v-card-text>
                        <v-row justify="end" class="pa-3">
                            <BaseCustomsButtonsGrid
                                label="Descargar"
                                :outlined="false"
                                :fnMethod="$_sendToApi"
                                icon="mdi-download-circle-outline"
                            />

                            <BaseCustomsButtonsGrid
                                label="Filtro Avanzado"
                                :fnMethod="$_showAdvFilter"
                                :outlined="!entity.show"
                                icon="mdi-filter-cog-outline"
                            />
                        </v-row>
                        <ProfileAccumulatedViewComponent
                            :data="pie"
                            :isDepartmentFilter="isDepartmentFilter"
                        />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" v-if="report.stackDto.labels.length > 0">
                <v-card flat>
                    <v-card-text>
                        <ProfileDistributionViewComponent :data="bar" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <BaseNotFoundContent
            msg="Lamentablemente, no se han encontrado datos al aplicar el filtro seleccionado."
            v-else
        />
    </section>
</template>
