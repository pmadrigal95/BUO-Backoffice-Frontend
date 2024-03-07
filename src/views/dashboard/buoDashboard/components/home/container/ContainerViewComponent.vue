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
            default: 'home',
        },
    },

    computed: {
        ...mapGetters('dashboard', ['dashboardById']),
    },
};
</script>

<template>
    <section>
        <span>home</span>
    </section>
</template>
