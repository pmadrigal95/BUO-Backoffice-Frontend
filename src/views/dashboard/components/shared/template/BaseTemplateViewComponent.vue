<script>
/**
 * Descripción: Pantalla  Template
 *
 * @displayName BaseTemplateViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import BaseSharedFnHelper from '@/helpers/baseSharedFnHelper';

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
                if (BaseSharedFnHelper.$_isEqualObj(newFilter, oldFilter)) {
                    this.clean_dashboard();
                    this.$_updateVuex(newFilter);
                }
            },
            deep: true,
            immediate: true,
        },
    },

    created() {
        this.$_setFilter();
    },

    methods: {
        ...mapActions('dashboard', ['filter_user', 'clean_dashboard']),

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
                <BaseHeaderViewComponent :title="title" :type="type">
                    <section slot="btns">
                        <slot name="custom-btns" />
                    </section>
                </BaseHeaderViewComponent>

                <BaseContainerTemplateViewComponent :type="type">
                    <section slot="container">
                        <slot name="body" />
                    </section>
                </BaseContainerTemplateViewComponent>
            </section>
        </section>
    </BaseAdvancedFilter>
</template>
