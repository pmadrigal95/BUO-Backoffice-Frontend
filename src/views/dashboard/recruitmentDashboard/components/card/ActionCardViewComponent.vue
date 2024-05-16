<script>
/**
 * Descripción: Pantalla  ActionCardViewComponent
 *
 * @displayName ActionCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

const BaseBasicCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseBasicCardViewComponent'
    );

export default {
    name: 'ActionCardViewComponent',

    components: { BaseCustomsButtonsGrid, BaseBasicCardViewComponent },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <BaseBasicCardViewComponent>
        <section slot="card-text">
            <BaseCustomsButtonsGrid
                :dark="false"
                :color="app ? 'redError900' : 'redError600'"
                icon="mdi-delete-outline"
                :outlined="false"
                label="Cerrar vacante"
                :fnMethod="() => {}"
                disabled
            />
        </section>
    </BaseBasicCardViewComponent>
</template>
