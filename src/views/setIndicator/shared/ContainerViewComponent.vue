<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const HelperViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/display/HelperViewComponent'
    );

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/display/DisplayViewComponent'
    );

export default {
    name: 'ContainerViewComponent',

    props: {
        requiredTutors: {
            type: Boolean,
            default: false,
        },
    },

    components: {
        BaseAdvancedFilter,
        BaseNotFoundContent,
        HelperViewComponent,
        BaseCustomsButtonsGrid,
        DisplayViewComponent,
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
                        <DisplayViewComponent
                            :entity="entity"
                            :requiredTutors="requiredTutors"
                        />
                    </section>
                </v-card-text>
            </v-card>
        </div>
    </BaseAdvancedFilter>
</template>
