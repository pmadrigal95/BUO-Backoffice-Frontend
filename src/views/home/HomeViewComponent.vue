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

const NotifierViewComponent = () =>
    import('@/views/home/components/NotifierViewComponent');

const BaseCardMenuViewComponent = () =>
    import('@/components/core/cards/BaseCardMenuViewComponent');

export default {
    name: 'HomeViewComponent',

    components: {
        BaseCardViewComponent,
        NotifierViewComponent,
        BaseCardMenuViewComponent,
    },

    data() {
        return {
            panel: [0, 1, 2, 3],
        };
    },

    computed: {
        ...mapGetters('security', ['permissionList', 'loadingSecurity']),

        ...mapGetters('theme', ['app']),

        ...mapGetters('shortcut', ['notifier']),

        menuList() {
            return baseSecurityHelper.$_setMenu();
        },

        componentProps() {
            return {
                positionSubtitle: 'align-center',
                positionDescription: 'text-center',
                fontTypeSubtitle: this.app
                    ? 'BUO-Paragraph-Medium-SemiBold white--text'
                    : this.$vuetify.breakpoint.mobile
                    ? 'BUO-Paragraph-Small-SemiBold black--text'
                    : 'BUO-Paragraph-Medium-SemiBold black--text',
                fontTypeDescription: this.app
                    ? 'BUO-Paragraph-Small blueProgress600--text'
                    : 'BUO-Paragraph-Small grey600--text',
                width: '325',
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
    <BaseCardViewComponent>
        <div slot="card-text">
            <NotifierViewComponent v-if="!notifier" />
            <BaseSkeletonLoader v-if="loadingSecurity" type="list-item" />
            <v-card flat color="transparent" v-else>
                <v-layout justify-end
                    ><v-btn
                        class="ma-1 no-uppercase rounded-lg BUO-Paragraph-Medium-SemiBold"
                        :class="[app ? 'grey700' : 'Buo-White-Background']"
                        elevation="0"
                        depressed
                        outlined
                        :color="app ? 'white' : 'primary'"
                        :to="{ name: 'LoginViewComponent' }"
                    >
                        <span class="BUO-Paragraph-Small-SemiBold">
                            Cerrar sesión
                        </span>
                        <v-icon small right dark> mdi-login-variant </v-icon>
                    </v-btn></v-layout
                >
                <v-card-title
                    class="BUO-Heading-Large"
                    :class="[app ? 'blueProgress600--text' : 'blue900--text']"
                >
                    ¡Hola!
                </v-card-title>
                <v-card-subtitle
                    class="BUO-Paragraph-Large"
                    :class="[app ? 'white--text' : 'black--text']"
                    >¿Qué quieres hacer hoy?</v-card-subtitle
                >
                <v-expansion-panels multiple flat v-model="panel">
                    <v-expansion-panel v-for="(menu, i) in menuList" :key="i">
                        <v-expansion-panel-header
                            v-if="menu.list.length > 0"
                            :color="app ? 'background' : 'clouds'"
                            ><section
                                class="BUO-Heading-Small"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                {{ menu.name }}
                            </section></v-expansion-panel-header
                        >
                        <v-expansion-panel-content
                            :color="app ? 'background' : 'clouds'"
                            v-if="$vuetify.breakpoint.mdAndUp"
                        >
                            <section
                                v-for="(array, i) in $_chuckSize(menu.list)"
                                :key="i"
                                class="pb-4"
                            >
                                <v-row justify="start">
                                    <div v-for="(item, i) in array" :key="i">
                                        <BaseCardMenuViewComponent
                                            class="ma-4"
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
                                            :centerBotton="
                                                componentProps.centerBotton
                                            "
                                            :centerIcon="
                                                componentProps.centerIcon
                                            "
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
                                </v-row>
                            </section>
                        </v-expansion-panel-content>
                        <v-expansion-panel-content
                            :color="app ? 'background' : 'clouds'"
                            v-else
                        >
                            <v-row dense>
                                <v-col
                                    cols="12"
                                    v-for="(item, i) in menu.list"
                                    :key="i"
                                >
                                    <BaseCardMenuViewComponent
                                        :icon="item.icono"
                                        :to="item.rutaURL"
                                        :subtitle="item.nombreUI"
                                        min-width="100%"
                                        :max-width="componentProps.width"
                                        :min-height="componentProps.heigh"
                                        :positionSubtitle="
                                            componentProps.positionSubtitle
                                        "
                                        :fontTypeSubtitle="
                                            componentProps.fontTypeSubtitle
                                        "
                                        :centerBotton="
                                            componentProps.centerBotton
                                        "
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
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
