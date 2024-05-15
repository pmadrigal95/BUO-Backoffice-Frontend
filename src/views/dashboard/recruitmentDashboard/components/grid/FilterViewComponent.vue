<script>
/**
 * Descripción: Pantalla Filtro Vacante
 *
 * @displayName RecruitmentDashboardViewComponent
 *
 */
import { mapGetters } from 'vuex';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs['filter'].$data.selected;
        },

        $_compare(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0 && row.length < 4:
                    console.log(row);
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        'Puedes seleccionar hasta un máximo de tres candidatos.'
                    );
                    break;
            }
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
