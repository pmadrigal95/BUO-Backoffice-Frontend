<script>
/**
 * Descripción: Pantalla Filtro Vacante
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */
import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'FilterViewComponent',

    props: {
        /**
         * Status code of ability
         */
        // statusCode: {
        //     type: Number,
        //     required: true,
        // },

        vacancyId: {
            type: [Number, String],
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('dashboard', ['filter']),

        setting() {
            return baseFilterSettingsHelper.$_setDinamycRecruitmentVacantSetting(
                {
                    singleSelect: false,
                }
            );
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.filter?.companyId,
                departmentId: this.filter?.departmentId
                    ? this.filter?.departmentId
                    : 0,
                date: this.filter?.month
                    ? `${this.filter?.month}-01T00:00:00`
                    : undefined,
                vacancyId: this.vacancyId,
            });
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        ref="filter"
        v-if="setting"
        :setting="setting"
        :extraParams="extraParams"
    />
    <BaseSkeletonLoader v-else type="table" />
</template>
