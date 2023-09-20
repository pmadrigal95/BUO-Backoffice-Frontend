<script>
/**
 * Descripción: Pantalla
 *
 * @displayName AdvFiltersViewComponent
 *
 */

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import('@/views/demographics/pda/components/display/DisplayViewComponent');

export default {
    name: 'AdvFiltersViewComponent',

    components: {
        BaseAdvancedFilter,
        BaseNotFoundContent,
        DisplayViewComponent,
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
                show: true,
            };
        },
    },
};
</script>

<template>
    <BaseAdvancedFilter
        :show="entity.show"
        isDepartment
        v-model="entity"
        :requiredCompany="false"
    >
        <div slot="body">
            <v-card v-if="!entity.companyId" flat class="rounded-t-xl">
                <v-card-text>
                    <section class="pt-3">
                        <BaseNotFoundContent
                            msg="Por favor seleccione una empresa"
                        />
                    </section>
                </v-card-text>
            </v-card>
            <DisplayViewComponent :entity="entity" v-else />
        </div>
    </BaseAdvancedFilter>
</template>
