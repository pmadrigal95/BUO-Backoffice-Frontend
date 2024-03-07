<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

import { mapGetters } from 'vuex';

export default {
    name: 'ContainerViewComponent',

    props: {
        type: {
            type: String,
            default: 'performance',
        },
    },

    computed: {
        ...mapGetters('dashboard', ['dashboardById']),
    },
};
</script>

<template>
    <section>
        <span>performance</span>
    </section>
</template>
