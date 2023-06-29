<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName CardViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

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
        ...mapGetters('theme', ['app']),

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.organizacionId,
                qualificationId:
                    this.entity.cualificacionId &&
                    this.entity.cualificacionId.join('|'),
            });
        },

        componentProps() {
            return {
                fontTypeSubtitle: `BUO-Paragraph-Medium-SemiBold ${
                    this.app ? 'white--text' : ' black--text'
                }`,
                fontTypeDescription: `${
                    this.app ? 'blueProgress600--text' : ' grey600--text'
                }`,
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
    <section v-else-if="list && list.length > 0">
        <v-row justify="start" class="pl-3">
            <v-col cols="12" md="8">
                <section
                    class="BUO-Heading-Small"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    Encontramos el talento que estás buscando
                </section>
            </v-col>
        </v-row>
        <v-layout
            justify-center
            v-if="$vuetify.breakpoint.mdAndUp"
            class="py-5"
        >
            <section v-for="(item, i) in list" :key="i">
                <section @click="$_toProfile(item.usuarioId)">
                    <BaseCardMenuViewComponent
                        :icon="`numeric-${i + 1}-circle`"
                        :subtitle="item.nombre"
                        :description="item.nombreDepartamento"
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :fontTypeDescription="
                            componentProps.fontTypeDescription
                        "
                        :min-width="componentProps.width"
                        :minHeight="componentProps.height"
                    />
                </section>
            </section>
        </v-layout>
        <v-layout
            justify-center
            v-else-if="$vuetify.breakpoint.smAndDown"
            class="py-5"
        >
            <v-slide-group>
                <v-slide-item v-for="(item, i) in list" :key="i">
                    <section @click="$_toProfile(item.usuarioId)">
                        <BaseCardMenuViewComponent
                            :icon="`numeric-${i + 1}-circle`"
                            :subtitle="item.nombre"
                            :description="item.nombreDepartamento"
                            :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                            :fontTypeDescription="
                                componentProps.fontTypeDescription
                            "
                            :min-width="componentProps.width"
                            :minHeight="componentProps.height"
                        />
                    </section>
                </v-slide-item>
            </v-slide-group>
        </v-layout>
        <v-divider class="my-3"></v-divider>
    </section>
</template>
