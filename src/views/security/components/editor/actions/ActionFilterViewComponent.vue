<script>
/**
 * Descripción: Pantalla FilterViewComponent
 *
 * @displayName ActionFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

// import {
//     baseFilterSettingsHelper,
//     baseDataTableColumnsHelper,
// } from '@/helpers/baseFilterSettingsHelper';

// const BaseServerDataTable = () =>
//     import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

export default {
    name: 'ActionFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        // BaseServerDataTable,
        StepViewComponent,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        // ...mapGetters('authentication', ['user', 'buoId']),

        // ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        // pageView() {
        //     return this.pageViewById('setIndicadorUserFilter');
        // },

        // extraParams() {
        //     return (
        //         this.entity.companyId &&
        //         baseFilterSettingsHelper.$_setExtraParams({
        //             companyId: this.entity.companyId,
        //         })
        //     );
        // },

        // /**
        //  * Configuracion BaseServerDataTable
        //  */
        // setting() {
        //     return baseFilterSettingsHelper.$_setUserSetting({
        //         companyId: this.entity.companyId,
        //         departmentId: this.entity.departmentId,
        //         singleSelect: false,
        //         list: this.filtersBypageView(this.pageView),
        //         pageView: this.pageView,
        //     });
        // },
    },

    methods: {
        // $_setFilter() {
        //     baseDataTableColumnsHelper.$_setUserColumns({
        //         companyId: this.entity.companyId,
        //         departmentId: this.entity.departmentId,
        //         pageView: this.pageView,
        //     });
        //     this.key++;
        // },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_goBack() {
            this.entity.form.tempAccionIds = [];
            this.entity.form.accionIds = [];

            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <section class="mx-10 my-10">
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-2-circle"
                description="(opcional) Seleccionar acciones"
                iconColor="greenC900"
                :font="`BUO-Paragraph-Large-SemiBold ${
                    app ? 'white--text' : 'grey700--text'
                }`"
            />
        </v-layout>

        <!-- <BaseServerDataTable
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
                <v-row class="pl-3 pt-3" v-if="entity.companyId">
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
                        class="mx-4"
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
        </BaseServerDataTable> -->
    </section>
</template>
