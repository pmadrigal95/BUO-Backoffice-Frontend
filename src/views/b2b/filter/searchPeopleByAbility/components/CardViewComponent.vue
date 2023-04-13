<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName CardViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardMenuViewComponent = () =>
    import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'CardViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: { BaseCardMenuViewComponent },

    data() {
        return {
            loading: false,
            list: undefined,
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

            if (this.entity.cualificacionId) {
                array.push({
                    name: 'cualificacionId',
                    value: this.entity.cualificacionId.join('|'),
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

        permission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'ProfileViewComponent'
            );
            return result;
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
                    `talent/cards/${
                        this.entity.departamentoId
                            ? this.entity.departamentoId
                            : '0'
                    }`,
                    { extraParams: this.extraParams }
                )
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

        $_toProfile(id) {
            if (this.permission) {
                this.entity.userId = id;
                this.entity.step = 1;
            }
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
                    Encontramos el talento que estás buscando
                </div>
            </v-col>
        </v-row>
        <v-layout
            justify-center
            v-if="$vuetify.breakpoint.mdAndUp"
            class="py-5"
        >
            <div v-for="(item, i) in list" :key="i">
                <div @click="$_toProfile(item.usuarioId)">
                    <BaseCardMenuViewComponent
                        :icon="`numeric-${i + 1}-circle`"
                        :subtitle="item.nombre"
                        :description="item.nombreDepartamento"
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :min-width="componentProps.width"
                        :minHeight="componentProps.height"
                    />
                </div>
            </div>
        </v-layout>
        <v-layout
            justify-center
            v-else-if="$vuetify.breakpoint.smAndDown"
            class="py-5"
        >
            <v-slide-group>
                <v-slide-item v-for="(item, i) in list" :key="i">
                    <div @click="$_toProfile(item.usuarioId)">
                        <BaseCardMenuViewComponent
                            :icon="`numeric-${i + 1}-circle`"
                            :subtitle="item.nombre"
                            :description="item.nombreDepartamento"
                            :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                            :min-width="componentProps.width"
                            :minHeight="componentProps.height"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-layout>
        <v-divider class="my-3"></v-divider>
    </div>
</template>
