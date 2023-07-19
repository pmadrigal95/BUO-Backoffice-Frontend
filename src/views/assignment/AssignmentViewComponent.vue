<script>
/**
 * Descripción: Pantalla  Certificaciones
 *
 * @displayName AssignmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const HelperViewComponent = () =>
    import('@/views/assignment/components/HelperViewComponent');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import('@/views/assignment/components/DisplayViewComponent');

export default {
    name: 'AssignmentViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseNotFoundContent,
        HelperViewComponent,
        DisplayViewComponent,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            show: true,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        abilityPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent'
            );
            return result;
        },

        userPermission() {
            const result =
                baseSecurityHelper.$_ReadPermission('UserViewComponent');
            return result;
        },
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                departmentId: undefined,
                step: 0,
            };
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToAbility() {
            this.$router.push({
                name: 'AbilityFilterViewComponent',
            });
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToUser() {
            this.$router.push({
                name: 'UserFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Empodera el crecimiento de tu equipo"
        subtitle="Asignación de indicadores para alcanzar el éxito."
    >
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                isDepartment
                requiredResetStep
                v-model="entity"
                :requiredCompany="false"
            >
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-row justify="end" class="pa-3">
                                <BaseCustomsButtonsGrid
                                    v-if="abilityPermission"
                                    label="Administrar Indicadores"
                                    :fnMethod="$_returnToAbility"
                                    icon="mdi-shield-star"
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                />

                                <BaseCustomsButtonsGrid
                                    v-if="userPermission"
                                    label="Administrar Colaboradores"
                                    :fnMethod="$_returnToUser"
                                    icon="mdi-account-group-outline"
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                />

                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                />

                                <HelperViewComponent />
                            </v-row>
                            <section class="pt-3">
                                <BaseNotFoundContent
                                    v-if="!entity.companyId"
                                    msg="Por favor seleccione una empresa"
                                />
                                <DisplayViewComponent :entity="entity" v-else />
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
