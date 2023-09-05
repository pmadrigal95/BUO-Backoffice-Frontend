<script>
/**
 * Descripción: Pantalla SupervisorsViewComponent
 *
 * @displayName SupervisorsViewComponent
 *
 */

const UserListDisplayViewComponent = () =>
    import(
        '@/views/setIndicator/shared/components/resume/shared/UserListDisplayViewComponent'
    );

export default {
    name: 'SupervisorsViewComponent',

    props: {
        list: {
            type: Array,
            requiered: true,
        },

        callback: {
            type: Function,
            requiered: true,
        },
    },

    components: {
        UserListDisplayViewComponent,
    },
};
</script>

<template>
    <UserListDisplayViewComponent
        :list="list"
        :callback="callback"
        v-if="list && list.length > 0"
        label="Evaluador"
    />
</template>
