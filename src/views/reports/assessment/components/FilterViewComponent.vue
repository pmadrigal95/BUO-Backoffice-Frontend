<script>
/**
 * Descripción: Pantalla Filtro User Assessments
 *
 * @displayName AssessmentViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import baseFnFile from '@/helpers/baseFnFile';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/assessment/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/assessment/AssessmentViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        AssessmentViewComponent,
    },

    data() {
        return {
            loading: [{ value: false }, { value: false }],
            assessment: {},
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('Assessment');
        },

        errorMsg() {
            return 'Solo se podra generar el reporte de aquellos colaboradores que hayan completado el assessment asignado.';
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
                assessmentTypeId: this.entity.assessmentId
                    ? undefined
                    : this.entity.assessmentTypeId,
                assessmentId: this.entity.assessmentId,
            });
        },

        setting() {
            // return this.filtersBypageView(this.pageView);
            return baseFilterSettingsHelper.$_setUserAssessmentSetting({
                companyId: this.user.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                [baseSecurityHelper.$_download, baseSecurityHelper.$_assessment]
            );
            return result;
        },
    },

    created() {
        // this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]:
                        baseFilterSettingsHelper.$_setUserAssessmentSetting({
                            companyId: this.user.companyId,
                            departmentId: this.entity.departmentId,
                            singleSelect: false,
                        }),
                });
                this.key++;
            }
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
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

        $_setAssessmentByType(type) {
            this.assessment = {};
            this.assessment = baseAssessmentHelper.$_setAssessmentByType({
                type,
                key: 'usuarioId',
                userName: 'nombreUsuario',
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.entity.companyId,
            });
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        :key="key"
        v-if="setting"
        :ref="pageView"
        :pageView="pageView"
        :setting="setting"
        :extraParams="extraParams"
        :fnResetConfig="$_setFilter"
        :fnDoubleClick="$_validatePreview"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <AssessmentViewComponent
                    v-if="permission.Assessment"
                    :entity="assessment"
                    :organizacionId="entity.companyId"
                    :fn="$_setAssessmentByType"
                />

                <BaseCustomsButtonsGrid
                    label="Ver Reporte"
                    :fnMethod="$_validatePreview"
                    icon="mdi-chevron-right"
                    :color="app ? 'blueProgress600' : 'blue900'"
                />

                <BaseCustomsButtonsGrid
                    v-if="permission.Download"
                    label="Descargar"
                    :fnMethod="$_validateDownload"
                    icon="mdi-download"
                    :loading="loading[0].value"
                    :color="app ? 'blueProgress600' : 'blue900'"
                />

                <BaseCustomsButtonsGrid
                    v-if="permission.Download"
                    label="Descargar todo"
                    :outlined="false"
                    :fnMethod="$_downloadAll"
                    :loading="loading[1].value"
                    icon="mdi-download-multiple"
                />
            </v-row>
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
