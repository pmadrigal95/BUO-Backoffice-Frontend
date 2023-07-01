<script>
/**
 * Descripción: Pantalla Filtro Usuarios
 *
 * @displayName UserFilterViewComponent
 *
 */
const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const FilterViewComponent = () =>
    import('@/views/ability/components/filter/FilterViewComponent.vue');

export default {
    name: 'ContainerViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        FilterViewComponent,
        BaseCardViewComponent,
    },
};
</script>

<template>
    <FilterViewComponent
        :organizacionId="organizacionId"
        v-if="organizacionId"
    />
    <BaseCardViewComponent title="Indicadores" v-else>
        <div slot="card-text">
            <FilterViewComponent />
        </div>
    </BaseCardViewComponent>
</template>
