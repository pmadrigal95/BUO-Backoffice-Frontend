<script>
/**
 * Descripción: Pantalla
 *
 * @displayName ProfileAccumulatedViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import(
        '@/views/reports/demographics/pda/components/shared/BaseCardViewComponent'
    );

export default {
    name: 'ProfileAccumulatedViewComponent',

    props: {
        isDepartmentFilter: {
            type: Boolean,
            default: false,
        },
    },

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
        :subtitle="`Demográfico Acumulado de Perfiles en ${
            isDepartmentFilter ? 'un área' : 'toda la empresa'
        }`"
    >
        <section slot="body">
            <span>HOLA</span>
        </section>
    </BaseCardViewComponent>
</template>
