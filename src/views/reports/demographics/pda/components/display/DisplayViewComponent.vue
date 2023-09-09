<script>
/**
 * Descripción: Pantalla
 *
 * @displayName DisplayViewComponent
 *
 */

import httpService from '@/services/axios/httpService';
import BaseArrayHelper from '@/helpers/baseArrayHelper';

export default {
    name: 'DisplayViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    data() {
        return {
            loading: false,
            report: undefined,
        };
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Determinar Reporte
         */
        $_getObject() {
            //HttpServices a la vista para obtener Vista
            this.loading = true;
            httpService.post('analytics/pda', this.entity).then((response) => {
                this.loading = false;
                if (response != undefined) {
                    // Encontro la entidad
                    this.report = BaseArrayHelper.SetObject({}, response.data);
                }
            });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card" />
    <span v-else>Hola</span>
</template>
