<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable');

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
    },

    computed: {
        setting() {
            return {
                endpoint: `talent/findBy/${
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

            if (this.entity.cualificacionId) {
                array.push({
                    name: 'cualificacionId',
                    value: this.entity.cualificacionId.toString(),
                });
            }

            return array.length > 0 ? array : undefined;
        },
    },
};
</script>

<template>
    <div>
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    Todos los colaboradores
                </div>
            </v-col>
        </v-row>
        <BaseServerDataTable
            v-if="entity"
            ref="filter"
            :setting="setting"
            :extraParams="extraParams"
        />
    </div>
</template>
