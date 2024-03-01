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
        innerWidth: {
            type: [Number, String],
            required: true,
        },

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
