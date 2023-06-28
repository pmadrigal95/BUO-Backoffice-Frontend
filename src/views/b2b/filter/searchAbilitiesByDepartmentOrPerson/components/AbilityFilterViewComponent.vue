<script>
/**
 * Descripción: Pantalla Busqueda de Habilidad
 *
 * @displayName AbilityFilterViewComponent
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

const ScaleHelperViewComponent = () =>
    import('@/views/b2b/filter/common/display/ScaleHelperViewComponent');

export default {
    name: 'AbilityFilterViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        BaseServerDataTable,
        BaseCustomsButtonsGrid,
        ScaleHelperViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        setting() {
            return baseFilterSettingsHelper.$_setDinamycAbilitySetting({
                departmentId: this.entity.departamentoId,
            });
        },

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
                userId: this.entity.usuarioId.join('|'),
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

        $_viewMicroAbility(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.entity.cualificacionId = row[0].cualificacionId;
                    this.entity.definicionCualificacion =
                        row[0].definicionCualificacion;
                    this.entity.step = 1;
                    break;
            }
        },
    },
};
</script>

<template>
    <section v-if="entity">
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    Todos los indicadores
                </section>
            </v-col>
        </v-row>
        <ScaleHelperViewComponent />
        <BaseServerDataTable
            ref="filter"
            :setting="setting"
            :fnDoubleClick="$_viewMicroAbility"
            :extraParams="extraParams"
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    label="Ver Indicador"
                    :outlined="false"
                    :fnMethod="$_viewMicroAbility"
                    icon="mdi-shield"
                />
            </div>
        </BaseServerDataTable>
    </section>
</template>
