<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseBodyMyAbility
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

import baseLocalHelper from '@/helpers/baseLocalHelper';

const BaseShareableMicroSkillStatusList = () =>
    import(
        '@/views/user/profile/components/buoAbilities/BaseMicroSkillStatusList'
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
            return baseLocalHelper.$_statusAbility.validatedCode;
        },

        inProgressCode() {
            return baseLocalHelper.$_statusAbility.inProgressCode;
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
                :type="baseLocalHelper.$_statusAbility.inProgressCode"
            />
            <BaseShareableMicroSkillStatusList
                v-if="totalValidatedList.length > 0"
                :list="totalValidatedList"
                :type="validatedCode"
            />
        </v-card>
    </v-row>
</template>
