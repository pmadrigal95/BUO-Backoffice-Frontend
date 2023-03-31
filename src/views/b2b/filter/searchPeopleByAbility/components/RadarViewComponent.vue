<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName RadarViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'RadarViewComponent',

    props: {
        usuarioIdList: {
            type: Array,
            requiered: true,
        },
    },

    data() {
        return {
            loading: false,
            list: undefined,
        };
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService
                .post('pda/getTestList', { usuarioIdList: this.usuarioIdList })
                .then((response) => {
                    this.loading = false;
                    if (response != undefined && response.data.length > 0) {
                        // Encontro la entidad
                        this.list = BaseArrayHelper.SetObject(
                            [],
                            response.data
                        );
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="list-item" />
    <div v-else-if="list && list.length > 0">
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <div class="BUO-Heading-Small blue900--text">
                    Comparación de habilidades PDA
                </div>
            </v-col>
        </v-row>
        {{ list }}
    </div>
</template>
