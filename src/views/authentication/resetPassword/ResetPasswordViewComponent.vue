<script>
/**
 * Descripción: Pantalla de Recuperacion de Password
 *
 * @displayName ResetPasswordViewComponent
 */

const RequestResetPasswordViewComponent = () =>
    import(
        '@/views/authentication/resetPassword/components/request/RequestResetPasswordViewComponent.vue'
    );

const ChangePasswordViewComponent = () =>
    import(
        '@/views/authentication/resetPassword/components/password/ChangePasswordViewComponent.vue'
    );

export default {
    name: 'ResetPasswordViewComponent',

    metaInfo: { title: 'Recuperar Contraseña' },

    components: {
        RequestResetPasswordViewComponent,
        ChangePasswordViewComponent,
    },

    mounted() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },
};
</script>

<template>
    <div>
        <ChangePasswordViewComponent v-if="$router.currentRoute.params.token" />
        <RequestResetPasswordViewComponent v-else />
    </div>
</template>
