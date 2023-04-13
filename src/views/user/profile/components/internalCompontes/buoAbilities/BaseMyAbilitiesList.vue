<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseMySkillsList
 */

const BaseHeaderMySkill = () =>
    import(
        '@/views/user/profile/components/internalCompontes/buoAbilities/BaseHeaderMyAbility'
    );

const BaseBodyMySkill = () =>
    import(
        '@/views/user/profile/components/internalCompontes/buoAbilities/BaseBodyMyAbility'
    );

const BaseNotFoundContent = () =>
    import('@/components/core/cards/BaseNotFoundContent');

export default {
    name: 'BaseMyAbilitiesList',

    props: {
        /**
         * Lista de Habilidades
         */
        myAbilitiesList: {
            type: Array,
            required: true,
        },
    },

    components: {
        BaseHeaderMySkill,
        BaseBodyMySkill,
        BaseNotFoundContent,
    },
};
</script>

<template>
    <div>
        <v-expansion-panels flat v-if="myAbilitiesList.length > 0">
            <v-expansion-panel
                v-for="ability in myAbilitiesList"
                :key="ability.cualificacionId"
            >
                <v-expansion-panel-header class="buo-expansion-panel-header">
                    <BaseHeaderMySkill :ability="ability" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseBodyMySkill :ability="ability" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <BaseNotFoundContent
            v-else-if="myAbilitiesList.length <= 0"
            msg="Actualmente el colaborador no posee indicadores en esta categoría."
        />
    </div>
</template>
