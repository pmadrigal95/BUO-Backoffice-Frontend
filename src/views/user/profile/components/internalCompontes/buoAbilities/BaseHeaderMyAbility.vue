<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseHeaderMyAbility
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper.js';

const BaseGroupAvatar = () =>
    import('@/components/core/avatars/BaseGroupAvatar');

export default {
    name: 'BaseHeaderMyAbility',

    props: {
        /**
         * Lista de Habilidades
         */
        ability: {
            type: Object,
            required: true,
        },
    },

    components: {
        BaseGroupAvatar,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        validatedCode() {
            return baseConfigHelper.$_statusCode.certificate;
        },

        inProgressCode() {
            return baseConfigHelper.$_statusCode.certifying;
        },

        notValidatedCode() {
            return baseConfigHelper.$_statusCode.uncertified;
        },
    },

    methods: {
        $_color(number) {
            return baseSharedFnHelper.$_returnColorGraph(number);
        },

        $_avatarList(organizationChecklist) {
            let array = [];
            organizationChecklist.forEach((element) => {
                let object = {
                    id: element.id,
                    src: element.logo,
                    text: element.nombreOrganizacion,
                };

                array.push(object);
            });
            return array;
        },
    },
};
</script>

<template>
    <section class="py-1">
        <v-layout justify-start v-if="ability">
            <v-list-item Two-line class="buo-headerAbility-position">
                <v-list-item-avatar size="45">
                    <v-progress-circular
                        v-if="ability.estadoId == inProgressCode"
                        size="45"
                        width="3"
                        rotate="90"
                        :value="Math.round(ability.porcentajeCertificado * 100)"
                        :color="
                            $_color(
                                Math.round(ability.porcentajeCertificado * 100)
                            )
                        "
                        ><span class="BUO-Label-XSmall"
                            >{{
                                Math.round(ability.porcentajeCertificado * 100)
                            }}%</span
                        >
                    </v-progress-circular>

                    <v-icon
                        v-if="ability.estadoId == notValidatedCode"
                        color="primary"
                        size="45"
                        >mdi-plus-circle</v-icon
                    >

                    <v-img
                        v-if="
                            ability.estadoId == validatedCode &&
                            ability.imagenCertificacion
                        "
                        :src="ability.imagenCertificacion"
                    >
                    </v-img>
                </v-list-item-avatar>
                <v-list-item-content class="ms-n3">
                    <v-list-item-title
                        ><span
                            class="BUO-Paragraph-Medium-SemiBold buo-white-space"
                            :class="[app ? 'white--text' : 'grey700--text']"
                            >{{ ability.nombreCualificacion }}</span
                        >
                    </v-list-item-title>
                    <v-list-item-subtitle
                        ><section
                            v-if="ability.estadoId === notValidatedCode"
                            class="BUO-Label-XSmall"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            Pendiente ({{ ability.totalDisponibles }})
                        </section>
                        <section
                            v-if="ability.estadoId === inProgressCode"
                            class="BUO-Label-XSmall"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            Por Aprobar ({{ ability.totalPendientes }}) /
                            Disponibles ({{ ability.totalDisponibles }})
                        </section>
                        <section
                            v-if="ability.estadoId === validatedCode"
                            class="BUO-Label-XSmall"
                            :class="[
                                app ? 'blueProgress600--text' : 'grey600--text',
                            ]"
                        >
                            {{ ability.totalValidadas }} indicadores validados
                        </section>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-layout>
        <v-card
            flat
            color="transparent"
            style="right: -8px !important"
            v-if="ability.listaOrganizacionVerificacion"
        >
            <span
                class="BUO-Label-XSmall"
                :class="[app ? 'blueProgress600--text' : 'grey600--text']"
                >Validado por:
            </span>
            <BaseGroupAvatar
                borderColor="white"
                :avatars="$_avatarList(ability.listaOrganizacionVerificacion)"
            ></BaseGroupAvatar>
        </v-card>
    </section>
</template>
