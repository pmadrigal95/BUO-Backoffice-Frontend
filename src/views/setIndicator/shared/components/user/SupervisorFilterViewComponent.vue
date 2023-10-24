<script>
/**
 * Descripción: Pantalla FilterViewComponent
 *
 * @displayName SupervisorFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent');

export default {
    name: 'SupervisorFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        StepViewComponent,
    },

    data() {
        return {
            key: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('setIndicadorUserFilter');
        },

        extraParams() {
            return (
                this.entity.companyId &&
                baseFilterSettingsHelper.$_setExtraParams({
                    companyId: this.entity.companyId,
                })
            );
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setUserSetting({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setUserColumns({
                companyId: this.entity.companyId,
                departmentId: this.entity.departmentId,
                pageView: this.pageView,
            });
            this.key++;
        },

        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs[this.pageView].$data.selected;
        },

        $_validateTutors(array) {
            return this.entity.selected.userList.some((o) =>
                array.some((v) => v.userId === o.userId)
            );
        },

        $_setTutorList(array) {
            this.entity?.selected?.tutorList &&
                delete this.entity.selected.tutorList;

            if (array.length > 0) {
                if (this.$_validateTutors(array)) {
                    baseNotificationsHelper.Message(
                        true,
                        '¡Cuidado!, No puedes asignar un supervisor si lo has seleccionado previamente para evaluar un indicador.'
                    );
                    return;
                }

                this.entity.selected.tutorList = array;
            }

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

            this.$_setTutorList(array);
        },

        $_goBack() {
            delete this.entity.selected.abilityIdList;
            delete this.entity.selected.abilityList;
            this.entity.step = 1;
        },
    },
};
</script>

<template>
    <section>
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-3-circle"
                description="Seleccionar evaluadores"
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
        </BaseServerDataTable>
    </section>
</template>
