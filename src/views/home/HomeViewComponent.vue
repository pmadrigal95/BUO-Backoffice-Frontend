<script>
/**
 * Descripción: Pantalla Inicio
 *
 * @displayName HomeViewComponent
 */

import { mapGetters } from 'vuex';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const BaseCardMenuViewComponent = () =>
    import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'HomeViewComponent',

    components: {
        BaseCardViewComponent,
        BaseCardMenuViewComponent,
    },

    computed: {
        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        filterList() {
            let originalList = JSON.parse(JSON.stringify(this.permissionList));
            originalList = originalList.filter(
                (x) =>
                    x.acciones.filter(
                        (item) => item === baseSecurityHelper.$_read
                    ) &&
                    x.activo &&
                    x.rutaURL != null &&
                    x.nombre != 'HomeViewComponent'
            );

            originalList.push({
                nombreUI: 'Cerrar sesión',
                icono: 'login-variant',
                btnRequired: false,
                rutaURL: 'LoginViewComponent',
            });

            return originalList;
        },

        componentProps() {
            return {
                positionSubtitle: 'align-center',
                positionDescription: 'text-center',
                fontTypeSubtitle: 'BUO-Paragraph-Small-SemiBold black--text',
                fontTypeDescription: 'BUO-Paragraph-Small black--text',
                width: '320',
                heigh: '200',
                centerBotton: true,
                centerIcon: true,
                large: true,
            };
        },
    },

    methods: {
        $_chuckSize(array) {
            return baseSharedFnHelper.$_chuckSize(array, 3);
        },
    },
};
</script>

<template>
    <BaseCardViewComponent title="¡Hola!" subtitle="¿Qué quieres hacer hoy?">
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loadingSecurity" type="list-item" />
            <div v-else>
                <div v-if="$vuetify.breakpoint.mdAndUp">
                    <div
                        v-for="(array, i) in $_chuckSize(filterList)"
                        :key="i"
                        class="pb-4"
                    >
                        <v-layout justify-center>
                            <div v-for="(item, i) in array" :key="i">
                                <BaseCardMenuViewComponent
                                    :icon="item.icono"
                                    :to="item.rutaURL"
                                    :subtitle="item.nombreUI"
                                    :positionSubtitle="
                                        componentProps.positionSubtitle
                                    "
                                    :fontTypeSubtitle="
                                        componentProps.fontTypeSubtitle
                                    "
                                    :min-width="componentProps.width"
                                    :max-width="componentProps.width"
                                    :min-height="componentProps.heigh"
                                    :centerBotton="componentProps.centerBotton"
                                    :centerIcon="componentProps.centerIcon"
                                    :large="componentProps.large"
                                    :btnRequired="item?.btnRequired"
                                    :description="item.descripcion"
                                    :positionDescription="
                                        componentProps.positionDescription
                                    "
                                    :fontTypeDescription="
                                        componentProps.fontTypeDescription
                                    "
                                />
                            </div>
                        </v-layout>
                    </div>
                </div>
                <v-row v-else-if="$vuetify.breakpoint.mobile" dense>
                    <v-col cols="12" v-for="(item, i) in filterList" :key="i">
                        <BaseCardMenuViewComponent
                            :icon="item.icono"
                            :to="item.rutaURL"
                            :subtitle="item.nombreUI"
                            min-width="100%"
                            :max-width="componentProps.width"
                            :min-height="componentProps.heigh"
                            :positionSubtitle="componentProps.positionSubtitle"
                            :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                            :centerBotton="componentProps.centerBotton"
                            :centerIcon="componentProps.centerIcon"
                            :large="componentProps.large"
                            :btnRequired="item?.btnRequired"
                            :description="item.descripcion"
                            :positionDescription="
                                componentProps.positionDescription
                            "
                            :fontTypeDescription="
                                componentProps.fontTypeDescription
                            "
                        />
                    </v-col>
                </v-row>
            </div>
        </div>
    </BaseCardViewComponent>
</template>
