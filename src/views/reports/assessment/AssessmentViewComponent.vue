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

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'AssessmentViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
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
                companyId: this.user.companyId,
            });
        },

        setting() {
            return baseFilterSettingsHelper.$_setUserAssessmentSetting({
                companyId: this.user.companyId,
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Control de assessments">
        <div slot="card-text">
            <BaseServerDataTable
                ref="Filter"
                :setting="setting"
                :extraParams="extraParams"
            />
        </div>
    </BaseCardViewComponent>
</template>
