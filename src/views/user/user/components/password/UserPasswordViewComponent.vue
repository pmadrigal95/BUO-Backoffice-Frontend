<script>
/**
 * Descripción: Pantalla Cambiar password User
 *
 * @displayName UserPasswordViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import baseDataVisualizationColorsHelper from '@/helpers/baseDataVisualizationColorsHelper';

const BasePasswordInput = () =>
    import('@/components/core/forms/BasePasswordInput');

export default {
    name: 'UserPasswordViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: { BasePasswordInput },

    data() {
        return {
            loading: false,
            pwd: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),
    },

    methods: {
        initials(name) {
            const usernameSplit = name ? name.split(' ') : undefined;

            let username;

            if (usernameSplit && usernameSplit.length > 0) {
                username =
                    usernameSplit.length === 1
                        ? usernameSplit[0]
                        : `${usernameSplit[0].charAt(
                              0
                          )}${usernameSplit[1].charAt(0)}`;
            }

            return username;
        },

        color() {
            return baseDataVisualizationColorsHelper.$_randomColor().main;
        },

        $_setRequest() {
            return {
                newPassword: this.pwd,
                usuarioId: this.entity.userId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('user/changePasswordAdmin', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$_cancel();
                    }
                });
        },

        $_cancel() {
            this.$_open();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
        :isDrawer="
            this.$router.currentRoute.name !== 'CompanyDashboardViewComponent'
        "
    >
        <div slot="Content">
            <BaseSkeletonLoader v-if="loading" type="article" />
            <BaseForm
                :method="$_sendToApi"
                :cancel="$_cancel"
                v-else
                :block="$vuetify.breakpoint.mobile"
            >
                <div slot="body">
                    <section>
                        <section
                            class="text-left BUO-Heading-Small"
                            :class="[
                                app ? 'blueProgress600--text' : 'blue900--text',
                            ]"
                        >
                            Detalles del colaborador
                        </section>
                        <v-card flat class="rounded-lg mb-5">
                            <v-card-text class="text-left">
                                <v-list two-line>
                                    <v-list-item>
                                        <v-list-item-avatar
                                            :color="color()"
                                            size="60"
                                        >
                                            <span
                                                class="white--text BUO-Paragraph-Medium-SemiBold"
                                                >{{
                                                    initials(entity.name)
                                                }}</span
                                            >
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="BUO-Paragraph-Medium-SemiBold"
                                                >{{
                                                    entity.name
                                                }}</v-list-item-title
                                            >

                                            <v-list-item-subtitle
                                                class="BUO-Label-Small"
                                                v-if="entity.organization"
                                                ><span class="grey700--text"
                                                    >Organización:</span
                                                >
                                                {{
                                                    entity.organization
                                                }}</v-list-item-subtitle
                                            >

                                            <v-list-item-subtitle
                                                class="BUO-Label-Small"
                                                v-if="entity.deparment"
                                                ><span class="grey700--text"
                                                    >Departamento:</span
                                                >
                                                {{
                                                    entity.deparment
                                                }}</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </section>

                    <section>
                        <section
                            class="text-left BUO-Heading-Small mb-4"
                            :class="[
                                app ? 'blueProgress600--text' : 'blue900--text',
                            ]"
                        >
                            Cambio de contraseña
                        </section>

                        <v-card outlined flat class="rounded-lg mb-10">
                            <v-card-text class="text-left">
                                <BasePasswordInput
                                    v-model.trim="pwd"
                                    title="Nueva contraseña"
                                />
                            </v-card-text>
                        </v-card>
                    </section>
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
