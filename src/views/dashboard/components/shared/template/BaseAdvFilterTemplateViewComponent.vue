<script>
/**
 * Descripción: Pantalla Filtros Template
 *
 * @displayName BaseAdvFilterTemplateViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import BaseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseAdvancedFilter = () =>
    import('@/components/backoffice/filter/BaseAdvancedFilter');

export default {
    name: 'BaseAdvFilterTemplateViewComponent',

    components: {
        BaseAdvancedFilter,
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
            <slot name="template" v-if="filter.companyId" />
        </section>
    </BaseAdvancedFilter>
</template>
