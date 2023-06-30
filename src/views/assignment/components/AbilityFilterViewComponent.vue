<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent.vue');

export default {
    name: 'FilterViewComponent',

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

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: false,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
            });
        },
    },

    methods: {
        /**
         * Get a registry
         */
        $_GetRow() {
            return this.$refs.filter.$data.selected;
        },

        $_setAbilityList(params) {
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
                    this.entity.selected.abilityIdList = row.map(
                        (element) => element.id
                    );

                    this.entity.step = 2;
                    break;
            }
        },

        $_goBack() {
            delete this.entity.selected;
            this.entity.step = 0;
        },
    },
};
</script>

<template>
    <div>
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-2-circle"
                description="Seleccionar Indicadores"
                iconColor="greenC900"
                font="BUO-Paragraph-Medium"
            />
        </v-layout>

        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_setAbilityList"
            :footerMethod="$_setAbilityList"
            labelBtn="Continuar"
            cancellabelBtn="Regresar"
            :cancel="$_goBack"
        >
            <div slot="btns">
                <v-btn
                    fab
                    x-small
                    color="primary"
                    @click="$_goBack"
                    elevation="0"
                    class="mx-1"
                >
                    <v-icon dark> mdi-chevron-left </v-icon>
                </v-btn>

                <v-btn
                    fab
                    x-small
                    color="primary"
                    @click="$_setAbilityList"
                    elevation="0"
                    class="mx-1"
                >
                    <v-icon dark> mdi-chevron-right </v-icon>
                </v-btn>
            </div>
        </BaseServerDataTable>
    </div>
</template>
