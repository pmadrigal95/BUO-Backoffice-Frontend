<script>
/**
 * Descripción: Componente Lista Expandible
 *
 * @displayName BaseMyAbilitiesList
 */

const BaseHeaderView = () =>
    import(
        '@/views/assessment/components/review/shared/template/BaseHeaderView'
    );

const BaseBodyView = () =>
    import('@/views/assessment/components/review/shared/template/BaseBodyView');

export default {
    name: 'BaseMyAbilitiesList',

    props: {
        /**
         * Lista de Habilidades
         */
        list: {
            type: Array,
            required: true,
        },
    },

    components: {
        BaseHeaderView,
        BaseBodyView,
    },
};
</script>

<template>
    <div>
        <!-- @ Use Loanding... -->
        <BaseSkeletonLoader v-if="!list" type="list-item" />

        <v-expansion-panels flat multiple v-else-if="list.length > 0">
            <v-expansion-panel v-for="question in list" :key="question.id">
                <v-expansion-panel-header class="buo-expansion-panel-header">
                    <BaseHeaderView :question="question" />
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                    <BaseBodyView :question="question" />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
