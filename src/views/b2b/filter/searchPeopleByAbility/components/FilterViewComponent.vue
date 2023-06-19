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

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const RadarViewComponent = () =>
    import('@/views/b2b/filter/common/graph/RadarViewComponent');

const ScaleHelperViewComponent = () =>
    import('@/views/b2b/filter/common/display/ScaleHelperViewComponent');

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
        BaseCustomsButtonsGrid,
        RadarViewComponent,
        ScaleHelperViewComponent,
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
            return {
                endpoint: `talent/findBy/${
                    this.entity.departamentoId
                        ? this.entity.departamentoId
                        : '0'
                }`,
                singleSelect: false,
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

            if (this.entity.cualificacionId) {
                array.push({
                    name: 'cualificacionId',
                    value: this.entity.cualificacionId.join('|'),
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

        $_viewProfile(params) {
            const row = params ? [params.selected] : this.$_GetRow();

            switch (row.length) {
                case 0:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotSelected
                    );
                    break;

                case 1:
                    this.entity.userId = row[0].usuarioId;
                    this.entity.step = 1;
                    break;

                default:
                    baseNotificationsHelper.Message(
                        true,
                        baseLocalHelper.$_MsgRowNotMultiSelected
                    );
                    break;
            }
        },
    },
};
</script>

<template>
    <div>
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    Todos los colaboradores
                </section>
            </v-col>
        </v-row>
        <ScaleHelperViewComponent />
        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
            :fnDoubleClick="$_viewProfile"
        >
            <div slot="btns">
                <BaseCustomsButtonsGrid
                    label="Ver Perfil"
                    :fnMethod="$_viewProfile"
                    icon="mdi-account-search"
                    :color="app ? 'blueProgress600' : 'blue800'"
                />

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
