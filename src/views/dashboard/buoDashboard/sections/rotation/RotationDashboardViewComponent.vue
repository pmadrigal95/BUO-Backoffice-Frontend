<script>
/**
 * Descripción: Pantalla  RotationDashboardViewComponent
 *
 * @displayName RotationDashboardViewComponent
 *
 */

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'RotationDashboardViewComponent',

    props: {
        filter: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseAdvancedFilter,
    },
};
</script>

<template>
    <BaseAdvancedFilter
        isDepartment
        isMonth
        requiredMonth
        :show="true"
        v-model="filter"
    >
        <div slot="body">
            <span>Hola</span>
        </div>
    </BaseAdvancedFilter>
</template>
