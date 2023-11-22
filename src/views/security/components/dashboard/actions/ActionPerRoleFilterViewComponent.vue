<script>
/**
 * Descripción: Pantalla Filtro
 *
 * @displayName ActionPerRoleFilterViewComponent
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

const ActionDialogFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/actions/ActionDialogFilterViewComponent'
    );

export default {
    name: 'ActionPerRoleFilterViewComponent',

    props: {
        id: {
            type: Number,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        ActionDialogFilterViewComponent,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('securityActionsPerRoleFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setSecurityActionPerRoleSetting({
                perfilId: this.id,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        write() {
            const result = baseSecurityHelper.$_ReadPermission(
                'SecurityViewComponent',
                baseSecurityHelper.$_write
            );
            return result;
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setSecurityActionsPerRoleColumns({
                pageView: this.pageView,
            });
            this.key++;
        },

        $_refresh() {
            this.$refs[this.pageView].$_ParamsToAPI();
        },

        $_fnNew() {
            this.$refs['ActionDialogFilterViewComponent'].$_open();
        },

        $_delete(row) {
            httpService
                .post('perfil/handleActions', {
                    perfilId: this.id,
                    isDelete: true,
                    accionIds: row.map((element) => element.accionId),
                })
                .then((response) => {
                    if (response != undefined) {
                        this.$_refresh();
                    }
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
        :fnNew="write ? $_fnNew : undefined"
        :fnDelete="write ? $_delete : undefined"
        :setting="setting"
        :needExportToExcel="false"
    >
        <div slot="btns">
            <ActionDialogFilterViewComponent
                ref="ActionDialogFilterViewComponent"
                v-if="write"
                :perfilId="id"
                :fnCallback="$_refresh"
            />
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
