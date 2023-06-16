<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseShareableMyAbilitiesList
 */

const BaseShareableHeaderMyAbility = () =>
    import(
        '@/views/user/profile/components/internalCompontes/buoAbilities/BaseHeaderMyAbility'
    );

const BaseShareableBodyMyAbility = () =>
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
        BaseShareableHeaderMyAbility,
        BaseNotFoundContent,
        BaseShareableBodyMyAbility,
    },
};
</script>

<template>
    <section>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader v-if="!myAbilitiesList" type="list-item" />

        <v-expansion-panels flat v-else-if="myAbilitiesList.length > 0">
            <v-expansion-panel
                v-for="ability in myAbilitiesList"
                :key="ability.cualificacionId"
            >
                <v-expansion-panel-header class="buo-expansion-panel-header">
                    <BaseShareableHeaderMyAbility :ability="ability" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseShareableBodyMyAbility :ability="ability" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <BaseNotFoundContent
            msg="Actualmente el colaborador no posee indicadores en esta categoría."
            v-else
        />
    </section>
</template>
