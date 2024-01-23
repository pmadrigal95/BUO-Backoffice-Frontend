<script>
/**
 * Descripción: Pantalla  RotationDashboardViewComponent
 *
 * @displayName RotationDashboardViewComponent
 *
 */

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/rotation/display/DisplayViewComponent'
    );

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
        DisplayViewComponent,
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
            <DisplayViewComponent :filter="filter" />
        </div>
    </BaseAdvancedFilter>
</template>
