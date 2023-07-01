<script>
/**
 * Descripción: Pantalla Filtro Departamentos
 *
 * @displayName DepartmentFilterViewComponent
 *
 */

const ContainerViewComponent = () =>
    import('@/views/department/components/ContainerViewComponent');

export default {
    name: 'DepartmentFilterViewComponent',

    props: {
        organizacionId: {
            type: [Number, String],
        },
    },

    components: {
        ContainerViewComponent,
    },
};
</script>

<template>
    <ContainerViewComponent :organizacionId="organizacionId" />
</template>
