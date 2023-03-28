<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseHeaderMyAbility
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

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

    computed: {
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
    },
};
</script>

<template>
    <v-layout justify-start v-if="ability">
        <v-list-item two-line class="buo-headerAbility-position">
            <v-list-item-avatar size="45">
                <v-progress-circular
                    v-if="ability.estadoId == inProgressCode"
                    size="45"
                    width="3"
                    :value="Math.round(ability.porcentajeCertificado * 100)"
                    :color="
                        $_color(Math.round(ability.porcentajeCertificado * 100))
                    "
                    >{{ Math.round(ability.porcentajeCertificado * 100) }}%
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
                <v-list-item-title class="BUO-Paragraph-Medium buo-white-space"
                    >{{ ability.nombreCualificacion }}
                </v-list-item-title>
                <v-list-item-subtitle
                    class="BUO-Label-XSmall"
                    v-if="ability.estadoId != validatedCode"
                    ><div v-if="ability.estadoId === notValidatedCode">
                        Pendiente ({{ ability.totalDisponibles }})
                    </div>
                    <div v-if="ability.estadoId === inProgressCode">
                        Por Aprobar ({{ ability.totalPendientes }}) /
                        Disponibles ({{ ability.totalDisponibles }})
                    </div>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-layout>
</template>
