<script>
/**
 * Descripción: Pantalla IndicatorFilterViewComponent
 *
 * @displayName IndicatorFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import {
    baseFilterSettingsHelper,
    baseDataTableColumnsHelper,
} from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent.vue');

export default {
    name: 'IndicatorFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        requiredTutors: {
            type: Boolean,
            default: false,
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
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('filters', ['filtersBypageView', 'pageViewById']),

        pageView() {
            return this.pageViewById('setIndicadorFilter');
        },

        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return baseFilterSettingsHelper.$_setAbilitySetting({
                companyId: this.user.companyId,
                isFilter: true,
                singleSelect: false,
                list: this.filtersBypageView(this.pageView),
                pageView: this.pageView,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
            });
        },
    },

    created() {
        this.$_setFilter();
    },

    methods: {
        $_setFilter() {
            baseDataTableColumnsHelper.$_setAbilityColumns({
                companyId: this.user.companyId,
                isFilter: true,
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

                    this.entity.step = this.requiredTutors ? 2 : 3;
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
    <section>
        <v-layout justify-start>
            <StepViewComponent
                icon="mdi-numeric-2-circle"
                :description="`Seleccionar Indicadores ${
                    requiredTutors ? 'a evaluar' : ''
                }`"
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
            :fnDoubleClick="$_setAbilityList"
            :footerMethod="$_setAbilityList"
            labelBtn="Continuar"
            cancellabelBtn="Regresar"
            :cancel="$_goBack"
            :fnResetConfig="$_setFilter"
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
    </section>
</template>
