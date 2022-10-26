<script>
/**
 * Descripción: Pantalla Filtro Codigo Promocionales
 *
 * @displayName PromotionalCodesFilterViewComponent
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseServerDataTable = () =>
    import('@/components/core/grids/BaseServerDataTable.vue');

export default {
    name: 'PromotionalCodesFilterViewComponent',

    components: {
        BaseCardViewComponent,
        BaseServerDataTable,
    },

    computed: {
        /**
         * Configuracion BaseServerDataTable
         */
        setting() {
            return {
                endpoint: 'organizacion/getAll',
                columns: [
                    {
                        text: 'Código',
                        align: 'start',
                        value: 'id',
                        show: false,
                    },
                    {
                        text: 'Nombre',
                        align: 'start',
                        value: 'nombre',
                        show: true,
                    },
                    {
                        text: 'Descripcion',
                        align: 'start',
                        value: 'descripcion',
                        show: false,
                    },
                    {
                        text: 'Estado',
                        align: 'start',
                        value: 'nombreEstado',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Códigos Promocionales">
        <div slot="body">
            <BaseServerDataTable
                ref="PromotionalCodesFilter"
                :setting="setting"
            />
        </div>
    </BaseCardViewComponent>
</template>
