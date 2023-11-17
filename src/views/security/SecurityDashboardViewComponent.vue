<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityDashboardViewComponent
 *
 */

import { mapGetters } from 'vuex';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const RoleViewComponent = () =>
    import('@/views/security/components/dashboard/role/RoleViewComponent');

export default {
    name: 'SecurityDashboardViewComponent',

    components: {
        RoleViewComponent,
        BaseCardViewComponent,
    },

    data() {
        return {
            panel: [0, 1],
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    created() {
        if (!this.$router.currentRoute.params.Id) {
            this.$_returnToFilter();
        }
    },

    methods: {
        /**
         * Function to return the SecurityFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.push({
                name: 'SecurityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :btnAction="$_returnToFilter"
        v-if="$router.currentRoute.params.Id"
    >
        <div slot="card-text">
            <RoleViewComponent :id="$router.currentRoute.params.Id * 1" />
        </div>
    </BaseCardViewComponent>
</template>
