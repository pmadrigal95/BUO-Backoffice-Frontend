<script>
/**
 * Descripción: Pantalla Busqueda de Habilidad
 *
 * @displayName AbilityFilterViewComponent
 *
 */

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

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

        $_viewMicroAbility() {},
    },
};
</script>

<template>
    <div>
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    Todas las habilidades
                </div>
            </v-col>
        </v-row>
        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
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
