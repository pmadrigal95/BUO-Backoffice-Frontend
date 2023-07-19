<script>
/**
 * Descripción: Pantalla Busqueda de habilidades
 *
 * @displayName SearchAbilitiesByDepartmentOrPersonViewComponent
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

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import(
        '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/components/DisplayViewComponent'
    );

export default {
    name: 'SearchAbilitiesByDepartmentOrPersonViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseCardViewComponent,
        BaseCustomsButtonsGrid,
        DisplayViewComponent,
        BaseNotFoundContent,
    },

    data() {
        return {
            entity: this.$_Object(),
            show: true,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AbilityViewComponent'
            );
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
                userId: undefined,
                step: 0,
            };
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },

        /**
         * Function to return the UserFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'AbilityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Tendencias de Talento"
        subtitle="Selecciona un grupo de personas e identifica tendencias entre ellos."
    >
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                isDepartment
                isUser
                requiredResetStep
                v-model="entity"
                :requiredCompany="false"
            >
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-row justify="end" class="pa-3">
                                <BaseCustomsButtonsGrid
                                    v-if="permission"
                                    label="Administrar Indicadores"
                                    :fnMethod="$_returnToFilter"
                                    icon="mdi-shield-star"
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                />

                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                />
                            </v-row>
                            <div class="pt-3">
                                <DisplayViewComponent
                                    :entity="entity"
                                    v-if="entity.companyId"
                                />
                                <BaseNotFoundContent
                                    v-else
                                    msg="Selecciona un departamento o colaboradores para identificar tendencias entre ellos"
                                />
                            </div>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
