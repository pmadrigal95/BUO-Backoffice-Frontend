<script>
/**
 * Descripción: Pantalla  DashboardViewComponent
 *
 * @displayName DashboardViewComponent
 *
 */

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const HeaderViewComponent = () =>
    import('@/views/sandBox/components/dashboard/header/HeaderViewComponent');

const DisplayViewComponent = () =>
    import('@/views/sandBox/components/dashboard/display/DisplayViewComponent');

export default {
    name: 'DashboardViewComponent',

    components: {
        BaseAdvancedFilter,
        HeaderViewComponent,
        DisplayViewComponent,
    },

    data() {
        return {
            entity: this.$_Object(),
        };
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                companyId: null,
                departmentId: null,
                month: null,
            };
        },
    },
};
</script>

<template>
    <section>
        <HeaderViewComponent />
        <BaseAdvancedFilter
            isDepartment
            isMonth
            requiredMonth
            :show="true"
            v-model="entity"
        >
            <div slot="body">
                <DisplayViewComponent />
            </div>
        </BaseAdvancedFilter>
    </section>
</template>
