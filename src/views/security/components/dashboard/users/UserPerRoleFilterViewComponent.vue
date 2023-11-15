<script>
/**
 * Descripción: Pantalla Filtro
 *
 * @displayName UserPerRoleFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

// import httpService from '@/services/axios/httpService';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

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
        BaseCustomsButtonsGrid,
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
        $_fnDelete() {
            // httpService
            //     .post(
            //         'codigoPromocion/deactivate',
            //         this.$_createBodyRequestDelete(row)
            //     )
            //     .then((response) => {
            //         if (response != undefined) {
            //             this.$refs[this.pageView].$_ParamsToAPI();
            //         }
            //     });
        },

        /**
         * Add Function
         */
        $_fnAdd() {
            // httpService
            //     .post(
            //         'codigoPromocion/deactivate',
            //         this.$_createBodyRequestDelete(row)
            //     )
            //     .then((response) => {
            //         if (response != undefined) {
            //             this.$refs[this.pageView].$_ParamsToAPI();
            //         }
            //     });
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
        :needExportToExcel="false"
    >
        <div slot="btns">
            <v-row class="pl-3 pt-3">
                <BaseCustomsButtonsGrid
                    v-if="write"
                    label="Agregar"
                    :fnMethod="$_fnAdd"
                    icon="mdi-plus"
                    color="greenB900"
                />

                <BaseCustomsButtonsGrid
                    v-if="write"
                    label="Eliminar"
                    :fnMethod="$_fnDelete"
                    icon="mdi-delete-outline"
                    color="redError900"
                />
            </v-row>
        </div>
    </BaseServerDataTable>
    <BaseSkeletonLoader v-else type="table" />
</template>
