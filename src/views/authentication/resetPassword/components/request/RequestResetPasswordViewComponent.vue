<script>
/**
 * Descripción: Pantalla de Solicitud de cambiar Pwd
 *
 * @displayName ResetPasswordViewComponent
 */

import httpService from '@/services/axios/httpService.js';

const TheAuthentication = () =>
    import('@/layouts/authentication/TheAuthentication.vue');

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseNotificationCardTemplate = () =>
    import('@/components/core/cards/BaseNotificationCardTemplate');

const BaseReCaptchaForm = () =>
    import('@/components/core/forms/BaseReCaptchaForm');

export default {
    name: 'RequestResetPasswordViewComponent',

    data() {
        return {
            step: 1,
            loading: false,
            email: undefined,
        };
    },

    components: {
        TheAuthentication,
        BaseCardViewComponent,
        BaseNotificationCardTemplate,
        BaseReCaptchaForm,
    },

    methods: {
        $_sendToAPI() {
            if (this.email) {
                this.loading = true;
                httpService
                    .post('user/resetPasswordRequest', {
                        username: this.email,
                    })
                    .then((response) => {
                        if (response != undefined) {
                            this.step = 2;
                        }
                        this.loading = false;
                    });
            }
        },

        $_goBack() {
            this.$router.push({
                name: 'LoginViewComponent',
            });
        },
    },
};
</script>

<template>
    <v-window v-model="step" touchless>
        <v-window-item :value="1">
            <TheAuthentication
                imgCss="https://buo-resources.s3.us-east-2.amazonaws.com/password/resetPassword.svg"
            >
                <div slot="RenderBody">
                    <BaseCardViewComponent
                        title="¿Olvidaste tu contraseña?"
                        subtitle="¡No hay problema! Ingresa tu correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu contraseña."
                        :btnAction="$_goBack"
                    >
                        <div slot="body">
                            <BaseSkeletonLoader
                                v-if="loading"
                                type="article, actions"
                            />
                            <BaseReCaptchaForm
                                :method="$_sendToAPI"
                                labelBtn="Enviar"
                                :block="true"
                                v-else
                            >
                                <div slot="body">
                                    <v-row>
                                        <v-col cols="12">
                                            <BaseInput
                                                label="Email"
                                                v-model="email"
                                                :validate="['email']"
                                            />
                                        </v-col>
                                    </v-row>
                                </div>
                            </BaseReCaptchaForm>
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
                        subtitle="Hemos enviado las instrucciones a tu correo electrónico registrado para cambiar tu contraseña exitosamente."
                        img="https://buo-resources.s3.us-east-2.amazonaws.com/password/RecoveryPwd.svg"
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
                                        >Volver al login</v-btn
                                    >
                                </v-col>
                                <v-col cols="12">
                                    <v-btn
                                        class="no-uppercase rounded-lg"
                                        text
                                        block
                                        color="blue900"
                                        @click="$_sendToAPI"
                                        >Reenviar correo</v-btn
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
