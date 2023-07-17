<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName SearchPeopleByAbilityViewComponent
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
        '@/views/b2b/filter/searchPeopleByAbility/components/DisplayViewComponent'
    );

export default {
    name: 'SearchPeopleByAbilityViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseNotFoundContent,
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
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        permission() {
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
                indicatorId: undefined,
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
                name: 'UserFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Talento entre tus colaboradores"
        subtitle="Encuentra el talento que buscas según tus necesidades"
    >
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                isDepartment
                isIndicator
                v-model="entity"
                :requiredCompany="false"
            >
                <div slot="body">
                    <v-card flat class="rounded-t-xl">
                        <v-card-text>
                            <v-row justify="end" class="pa-3">
                                <BaseCustomsButtonsGrid
                                    v-if="permission"
                                    label="Administrar colaboradores"
                                    :fnMethod="$_returnToFilter"
                                    icon="mdi-account-group-outline"
                                    :color="app ? 'blueProgress600' : 'blue800'"
                                />

                                <BaseCustomsButtonsGrid
                                    label="Filtro Avanzado"
                                    :fnMethod="$_showAdvFilter"
                                    :outlined="!show"
                                    icon="mdi-filter-cog-outline"
                                />
                            </v-row>
                            <section class="pt-3">
                                <section
                                    v-if="
                                        entity.companyId &&
                                        entity.indicatorId &&
                                        entity.indicatorId.length <= 5
                                    "
                                >
                                    <DisplayViewComponent :entity="entity" />
                                </section>
                                <BaseNotFoundContent
                                    v-else
                                    :msg="
                                        !entity.indicatorId ||
                                        entity.indicatorId.length <= 0
                                            ? 'Selecciona los indicadores que debe tener la persona que buscas'
                                            : 'Nota: No se pueder realizar la búsqueda de más de 5 indicadores a la vez'
                                    "
                                />
                            </section>
                        </v-card-text>
                    </v-card>
                </div>
            </BaseAdvancedFilter>
        </div>
    </BaseCardViewComponent>
</template>
