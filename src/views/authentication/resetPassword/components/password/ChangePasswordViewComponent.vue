<script>
/**
 * Descripción: Pantalla de Solicitud de cambiar Pwd
 *
 * @displayName ChangePasswordViewComponent
 */

import httpService from '@/services/axios/httpService.js';

const TheAuthentication = () =>
    import('@/layouts/authentication/TheAuthentication.vue');

const BasePasswordInput = () =>
    import('@/components/core/forms/BasePasswordInput');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseNotificationCardTemplate = () =>
    import('@/components/core/cards/BaseNotificationCardTemplate');

export default {
    name: 'ChangePasswordViewComponent',

    data() {
        return {
            step: 1,
            loading: false,
            password: undefined,
        };
    },

    components: {
        TheAuthentication,
        BaseCardViewComponent,
        BaseNotificationCardTemplate,
        BasePasswordInput,
    },

    methods: {
        $_sendToAPI() {
            if (this.password) {
                this.loading = true;
                const entity = {
                    token: this.$router.currentRoute.params.token,
                    password: this.password,
                };

                httpService
                    .post('user/resetPassword', entity)
                    .then((response) => {
                        if (response != undefined) {
                            this.step = 2;
                        }
                        this.loading = false;
                    });
            }
        },
    },
};
</script>

<template>
    <v-window v-model="step" touchless>
        <v-window-item :value="1">
            <TheAuthentication
                imgCss="https://buo-resources.s3.us-east-2.amazonaws.com/password/forgotPassword.svg"
            >
                <div slot="RenderBody">
                    <BaseCardViewComponent
                        title="Nueva contraseña"
                        subtitle="Ingresa tu nueva contraseña."
                    >
                        <div slot="body">
                            <BaseSkeletonLoader
                                v-if="loading"
                                type="article, actions"
                            />
                            <BaseForm
                                :method="$_sendToAPI"
                                labelBtn="Enviar"
                                :block="true"
                                :enterSubmit="false"
                                v-else
                            >
                                <div slot="body">
                                    <BasePasswordInput
                                        v-model.trim="password"
                                    />
                                </div>
                            </BaseForm>
                        </div>
                    </BaseCardViewComponent>
                </div>
            </TheAuthentication>
        </v-window-item>
        <v-window-item :value="2">
            <v-container
                fluid
                class="px-0"
                :class="$vuetify.breakpoint.smAndDown && 'pt-0'"
            >
                <br />
                <br />
                <v-row align-content="center" class="mx-0">
                    <BaseNotificationCardTemplate
                        title="¡Todo listo!"
                        subtitle="Tu contraseña ha sido actualizada."
                        img="https://buo-resources.s3.us-east-2.amazonaws.com/invite.png"
                        elevation="0"
                    >
                        <div slot="btns">
                            <v-row>
                                <v-col cols="12">
                                    <v-btn
                                        class="no-uppercase rounded-lg"
                                        color="blue900"
                                        dark
                                        block
                                        :to="{ name: 'LoginViewComponent' }"
                                        >Ingresar</v-btn
                                    >
                                </v-col>
                            </v-row>
                        </div>
                    </BaseNotificationCardTemplate>
                </v-row>
            </v-container>
        </v-window-item>
    </v-window>
</template>
