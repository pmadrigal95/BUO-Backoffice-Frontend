<script>
/**
 * Descripción: Pantalla Filtro User Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

// import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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

    data() {
        return {
            loading: [{ value: false }, { value: false }],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        errorMsg() {
            return 'Solo se podra generar el reporte de aquellos colaboradores que hayan completado el assessment asignado.';
        },

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
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.Filter.$data.selected;
        },

        $_sendToApi(number, request) {
            this.loading[number].value = true;
            httpService
                .post('pruebaResultado/pdf', request)
                .then((response) => {
                    if (response != undefined) {
                        response.data == '' &&
                            baseNotificationsHelper.Message(
                                true,
                                this.errorMsg
                            );

                        baseFnFile.$_dowloadFile(
                            response.data.fileEncoded,
                            response.data.fileName,
                            baseFnFile.$_extensionsName.zip
                        );
                    }
                    this.loading[number].value = false;
                });
        },

        $_download(row) {
            row.some((element) => element.completado === false) &&
                baseNotificationsHelper.Message(true, this.errorMsg);

            const idList = row
                .filter((x) => x.completado)
                .map((element) => element.id);

            if (idList.length <= 0) {
                return;
            }

            this.$_sendToApi(0, {
                organizacionId: this.entity.companyId,
                idList,
            });
        },

        $_validateDownload() {
            const row = this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                default:
                    this.$_download(row);
                    break;
            }
        },

        $_downloadAll() {
            this.$_sendToApi(1, { organizacionId: this.entity.companyId });
        },

        $_preview(object) {
            if (!object.completado) {
                baseNotificationsHelper.Message(true, this.errorMsg);
                return;
            }

            this.entity.preview = object;
            this.entity.step = 1;
        },

        $_validatePreview(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.$_preview(row[0]);
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        ref="Filter"
        :setting="setting"
        :extraParams="extraParams"
        :fnDoubleClick="$_validatePreview"
    >
        <div slot="btns">
            <BaseCustomsButtonsGrid
                label="Ver Reporte"
                :fnMethod="$_validatePreview"
                icon="mdi-chevron-right"
                :color="app ? 'blueProgress600' : 'blue900'"
            />

            <BaseCustomsButtonsGrid
                label="Descargar"
                :fnMethod="$_validateDownload"
                icon="mdi-download"
                :loading="loading[0].value"
                :color="app ? 'blueProgress600' : 'blue900'"
            />

            <BaseCustomsButtonsGrid
                label="Descargar todo"
                :outlined="false"
                :fnMethod="$_downloadAll"
                :loading="loading[1].value"
                icon="mdi-download-multiple"
            />
        </div>
    </BaseServerDataTable>
</template>
