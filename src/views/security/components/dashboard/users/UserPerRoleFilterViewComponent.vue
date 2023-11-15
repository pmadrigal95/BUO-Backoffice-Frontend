<script>
/**
 * Descripción: Pantalla Filtro
 *
 * @displayName UserPerRoleFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'UserPerRoleFilterViewComponent',

    props: {
        id: {
            type: Number,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('securityUserFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setSecurityUserPerRoleSetting({
                perfilId: this.id,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'PromotionalCodesViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setSecurityUsersPerRoleColumns({
                pageView: this.pageView,
            });
            this.key++;
        },

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
         * Delete Function
         */
        $_fnDeletePromotionalCode(row) {
            httpService
                .post(
                    'codigoPromocion/deactivate',
                    this.$_createBodyRequestDelete(row)
                )
                .then((response) => {
                    if (response != undefined) {
                        this.$refs[this.pageView].$_ParamsToAPI();
                    }
                });
        },

        /**
         * Pantalla Editor
         */
        $_promotionalCodesEditor(params) {
            this.$router.push({
                name: 'PromotionalCodesEditorViewComponent',
                params: params && { Id: params.selected[this.setting.key] },
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
        :fnResetConfig="$_setFilter"
        :setting="setting"
        :fnNew="write ? $_promotionalCodesEditor : undefined"
        :fnDelete="write ? $_fnDeletePromotionalCode : undefined"
    />
    <BaseSkeletonLoader v-else type="table" />
</template>
