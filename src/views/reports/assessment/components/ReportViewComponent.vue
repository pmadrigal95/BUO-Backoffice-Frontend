<script>
/**
 * Descripción: Pantalla ReportViewComponent
 *
 * @displayName ReportViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

export default {
    name: 'ReportViewComponent',

    data() {
        return {
            data: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        ...mapGetters('authentication', ['user', 'buoId']),
    },

    created() {
        httpService
            .post('pruebaResultado/html', { id: 'aaaa' })
            .then((response) => {
                if (response != undefined) {
                    this.data = response.data;
                }
            });
    },
};
</script>

<template>
    <section v-if="data">
        <section v-html="data.encabezado" />
        <section v-html="data.detalle" />
    </section>
</template>
