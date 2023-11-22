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

const UserDialogFilterViewComponent = () =>
    import(
        '@/views/security/components/dashboard/users/UserDialogFilterViewComponent'
    );

export default {
    name: 'UserPerRoleFilterViewComponent',

    props: {
        id: {
            type: Number,
            requiered: true,
        },

        organizacionId: {
            type: Number,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        UserDialogFilterViewComponent,
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
            return this.pageViewById('securityUserPerRoleFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setSecurityUserPerRoleSetting({
                perfilId: this.id,
                singleSelect: false,
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
            baseDataTableColumnsHelper.$_setSecurityUsersPerRoleColumns({
                pageView: this.pageView,
            });
            this.key++;
        },

        $_refresh() {
            this.$refs[this.pageView].$_ParamsToAPI();
        },

        $_fnNew() {
            this.$refs['UserDialogFilterViewComponent'].$_open();
        },

        $_delete(row) {
            httpService
                .post('perfil/handleUsers', {
                    perfilId: this.id,
                    isDelete: true,
                    usuarioIds: row.map((element) => element.usuarioId),
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
            <UserDialogFilterViewComponent
                ref="UserDialogFilterViewComponent"
                v-if="write"
                :perfilId="id"
                :organizacionId="organizacionId"
                :fnCallback="$_refresh"
            />
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
