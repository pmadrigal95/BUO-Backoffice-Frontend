<script>
/**
 * Descripción: Pantalla Filtro User Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

// import httpService from '@/services/axios/httpService';

// import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'AssessmentViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        // write() {
        //     const result = baseSecurityHelper.$_ReadPermission(
        //         'DepartmentViewComponent',
        //         baseSecurityHelper.$_write
        //     );
        //     return result;
        // },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
            });
        },

        setting() {
            return baseFilterSettingsHelper.$_setUserAssessmentSetting({
                companyId: this.user.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
            });
        },
    },

    methods: {
        test() {},
    },
};
</script>

<template>
    <BaseServerDataTable
        ref="Filter"
        :setting="setting"
        :extraParams="extraParams"
    >
        <div slot="btns">
            <BaseCustomsButtonsGrid
                label="Descargar"
                :fnMethod="test"
                icon="mdi-download"
                :color="app ? 'blueProgress600' : 'blue900'"
            />

            <BaseCustomsButtonsGrid
                label="Descargar todo"
                :outlined="false"
                :fnMethod="test"
                icon="mdi-download-multiple"
            />

            <BaseCustomsButtonsGrid
                label="Ver Reporte"
                :fnMethod="test"
                icon="mdi-chevron-right"
                :color="app ? 'blueProgress600' : 'blue900'"
            />
        </div>
    </BaseServerDataTable>
</template>
