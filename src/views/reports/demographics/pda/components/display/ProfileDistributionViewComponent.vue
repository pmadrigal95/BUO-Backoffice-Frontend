<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileDistributionViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

export default {
    name: 'ProfileDistributionViewComponent',

    components: {
        BaseCardViewComponent,
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },
};
</script>

<template>
    <BaseCardViewComponent
        title="Perfil Conductual"
        subtitle="Distribución de perfiles conductuales por área"
    >
        <section slot="body">
            <span>HOLA</span>
        </section>
    </BaseCardViewComponent>
</template>
