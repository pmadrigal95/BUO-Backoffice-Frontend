<script>
/**
 * Descripción: Pantalla Buo Dashboard
 *
 * @displayName BUODashboardViewComponent
 */

import { mapGetters } from 'vuex';

const NotifierViewComponent = () =>
    import(
        '@/views/dashboard/buoDashboard/sections/notifier/NotifierViewComponent'
    );

export default {
    name: 'BUODashboardViewComponent',

    components: {
        NotifierViewComponent,
    },

    computed: {
        ...mapGetters('dashboard', ['notifier']),
    },
};
</script>

<template>
    <section>
        <NotifierViewComponent v-if="!notifier" />
    </section>
</template>
