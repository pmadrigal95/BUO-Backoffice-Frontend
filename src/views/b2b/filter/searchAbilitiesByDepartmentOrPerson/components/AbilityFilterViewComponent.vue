<script>
/**
 * Descripción: Pantalla Busqueda de Habilidad
 *
 * @displayName AbilityFilterViewComponent
 *
 */

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

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
        setting() {
            return {
                endpoint: `ability/findBy/${
                    this.entity.departamentoId
                        ? this.entity.departamentoId
                        : '0'
                }`,
                dynamic: true,
            };
        },

        extraParams() {
            let array = [];
            if (this.entity.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });
            }

            if (this.entity.usuarioId) {
                array.push({
                    name: 'usuarioId',
                    value: this.entity.usuarioId.join('|'),
                });
            }

            return array.length > 0 ? array : undefined;
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
    <div v-if="entity">
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    Todas las habilidades
                </div>
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
                    label="Ver Habilidad"
                    :outlined="false"
                    :fnMethod="$_viewMicroAbility"
                    icon="mdi-shield"
                />
            </div>
        </BaseServerDataTable>
    </div>
</template>
