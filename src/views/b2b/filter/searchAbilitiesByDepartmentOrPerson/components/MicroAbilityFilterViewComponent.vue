<script>
/**
 * Descripción: Pantalla Busqueda de Habilidad
 *
 * @displayName MicroAbilityFilterViewComponent
 *
 */

import { mapGetters } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const MicroAbilityCardViewComponent = () =>
    import(
        '@/views/b2b/filter/searchAbilitiesByDepartmentOrPerson/components/MicroAbilityCardViewComponent'
    );

const RadarViewComponent = () =>
    import('@/views/b2b/filter/common/graph/RadarViewComponent');

export default {
    name: 'MicroAbilityFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        RadarViewComponent,
        MicroAbilityCardViewComponent,
    },

    data() {
        return {
            usuarioIdList: undefined,
            componentKey: 0,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        setting() {
            return baseFilterSettingsHelper.$_setDinamycMicroAbilitySetting({
                departmentId: this.entity.departamentoId,
                singleSelect: false,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
                userId: this.entity.usuarioId.join('|'),
                qualificationId: this.entity.cualificacionId,
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

        $_goBack() {
            delete this.entity.cualificacionId;
            delete this.entity.definicionCualificacion;
            this.entity.step = 0;
        },

        $_userDetails(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (true) {
                case row.length == 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case row.length > 0 && row.length < 4:
                    this.usuarioIdList = row.map(
                        (element) => element.usuarioId
                    );
                    this.componentKey++;
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        'Puedes seleccionar hasta un máximo de tres colaboradores.'
                    );
                    break;
            }
        },
    },
};
</script>

<template>
    <div
        v-if="
            entity && entity.cualificacionId && entity.definicionCualificacion
        "
    >
        <v-row justify="start" class="pl-3" dense>
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    <v-btn
                        fab
                        dark
                        x-small
                        outlined
                        class="mb-1"
                        elevation="0"
                        :color="app ? 'blueProgress600' : 'blue800'"
                        @click="$_goBack"
                    >
                        <v-icon dark> mdi-chevron-left </v-icon>
                    </v-btn>
                    {{ entity.definicionCualificacion }}
                </section>
            </v-col>
        </v-row>

        <MicroAbilityCardViewComponent :entity="entity" />

        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_userDetails"
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    label="Comparar PDA"
                    :outlined="false"
                    :fnMethod="$_userDetails"
                    icon="mdi-account-group-outline"
                />
            </div>
        </BaseServerDataTable>

        <RadarViewComponent
            :key="componentKey"
            :usuarioIdList="usuarioIdList"
            v-if="usuarioIdList && usuarioIdList.length > 0"
        />
    </div>
</template>
