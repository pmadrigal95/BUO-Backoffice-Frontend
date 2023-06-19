<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseBodyMyAbility
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseShareableMicroSkillStatusList = () =>
    import(
        '@/views/user/profile/components/internalCompontes/buoAbilities/BaseMicroSkillStatusList'
    );

export default {
    name: 'BaseBodyMyAbility',

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
        BaseShareableMicroSkillStatusList,
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

        totalPendingList() {
            this.ability.listaTotalPendientes.forEach((element) => {
                let result = this.$_returnOrganizationChecklist(
                    element.organizacionId
                );

                if (result) {
                    element.logo = result.logo;
                    element.nombreOrganizacion = result?.nombreOrganizacion;
                    element.nombreSupervisor = result?.nombreSupervisor;
                }
            });

            return this.ability.listaTotalPendientes;
        },

        totalValidatedList() {
            this.ability.listaTotalValidadas.forEach((element) => {
                let result = this.$_returnOrganizationChecklist(
                    element.organizacionId
                );

                if (result) {
                    element.logo = result.logo;
                    element.nombreOrganizacion = result?.nombreOrganizacion;
                    element.nombreSupervisor = result?.nombreSupervisor;
                }
            });
            return this.ability.listaTotalValidadas;
        },
    },

    methods: {
        $_returnOrganizationChecklist(id) {
            return baseSharedFnHelper.$_getObjectFromArray(
                this.ability.listaOrganizacionVerificacion,
                id
            );
        },
    },
};
</script>

<template>
    <v-card flat>
        <v-card-text
            class="BUO-Paragraph-Small buo-none-word-break"
            :class="[app ? 'white--text' : 'black--text']"
            v-if="ability.proposito"
        >
            {{ ability.proposito }}
        </v-card-text>

        <BaseShareableMicroSkillStatusList
            v-if="totalPendingList.length > 0"
            :list="totalPendingList"
            :type="inProgressCode"
        />
        <BaseShareableMicroSkillStatusList
            v-if="totalValidatedList.length > 0"
            :list="totalValidatedList"
            :type="validatedCode"
        />
    </v-card>
</template>
