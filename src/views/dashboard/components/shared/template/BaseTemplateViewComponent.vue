<script>
/**
 * Descripción: Pantalla  Template
 *
 * @displayName BaseTemplateViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

const BaseHeaderViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/header/BaseHeaderViewComponent'
    );

const BaseContainerTemplateViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/template/BaseContainerTemplateViewComponent'
    );

export default {
    name: 'BaseTemplateViewComponent',

    props: {
        title: {
            type: String,
            default: undefined,
        },

        type: {
            type: String,
            requiered: true,
        },
    },

    components: {
        BaseAdvancedFilter,
        BaseHeaderViewComponent,
        BaseContainerTemplateViewComponent,
    },

    data() {
        return {
            advFilter: undefined,
        };
    },

    computed: {
        ...mapGetters('dashboard', ['showFilter', 'filter']),
    },

    watch: {
        advFilter: {
            handler(newFilter, oldFilter) {
                if (JSON.stringify(newFilter) !== JSON.stringify(oldFilter)) {
                    this.$_updateVuex(newFilter);
                }
            },
            immediate: true,
        },
    },

    created() {
        this.$_setFilter();
    },

    methods: {
        ...mapActions('dashboard', ['filter_user']),

        $_setFilter() {
            this.advFilter = this.filter;
        },

        $_updateVuex(filter) {
            this.filter_user(filter);
        },
    },
};
</script>

<template>
    <BaseAdvancedFilter
        class="mt-6"
        isDepartment
        isMonth
        requiredMonth
        v-model="advFilter"
        :show="showFilter"
    >
        <section slot="body">
            <section class="mx-4" v-if="filter.companyId">
                <BaseHeaderViewComponent :title="title" />

                <BaseContainerTemplateViewComponent :type="type">
                    <section slot="container">
                        <slot name="body" />
                    </section>
                </BaseContainerTemplateViewComponent>
            </section>
        </section>
    </BaseAdvancedFilter>
</template>
