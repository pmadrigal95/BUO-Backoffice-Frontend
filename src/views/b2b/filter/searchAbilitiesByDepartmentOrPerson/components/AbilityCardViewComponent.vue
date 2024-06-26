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
            objectForm: undefined,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        extraParams() {
            return baseFilterSettingsHelper.$_setExtraParams({
                companyId: this.entity.companyId,
                userId: this.entity.userId && this.entity.userId.join('|'),
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
                width: '250',
                height: '150',
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
                        this.entity.departmentId
                            ? this.entity.departmentId
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
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="list-item" />
    <div v-else-if="objectForm">
        <div
            v-if="objectForm.topAbilities && objectForm.topAbilities.length > 0"
        >
            <v-row justify="start" class="pl-3">
                <v-col cols="12" md="8">
                    <section
                        class="BUO-Heading-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Las
                        <span class="greenC800--text">más</span> desarrolladas
                    </section>
                </v-col>
            </v-row>
            <v-layout
                justify-center
                v-if="$vuetify.breakpoint.mdAndUp"
                class="py-5"
            >
                <div v-for="(item, i) in objectForm.topAbilities" :key="i">
                    <BaseCardMenuViewComponent
                        iconColor="greenC800"
                        :icon="`numeric-${i + 1}-circle`"
                        :subtitle="item.definicionCualificacion"
                        :description="item.descripcion"
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :fontTypeDescription="
                            componentProps.fontTypeDescription
                        "
                        :min-width="componentProps.width"
                        :minHeight="componentProps.height"
                        :max-width="componentProps.width"
                        :maxHeight="componentProps.height"
                    />
                </div>
            </v-layout>
            <v-layout
                justify-center
                v-else-if="$vuetify.breakpoint.smAndDown"
                class="py-5"
            >
                <v-slide-group>
                    <v-slide-item
                        v-for="(item, i) in objectForm.topAbilities"
                        :key="i"
                    >
                        <div>
                            <BaseCardMenuViewComponent
                                iconColor="greenC800"
                                :icon="`numeric-${i + 1}-circle`"
                                :subtitle="item.definicionCualificacion"
                                :description="item.descripcion"
                                :fontTypeSubtitle="
                                    componentProps.fontTypeSubtitle
                                "
                                :fontTypeDescription="
                                    componentProps.fontTypeDescription
                                "
                                :min-width="componentProps.width"
                                :minHeight="componentProps.height"
                                :max-width="componentProps.width"
                                :maxHeight="componentProps.height"
                            />
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-layout>
        </div>
        <div
            v-if="
                objectForm.bottomAbilities &&
                objectForm.bottomAbilities.length > 0
            "
        >
            <v-row justify="start" class="pl-3">
                <v-col cols="12" md="8">
                    <section
                        class="BUO-Heading-Small"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Las
                        <span class="redError900--text">menos</span>
                        desarrolladas
                    </section>
                </v-col>
            </v-row>
            <v-layout
                justify-center
                v-if="$vuetify.breakpoint.mdAndUp"
                class="py-5"
            >
                <section
                    v-for="(item, i) in objectForm.bottomAbilities"
                    :key="i"
                >
                    <BaseCardMenuViewComponent
                        iconColor="redError900"
                        :icon="`numeric-${i + 1}-circle`"
                        :subtitle="item.definicionCualificacion"
                        :description="item.descripcion"
                        :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                        :fontTypeDescription="
                            componentProps.fontTypeDescription
                        "
                        :min-width="componentProps.width"
                        :minHeight="componentProps.height"
                        :max-width="componentProps.width"
                        :maxHeight="componentProps.height"
                    />
                </section>
            </v-layout>
            <v-layout
                justify-center
                v-else-if="$vuetify.breakpoint.smAndDown"
                class="py-5"
            >
                <v-slide-group>
                    <v-slide-item
                        v-for="(item, i) in objectForm.bottomAbilities"
                        :key="i"
                    >
                        <section>
                            <BaseCardMenuViewComponent
                                iconColor="redError900"
                                :icon="`numeric-${i + 1}-circle`"
                                :subtitle="item.definicionCualificacion"
                                :description="item.descripcion"
                                :fontTypeSubtitle="
                                    componentProps.fontTypeSubtitle
                                "
                                :fontTypeDescription="
                                    componentProps.fontTypeDescription
                                "
                                :min-width="componentProps.width"
                                :minHeight="componentProps.height"
                                :max-width="componentProps.width"
                                :maxHeight="componentProps.height"
                            />
                        </section>
                    </v-slide-item>
                </v-slide-group>
            </v-layout>
        </div>
        <v-divider class="my-3"></v-divider>
    </div>
</template>
