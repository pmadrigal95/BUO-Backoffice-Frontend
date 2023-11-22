<script>
/**
 * Descripción: Pantalla UserDialogFilterViewComponent
 *
 * @displayName UserDialogFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

import httpService from '@/services/axios/httpService';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

export default {
    name: 'UserDialogFilterViewComponent',

    props: {
        perfilId: {
            type: Number,
            requiered: true,
        },

        organizacionId: {
            type: Number,
            requiered: true,
        },

        fnCallback: {
            type: Function,
            default: () => {},
        },
    },

    data() {
        return {
            key: 0,
        };
    },

    components: {
        BaseServerDataTable,
        // BaseCustomsButtonsGrid,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('securityUserFilter');
        },

        extraParams() {
            return (
                this.organizacionId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.organizacionId,
                })
            );
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.organizacionId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.organizacionId,
                pageView: this.pageView,
            });
            this.key++;
        },

        $_open() {
            this.$refs.popUp.$_openModal();
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_setList(params) {
            const row =
                Array.isArray(params) || params.selected
                    ? params.selected
                        ? [params.selected]
                        : params
                    : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0:
                    this.$_sendToApi({
                        perfilId: this.perfilId,
                        isDelete: false,
                        usuarioIds: row.map((element) => element.id),
                    });
                    break;
            }
        },

        $_sendToApi(request) {
            httpService.post('perfil/handleUsers', request).then((response) => {
                if (response != undefined) {
                    this.fnCallback();
                    this.$_open();
                }
            });
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '65%'"
        :isDrawer="false"
        scrollable
    >
        <div slot="Content">
            <BaseServerDataTable
                :key="key"
                v-if="setting"
                :ref="pageView"
                :pageView="pageView"
                :setting="setting"
                :extraParams="extraParams"
                :fnDoubleClick="$_setList"
                :footerMethod="$_setList"
                :fnResetConfig="$_setFilter"
                :cancel="$_open"
                :needExportToExcel="false"
            />
        </div>
    </BasePopUp>
</template>
