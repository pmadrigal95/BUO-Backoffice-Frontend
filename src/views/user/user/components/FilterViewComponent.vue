<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters, mapActions } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

import { baseAssessmentHelper } from '@/views/user/user/components/baseAssessmentHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

/*const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');*/

/*const AssessmentViewComponent = () =>
    import('@/views/user/user/components/AssessmentViewComponent');*/

const UserPasswordViewComponent = () =>
    import('@/views/user/user/components/password/UserPasswordViewComponent');

const MenuViewComponent = () =>
    import('@/views/user/user/components/menu/MenuViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
        //BaseCustomsButtonsGrid,
        //AssessmentViewComponent,
        MenuViewComponent,
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
            return this.filtersBypageView(this.pageView);
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
                    id: 1,
                    icon: 'table-arrow-up',
                    title: 'Carga Masiva',
                    fn: this.$_fnLoad,
                    permission: this.permission?.Upload,
                },
                {
                    id: 2,
                    icon: 'email-arrow-right-outline',
                    title: 'Reenviar Activación',
                    fn: this.$_getResendActivationUserList,
                    subActions: null,
                    permission: this.permission?.Write,
                },
                {
                    id: 3,
                    icon: 'account-lock-open-outline',
                    title: 'Cambiar Contraseña',
                    fn: this.$_openModalChangePassword,
                    subActions: null,
                    permission: this.permission?.Write,
                },
                {
                    id: 4,
                    icon: 'chevron-down',
                    title: 'Assessments',
                    permission: this.assessmentPermission,
                    subActions: [
                        {
                            id: 5,
                            icon: 'pencil-box-outline',
                            title: 'Asignar',
                            fn: this.$_setAssessmentByType,
                            permission: this.assessmentPermission,
                        },
                        {
                            id: 6,
                            icon: 'pencil-box-multiple-outline',
                            title: 'Asignación Masiva',
                            fn: this.$_setAssessmentByType,
                            permission: this.assessmentPermission,
                        },
                    ],
                },
            ];
        },
    },

    created() {
        this.$_setFilter();
    },

    methods: {
        ...mapActions('filters', ['$_set_filter']),

        $_setFilter() {
            const pageView = this.filtersBypageView(this.pageView);

            if (!pageView) {
                this.$_set_filter({
                    [this.pageView]: baseFilterSettingsHelper.$_setUserSetting({
                        companyId: this.user.companyId,
                        singleSelect: false,
                    }),
                });
            }
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

        $_isRowSelected(callback, group = true) {
            const row = this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;
                case row.length > 1 && !group:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
                case row.length > 0: {
                    callback(row);
                    break;
                }
            }
        },

        $_getResendActivationUserList() {
            this.$_isRowSelected(this.$_fnResendActivacionEmail);
        },

        $_fnResendActivacionEmail(row) {
            const object = row.map((element) => element.id);

            httpService
                .post(`user/resendActivationEmail`, {
                    usuarioIds: object,
                })
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
                    }
                });
        },

        $_openModalChangePassword() {
            this.$_isRowSelected(this.$_open, false);
        },

        $_open() {
            this.$refs['popUp'].$_open();
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        v-if="setting"
        :ref="pageView"
        :pageView="pageView"
        :setting="setting"
        :extraParams="extraParams"
        :fnNew="permission?.Write ? $_userEditor : undefined"
        :fnEdit="permission?.Write ? $_userEditor : undefined"
        :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
        :key="key"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <!-- <AssessmentViewComponent
                    v-if="assessmentPermission"
                    :entity="entity"
                    :organizacionId="organizacionId"
                    :fn="$_setAssessmentByType"
                />
                -->

                <MenuViewComponent :actions="actions" />
                <UserPasswordViewComponent ref="popUp" />
            </v-row>
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
