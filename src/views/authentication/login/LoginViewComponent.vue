<script>
/**
 * Descripción: Pantalla de Login
 *
 * @displayName LoginViewComponent
 */
import { mapActions } from 'vuex';

import baseLocalHelper from '@/helpers/baseLocalHelper.js';

import baseArrayHelper from '@/helpers/baseArrayHelper.js';

const TheAuthentication = () =>
    import('@/layouts/authentication/TheAuthentication.vue');

export default {
    name: 'LoginViewComponent',

    metaInfo: { title: 'Authentication' },

    components: {
        TheAuthentication,
    },

    data() {
        return {
            entity: this.$_Object(),
            showPassword: false,
            loading: false,
            lblbtnLogin: baseLocalHelper.$_LabelBtnSigIn,
        };
    },

    created() {
        localStorage.removeItem(baseLocalHelper.$_jwtToken);
    },

    methods: {
        /**
         * Obj de la pantalla
         */
        $_Object() {
            return {
                username: undefined,
                password: undefined,
            };
        },

        /**
         * Configuración authentication
         */
        ...mapActions('authentication', ['login']),

        $_authenticate() {
            this.loading = true;
            let object = baseArrayHelper.SetObject({}, this.entity);
            this.login({
                credentials: object,
            });
            this.loading = false;
        },

        $_Password() {
            this.showPassword = !this.showPassword;
        },

        $_goToRoute(route) {
            this.$router.push({ name: route });
        },
    },
};
</script>

<template>
    <TheAuthentication :isImg="false">
        <div slot="RenderBody">
            <v-row class="neutral--text">
                <v-col cols="12">
                    <v-card-text>
                        <v-col cols="12" sm="12" offset-md="1">
                            <h1
                                class="neutral--text"
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Display-Medium'
                                        : 'BUO-Display-Large',
                                ]"
                            >
                                ¡Hola!
                            </h1>

                            <div
                                class="neutral--text"
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Heading-Small'
                                        : 'BUO-Paragraph-Large',
                                ]"
                            >
                                Iniciar sesión - Backoffice
                            </div>
                        </v-col>
                        <v-row align-content="center" justify="center">
                            <v-col cols="12" sm="12" md="10">
                                <!-- @ Use Loanding... -->
                                <BaseSkeletonLoader
                                    v-if="loading"
                                    type="article, actions"
                                />
                                <BaseForm
                                    :method="$_authenticate"
                                    :labelBtn="lblbtnLogin"
                                    :login="true"
                                    v-else
                                >
                                    <div slot="body">
                                        <v-row>
                                            <v-col cols="12">
                                                <BaseInput
                                                    label="Email"
                                                    v-model="entity.username"
                                                    :validate="['email']"
                                                />
                                            </v-col>

                                            <v-col cols="12">
                                                <BaseInput
                                                    :type="
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    label="Contraseña"
                                                    :append-icon="
                                                        showPassword
                                                            ? 'mdi-eye'
                                                            : 'mdi-eye-off'
                                                    "
                                                    :clickAppend="$_Password"
                                                    v-model="entity.password"
                                                    :validate="['text']"
                                                />
                                                <div
                                                    class="BUO-Paragraph-Medium text-center"
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                    <a
                                                        @click="
                                                            $_goToRoute(
                                                                'ResetPasswordViewComponent'
                                                            )
                                                        "
                                                        @click.stop
                                                    >
                                                        Ingresa aquí
                                                    </a>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </BaseForm>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </div>
    </TheAuthentication>
</template>
