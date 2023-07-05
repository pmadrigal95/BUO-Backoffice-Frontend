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

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const AssessmentViewComponent = () =>
    import('@/views/user/user/components/AssessmentViewComponent');

export default {
    name: 'FilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        AssessmentViewComponent,
    },

    data() {
        return {
            entity: {},
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

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
            });
        },

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'UserViewComponent',
                [baseSecurityHelper.$_write, baseSecurityHelper.$_upload]
            );
            return result;
        },
    },

    methods: {
        /**
         * Body Request
         */
        $_createBodyRequestDelete(id) {
            const request = {
                userId: this.user.userId,
                id: id,
            };
            return request;
        },

        /**
         * Desactive Function
         */
        $_fnDesactiveUser(row) {
            row.forEach((element) => {
                httpService
                    .post(
                        'user/deactivate',
                        this.$_createBodyRequestDelete(element.id)
                    )
                    .then((response) => {
                        if (response != undefined) {
                            this.$refs.UserFilter.$_ParamsToAPI();
                        }
                    });
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

        $_validateSameCompany(row) {
            const array = row.filter(
                (element) => element.organizacionId != row[0].organizacionId
            );

            return array.length === 0;
        },

        $_setEntity(row) {
            if (this.$_validateSameCompany(row)) {
                this.entity.isMultiple = false;
                this.entity.companyId = row[0].organizacionId;
                this.entity.userList = row.map((element) => {
                    return {
                        userId: element.id,
                        name: element.nombreCompleto,
                        companyId: element.organizacionId,
                    };
                });
            } else {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgErrorAction
                );
            }
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.UserFilter.$data.selected;
        },

        $_setAssessment() {
            const row = this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0:
                    this.$_setEntity(row);
                    break;
            }
        },

        $_setAssessments() {
            if (this.user.companyId === this.buoId && !this.organizacionId) {
                baseNotificationsHelper.Message(
                    true,
                    baseLocalHelper.$_MsgErrorAction
                );
                return;
            }

            this.entity.isMultiple = true;
            this.entity.companyId = baseFilterSettingsHelper.$_getCompanyId({
                userCompanyId: this.user.companyId,
                companyId: this.organizacionId,
            });
        },

        $_setAssessmentByType(type) {
            this.entity = {};

            if (type) {
                this.$_setAssessment();
            } else {
                this.$_setAssessments();
            }
        },
    },
};
</script>

<template>
    <BaseServerDataTable
        ref="UserFilter"
        :setting="setting"
        :extraParams="extraParams"
        :fnNew="permission?.Write ? $_userEditor : undefined"
        :fnEdit="permission?.Write ? $_userEditor : undefined"
        :fnDelete="permission?.Write ? $_fnDesactiveUser : undefined"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <BaseCustomsButtonsGrid
                    v-if="permission?.Upload"
                    label="Carga Masiva"
                    :fnMethod="$_fnLoad"
                    icon="mdi-table-arrow-up"
                    :color="app ? 'blueProgress600' : 'blue900'"
                />

                <AssessmentViewComponent
                    :entity="entity"
                    :organizacionId="organizacionId"
                    :fn="$_setAssessmentByType"
                />
            </v-row>
        </div>
    </BaseServerDataTable>
</template>
