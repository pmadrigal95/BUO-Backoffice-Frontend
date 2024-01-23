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

        entity: {
            type: Object,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
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
        v-model="entity"
    >
        <div slot="body">
            <DisplayViewComponent
                :filter="filter"
                :innerWidth="innerWidth"
                v-if="filter.organizacionId"
            />
        </div>
    </BaseAdvancedFilter>
</template>
