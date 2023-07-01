<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

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

    computed: {
        ...mapGetters('authentication', ['user']),

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
        $_createBodyRequestDelete(row) {
            const request = {
                userId: this.user.userId,
                id: row[0].id,
            };
            return request;
        },

        /**
         * Desactive Function
         */
        $_fnDesactiveUser(row) {
            httpService
                .post('user/deactivate', this.$_createBodyRequestDelete(row))
                .then((response) => {
                    if (response != undefined) {
                        this.$refs.UserFilter.$_ParamsToAPI();
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
            <BaseCustomsButtonsGrid
                v-if="permission?.Upload"
                label="Carga Masiva"
                :fnMethod="$_fnLoad"
                icon="mdi-table-arrow-up"
                :color="app ? 'blueProgress600' : 'blue800'"
            />

            <AssessmentViewComponent />
        </div>
    </BaseServerDataTable>
</template>
