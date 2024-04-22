<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/shared/assessment/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const AssessmentViewComponent = () =>
    import(
        '@/views/user/user/components/shared//assessment/AssessmentViewComponent'
    );

const UserPasswordViewComponent = () =>
    import(
        '@/views/user/user/components/filter/sections/password/UserPasswordViewComponent'
    );

export default {
    name: 'FilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
        AssessmentViewComponent,
        UserPasswordViewComponent,
    },

    data() {
        return {
            entity: {},
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('UserFilter');
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: baseFilterSettingsHelper.$_getCompanyId({
                    userCompanyId: this.user.companyId,
                    companyId: this.organizacionId,
                }),
            });
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.user.companyId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'UserViewComponent',
                [baseSecurityHelper.$_write, baseSecurityHelper.$_upload]
            );
            return result;
        },

        assessmentPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'AssessmentControlViewComponent',
                baseSecurityHelper.$_assessment
            );
            return result;
        },

        actions() {
            return [
                {
                    icon: 'table-arrow-up',
                    title: 'Carga Masiva',
                    fn: this.$_fnLoad,
                    show: this.permission?.Upload,
                },
                {
                    icon: 'email-arrow-right-outline',
                    title: 'Reenviar Activación',
                    fn: this.$_fnResendActivation,
                    show: this.permission?.Write,
                },
                {
                    icon: 'account-lock-open-outline',
                    title: 'Cambiar Contraseña',
                    fn: this.$_openModalChangePwd,
                    show: this.permission?.Write,
                },
            ];
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                pageView: this.pageView,
            });
            this.key++;
        },

        /**
         * Body Request
         */
        $_createBodyRequestDelete(rows) {
            const request = {
                userId: this.user.userId,
                ids: rows.map((element) => element.id),
            };
            return request;
        },

        /**
         * Desactive Function
         */
        $_fnDesactiveUser(row) {
            httpService
                .post(
                    'user/deactivateMassive',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
                    }
                });
        },

        $_setQuery() {
            if (this.organizacionId) {
                return {
                    organizacionId: this.organizacionId
                        ? this.organizacionId
                        : undefined,
                };
            }

            return undefined;
        },

        /**
         * Pantalla Editor
         */
        $_userEditor(params) {
            this.$router.push({
                name: 'UserEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
                query: !params && this.$_setQuery(),
            });
        },

        /**
         * Pantalla Carga Masiva
         */
        $_fnLoad() {
            this.$router.push({
                name: 'UserBulkLoadViewComponent',
                query: this.$_setQuery(),
            });
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_setAssessmentByType(type) {
            this.entity = {};
            this.entity = baseAssessmentHelper.$_setAssessmentByType({
                type,
                getRow: this.$_GetRow,
                UserCompanyId: this.user.companyId,
                filterCompanyId: this.organizacionId,
            });
        },

        $_validateRow({ callback, isMultiSelect }) {
            const row = this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                case row.length > 0: {
                    if (row.length > 1 && !isMultiSelect) {
                        return baseNotificationsHelper.Message(
                            true,
                            baseLocalHelper.$_MsgRowNotMultiSelected
                        );
                    }

                    callback(row);

                    break;
                }
            }
        },

        $_cleanSelectedRows() {
            this.$refs[this.pageView].$_cleanSelectedRows();
        },

        $_sentToResentActivation(row) {
            const object = row.map((element) => element.id);
            httpService
                .post(`user/resendActivationEmail`, {
                    usuarioIds: object,
                })
                .then((response) => {
                    if (response != undefined) {
                        this.$_cleanSelectedRows();
                    }
                });
        },

        $_fnResendActivation() {
            this.$_validateRow({
                callback: this.$_sentToResentActivation,
                isMultiSelect: true,
            });
        },

        $_setEntityForChangePwd() {
            const row = this.$_GetRow();

            this.entity = {};

            this.entity = Object.assign(
                {},
                ...row.map((element) => ({
                    userId: element.id,
                    name: element.nombreCompleto,
                    deparment: element.nombreDepartamento,
                    organization: element.nombreOrganizacion,
                }))
            );
        },

        $_openModal() {
            this.$refs['popUp'].$_open();
        },

        $_openModalChangePwd() {
            this.$_setEntityForChangePwd();
            this.$_validateRow({
                callback: this.$_openModal,
                isMultiSelect: false,
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
        :fnNew="permission?.Write ? $_userEditor : undefined"
        :fnEdit="permission?.Write ? $_userEditor : undefined"
        :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
        :fnActions="actions"
        :fnResetConfig="$_setFilter"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <AssessmentViewComponent
                    v-if="assessmentPermission"
                    :entity="entity"
                    :organizacionId="organizacionId"
                    :fn="$_setAssessmentByType"
                />

                <UserPasswordViewComponent
                    ref="popUp"
                    :entity="entity"
                    :callback="$_cleanSelectedRows"
                    v-if="entity"
                />
            </v-row>
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
