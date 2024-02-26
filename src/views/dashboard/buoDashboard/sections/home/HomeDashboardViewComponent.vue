<script>
/**
 * Descripción: Pantalla  HomeDashboardViewComponent
 *
 * @displayName HomeDashboardViewComponent
 *
 */

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const DisplayViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/components/home/display/DisplayViewComponent'
    );

export default {
    name: 'HomeDashboardViewComponent',

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

        showFilter: {
            type: Boolean,
            default: true,
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
        class="mt-6"
        isDepartment
        isMonth
        requiredMonth
        :show="showFilter"
        v-model="entity"
    >
        <div slot="body">
            <DisplayViewComponent />
        </div>
    </BaseAdvancedFilter>
</template>
