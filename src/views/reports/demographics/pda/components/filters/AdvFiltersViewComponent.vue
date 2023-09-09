<script>
/**
 * Descripción: Pantalla
 *
 * @displayName AdvFiltersViewComponent
 *
 */

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/display/DisplayViewComponent'
    );

export default {
    name: 'AdvFiltersViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseNotFoundContent,
        DisplayViewComponent,
        BaseCustomsButtonsGrid,
    },

    data() {
        return {
            entity: this.$_Object(),
            show: true,
        };
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: undefined,
                departmentId: undefined,
            };
        },

        $_showAdvFilter() {
            this.show = !this.show;
        },
    },
};
</script>

<template>
    <BaseAdvancedFilter
        :show="show"
        isDepartment
        v-model="entity"
        :requiredCompany="false"
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
</template>
