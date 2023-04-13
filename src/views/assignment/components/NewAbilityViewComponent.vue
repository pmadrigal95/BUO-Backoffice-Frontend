<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

const BaseCustomsButtonsGrid = () =>
    import('@/components/core/grids/BaseCustomsButtonsGrid');

export default {
    name: 'NewAbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        fn: {
            type: Function,
            requiered: true,
        },
    },

    components: {
        BaseCustomsButtonsGrid,
    },

    methods: {
        $_sendToApi() {
            console.log('hola');
        },

        $_tryOpen() {
            this.fn();
            if (this.entity && this.entity?.selected?.userList.length > 0) {
                this.$_open();
            }
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <div>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
            scrollable
        >
            <div slot="Content">hola</div>
        </BasePopUp>
        <BaseCustomsButtonsGrid
            label="Crear nueva habilidad"
            :fnMethod="$_tryOpen"
            icon="mdi-shield"
        />
    </div>
</template>
