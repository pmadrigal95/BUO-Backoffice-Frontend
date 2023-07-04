<script>
/**
 * Descripción: Pantalla Filtro Tipo de Assessments
 *
 * @displayName AssessmentTypeFilterViewComponent
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
    name: 'AssessmentTypeFilterViewComponent',

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
            return this.user.companyId != this.buoId
                ? baseFilterSettingsHelper.$_setExtraParams({
                      companyId: this.user.companyId,
                  })
                : undefined;
        },

        setting() {
            return baseFilterSettingsHelper.$_setAssessmentTypeSetting({
                companyId: this.user.companyId,
            });
        },
    },

    methods: {
        // /**
        //  * Body Request
        //  */
        // $_createBodyRequestDelete(row) {
        //     return {
        //         userId: this.user.userId,
        //         id: row[0].id,
        //     };
        // },
        // /**
        //  * Delete Function
        //  */
        // $_fnDelete(row) {
        //     httpService
        //         .post(
        //             'categoria/deactivate',
        //             this.$_createBodyRequestDelete(row)
        //         )
        //         .then((response) => {
        //             if (response != undefined) {
        //                 this.$refs.Filter.$_ParamsToAPI();
        //             }
        //         });
        // },
        // /**
        //  * Pantalla Editor
        //  */
        // $_Editor(params) {
        //     this.$router.push({
        //         name: 'CategoryEditorViewComponent',
        //         params: params && { Id: params.selected[this.setting.key] },
        //     });
        // },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Tipos de assessments">
        <div slot="card-text">
            <BaseServerDataTable
                ref="Filter"
                :setting="setting"
                :extraParams="extraParams"
            />
        </div>
    </BaseCardViewComponent>
</template>
