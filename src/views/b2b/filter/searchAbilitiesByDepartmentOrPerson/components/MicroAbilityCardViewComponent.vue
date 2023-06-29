<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName MicroAbilityCardViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import { baseFilterSettingsHelper } from '@/helpers/baseFilterSettingsHelper';

const BaseCardMenuViewComponent = () =>
    import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'MicroAbilityCardViewComponent',

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
                userId:
                    this.entity.usuarioId && this.entity.usuarioId.join('|'),
                qualificationId: this.entity.cualificacionId,
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
                    `abilityDetails/cards/${
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
        <v-layout
            justify-center
            v-if="$vuetify.breakpoint.mdAndUp"
            class="py-5"
        >
            <div v-for="(item, i) in list" :key="i">
                <section>
                    <BaseCardMenuViewComponent
                        icon="shield"
                        :iconColor="`${
                            item.descripcion.includes('menos')
                                ? 'redError900'
                                : 'greenC800'
                        }`"
                        large
                        :subtitle="item.definicion"
                        :description="item.descripcion"
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :fontTypeDescription="
                            componentProps.fontTypeDescription
                        "
                        :min-width="componentProps.width"
                        :minHeight="componentProps.height"
                    />
                </section>
            </div>
        </v-layout>
        <v-layout
            justify-center
            v-else-if="$vuetify.breakpoint.smAndDown"
            class="py-5"
        >
            <v-slide-group>
                <v-slide-item v-for="(item, i) in list" :key="i">
                    <section>
                        <BaseCardMenuViewComponent
                            icon="shield"
                            :iconColor="`${
                                item.descripcion.includes('menos')
                                    ? 'redError900'
                                    : 'greenC800'
                            }`"
                            large
                            :subtitle="item.definicion"
                            :description="item.descripcion"
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
    </div>
</template>
