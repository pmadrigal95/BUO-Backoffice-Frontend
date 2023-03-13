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

const BaseCardMenu = () => import('@/components/core/cards/BaseCardMenu');

export default {
    name: 'HomeViewComponent',

    components: {
        BaseCardViewComponent,
        BaseCardMenu,
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
                rutaURL: 'LoginViewComponent',
            });

            return originalList;
        },

        componentProps() {
            return {
                positionSubtitle: 'align-center',
                fontTypeSubtitle: 'BUO-Paragraph-Small-SemiBold Buo-Black',
                width: '320',
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
                                <BaseCardMenu
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
                                    :centerBotton="componentProps.centerBotton"
                                    :centerIcon="componentProps.centerIcon"
                                    :large="componentProps.large"
                                />
                            </div>
                        </v-layout>
                    </div>
                </div>
                <v-row v-else-if="$vuetify.breakpoint.mobile" dense>
                    <v-col cols="12" v-for="(item, i) in filterList" :key="i">
                        <BaseCardMenu
                            :icon="item.icono"
                            :to="item.rutaURL"
                            :subtitle="item.nombreUI"
                            min-width="100%"
                            :positionSubtitle="componentProps.positionSubtitle"
                            :fontTypeSubtitle="componentProps.fontTypeSubtitle"
                            :centerBotton="componentProps.centerBotton"
                            :centerIcon="componentProps.centerIcon"
                            :large="componentProps.large"
                        />
                    </v-col>
                </v-row>
            </div>
        </div>
    </BaseCardViewComponent>
</template>
