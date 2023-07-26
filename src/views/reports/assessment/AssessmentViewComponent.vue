<script>
/**
 * Descripción: Pantalla Filtro User Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const ScaleHelperViewComponent = () =>
    import('@/views/b2b/filter/common/display/ScaleHelperViewComponent');

const DisplayViewComponent = () =>
    import('@/views/reports/assessment/components/DisplayViewComponent');

export default {
    name: 'AssessmentViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        DisplayViewComponent,
        ScaleHelperViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
            show: true,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_showAdvFilter() {
            this.show = !this.show;
        },

        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                departmentId: undefined,
                assessmentTypeId: undefined,
                assessmentId: undefined,
                step: 0,
            };
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Supervisa con precisión, lidera con éxito"
        subtitle="Tu centro de control de assessments para un equipo de alto rendimiento."
    >
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                isDepartment
                isAssessmentType
                isAssessment
                requiredResetStep
                assessmentTypeEndpoint="findAllTree"
                v-model="entity"
                :title="`Seleccione ${
                    user.companyId === buoId ? 'la empresa' : 'el departamento'
                }`"
            >
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-row justify="end" class="pa-3">
                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                />
                            </v-row>
                            <ScaleHelperViewComponent type="assessment" />
                            <section class="pt-3">
                                <DisplayViewComponent :entity="entity" />
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
