<script>
/**
 * Descripción: Pantalla Filtro Perfiles
 *
 * @displayName ProfileFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import('@/views/user/profile/components/DisplayViewComponent.vue');

export default {
    name: 'ProfileFilterViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseCardViewComponent,
        DisplayViewComponent,
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

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfiles de Colaboradores"
        subtitle="Descubre el perfil de cada persona, sus indicadores y Buo Psychometric"
    >
        <div slot="card-text">
            <BaseAdvancedFilter
                :show="show"
                isDepartment
                v-model="entity"
                :requiredCompany="false"
                requiredResetStep
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
