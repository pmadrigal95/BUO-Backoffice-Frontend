<script>
/**
 * Descripción: Pantalla  BasePopUpCustomFormFromGrid
 *
 * @displayName BasePopUpCustomFormFromGrid
 *
 */
import { v4 as uuidv4 } from 'uuid';

// import baseLocalHelper from '@/helpers/baseLocalHelper';

// import baseNotificationsHelper from '@/helpers/baseNotificationsHelper';

export default {
    name: 'BasePopUpCustomFormFromGrid',

    props: {
        /**
         * Objecto de configuración Abarca la config del dataTable
         * Requerido
         */
        setting: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',
        };
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp] &&
                this.$refs[this.refpopUp].$_openModal();
        },
    },
};
</script>

<template>
    <BasePopUp
        :ref="refpopUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '600'"
        :isDrawer="true"
        scrollable
    >
        <div slot="Content">
            <span>Hola</span>
        </div>
    </BasePopUp>
</template>
