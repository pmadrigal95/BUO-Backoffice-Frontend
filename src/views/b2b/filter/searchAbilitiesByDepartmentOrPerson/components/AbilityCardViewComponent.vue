<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName CardViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

// const BaseCardMenuViewComponent = () =>
//     import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'CardViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    //components: { BaseCardMenuViewComponent },

    data() {
        return {
            loading: false,
            objectForm: undefined,
        };
    },

    computed: {
        extraParams() {
            let array = [];
            if (this.entity.organizacionId) {
                array.push({
                    name: 'organizacionId',
                    value: this.entity.organizacionId,
                });
            }

            if (this.entity.usuarioId) {
                array.push({
                    name: 'usuarioId',
                    value: this.entity.usuarioId.join('|'),
                });
            }

            return array.length > 0 ? array : undefined;
        },

        componentProps() {
            return {
                fontTypeSubtitle: 'BUO-Paragraph-Medium-SemiBold black--text',
                width: '228',
                height: '120',
            };
        },
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
                .post(
                    `ability/cards/${
                        this.entity.departamentoId
                            ? this.entity.departamentoId
                            : '0'
                    }`,
                    { extraParams: this.extraParams }
                )
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.objectForm = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
        },

        $_toProfile(id) {
            if (this.permission) {
                this.$router.push({
                    name: 'ProfileDetailsViewComponent',
                    params: { Id: id },
                });
            }
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="list-item" />
    <div v-else-if="objectForm">
        {{ objectForm }}
    </div>
</template>
