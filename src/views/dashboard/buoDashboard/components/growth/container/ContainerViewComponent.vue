<script>
/**
 * Descripción: Pantalla  ContainerViewComponent
 *
 * @displayName ContainerViewComponent
 *
 */

// import httpService from '@/services/axios/httpService';

// import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'ContainerViewComponent',

    props: {
        filter: {
            type: Object,
            required: true,
        },

        innerWidth: {
            type: [Number, String],
            required: true,
        },
    },

    components: {},

    data: () => ({
        loading: false,
        entity: {},
    }),

    computed: {
        hasData() {
            for (const [, value] of Object.entries(this.entity)) {
                if (value) {
                    return true;
                }
            }
            return false;
        },
    },

    created() {
        this.$_getToAPi();
    },

    methods: {
        $_getToAPi() {
            // this.loading = true;
            // httpService
            //     .post('dashboard/rotacion/detalles', this.filter)
            //     .then((response) => {
            //         this.loading = false;
            //         if (response != undefined) {
            //             //Logica JS luego de la acción exitosa!!!
            //             this.entity = BaseArrayHelper.SetObject(
            //                 {},
            //                 response.data
            //             );
            //         }
            //     });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <section v-else>
        <section v-if="hasData">
            <span>Hola</span>
        </section>
        <BaseNotFoundContent
            v-else
            class="py-16 mt-4"
            msg="Lamentablemente, no se han encontrado datos al aplicar el filtro seleccionado."
        />
    </section>
</template>
