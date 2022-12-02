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
                endpoint: 'codigoPromocion/findBy',
                columns: [
                    {
                        text: 'Código',
                        align: 'start',
                        value: 'codigo',
                        show: true,
                    },
                ],
                key: 'id',
            };
        },
    },

    methods: {
        $_fnNew() {
            alert('Soy nuevo!');
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="Códigos Promocionales">
        <div slot="card-text">
            <!--Componente Editor -->
            <BaseServerDataTable
                ref="PromotionalCodesFilter"
                :setting="setting"
                :fnNew="$_fnNew"
            />
        </div>
    </BaseCardViewComponent>
</template>
