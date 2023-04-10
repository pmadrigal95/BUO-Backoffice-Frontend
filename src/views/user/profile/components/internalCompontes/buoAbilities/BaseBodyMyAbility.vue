<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseBodyMyAbility
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseConfigHelper from '@/helpers/baseConfigHelper';

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
        validatedCode() {
            return baseConfigHelper.$_statusCode.certificate;
        },

        inProgressCode() {
            return baseConfigHelper.$_statusCode.certifying;
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
    <v-row>
        <v-card flat>
            <v-card-text
                class="BUO-Paragraph-Medium buo-none-word-break black--text"
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
    </v-row>
</template>
