<script>
/**
 * Descripción: Pantalla UserFilterViewComponent
 *
 * @displayName UserFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

export default {
    name: 'UserFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            key: 0,
        };
    },

    components: {
        BaseServerDataTable,
        StepViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('securityUserFilter');
        },

        extraParams() {
            return (
                this.entity.form.organizacionId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.entity.form.organizacionId,
                })
            );
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.form.organizacionId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.entity.form.organizacionId,
                pageView: this.pageView,
            });
            this.key++;
        },

        $_goBack() {
            this.entity.form.tempUsuarioIds = [];
            this.entity.form.usuarioIds = [];

            this.entity.step = 1;
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_setUserList(array) {
            this.entity.form.tempUsuarioIds = array;
            this.entity.form.usuarioIds = [];

            this.entity.step = 3;
        },

        $_setList(params) {
            const row =
                Array.isArray(params) || params.selected
                    ? params.selected
                        ? [params.selected]
                        : params
                    : this.$_GetRow();

            const array = row.map((element) => {
                return {
                    userId: element.id,
                    name: element.nombreCompleto,
                    departamentId: element.nombreDepartamento,
                };
            });

            this.$_setUserList(array);
        },
    },
};
</script>

<template>
    <section class="mx-10 my-10">
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-3-circle"
                description="(opcional) Seleccionar colaboradores"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
        </v-layout>

        <BaseServerDataTable
            :key="key"
            v-if="entity && setting"
            :ref="pageView"
            :pageView="pageView"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_setList"
            cancellabelBtn="Regresar"
            :cancel="$_goBack"
            :fnResetConfig="$_setFilter"
            :needExportToExcel="false"
        >
            <div slot="btns">
                <v-row class="pl-3 pt-3" v-if="entity.form.organizacionId">
                    <v-btn
                        fab
                        x-small
                        elevation="0"
                        class="mx-1"
                        color="primary"
                        @click="$_goBack"
                    >
                        <v-icon dark> mdi-chevron-left </v-icon>
                    </v-btn>

                    <v-btn
                        fab
                        x-small
                        color="primary"
                        @click="$_setList"
                        elevation="0"
                        class="mx-1"
                    >
                        <v-icon dark> mdi-chevron-right </v-icon>
                    </v-btn>
                </v-row>
            </div>
            <div slot="footerBtns">
                <v-btn
                    class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Small-SemiBold"
                    elevation="0"
                    color="primary"
                    @click="$_setList"
                    dark
                    small
                    >Continuar</v-btn
                >
            </div>
        </BaseServerDataTable>
    </section>
</template>
