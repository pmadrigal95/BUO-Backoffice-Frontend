<script>
/**
 * Descripción: Pantalla  Seguridad
 *
 * @displayName SecurityDashboardViewComponent
 *
 */

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

export default {
    name: 'SecurityDashboardViewComponent',

    components: {
        BaseCardViewComponent,
    },

    data() {
        return {
            id: undefined,
            loading: false,
        };
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
            <p>{{ $router.currentRoute.params.Id }}</p>
        </div>
    </BaseCardViewComponent>
</template>
