<script>
/**
 * Descripción: Pantalla Eliminar
 *
 * @displayName DeleteItemViewComponent
 *
 */

export default {
    name: 'DeleteItemViewComponent',

    props: {
        label: {
            type: String,
            default: 'Colaborador',
        },

        callback: {
            type: Function,
            required: true,
        },
    },

    data() {
        return {
            key: undefined,
        };
    },

    methods: {
        $_delete() {
            this.callback(this.key);
            this.key = undefined;
            this.$_open();
        },

        $_open(id) {
            this.key = id;
            this.$refs.popUpDelete.$_openModal();
        },
    },
};
</script>

<template>
    <!-- @Componente:  BaseDialog-->
    <BaseActionPopUp
        ref="popUpDelete"
        action="delete"
        :item="label"
        inset
        :fn="$_delete"
    />
</template>
