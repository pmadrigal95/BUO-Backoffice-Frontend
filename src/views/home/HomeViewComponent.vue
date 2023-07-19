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

        ...mapGetters('theme', ['app']),

        categoriesMenu() {
            return [
                {
                    name: 'People Analytics',
                    list: [
                        'SearchPeopleByAbilityViewComponent',
                        'SearchAbilitiesByDepartmentOrPersonViewComponent',
                        'ProfileViewComponent',
                        'AssignmentViewComponent',
                        'ApprovalViewComponent',
                    ],
                },
                {
                    name: 'BUO Assessments',
                    list: [
                        'BUOPDAReportViewComponent',
                        'AssessmentControlViewComponent',
                    ],
                },
                {
                    name: 'Administración',
                    list: [
                        'CompanyViewComponent',
                        'UserViewComponent',
                        'DepartmentViewComponent',
                        'CategoryViewComponent',
                        'AbilityViewComponent',
                        'MicroAbilityViewComponent',
                        'AssessmentTypeViewComponent',
                        'AssessmentViewComponent',
                        'PromotionalCodesViewComponent',
                    ],
                },
            ];
        },

        menuList() {
            let result = [
                {
                    name: 'People Analytics',
                    list: [],
                },
                {
                    name: 'BUO Assessments',
                    list: [],
                },
                {
                    name: 'Administración',
                    list: [],
                },
            ];

            this.categoriesMenu.forEach((x) => {
                const index = result
                    .map(function (e) {
                        return e.name;
                    })
                    .indexOf(x.name);

                x.list.forEach((view) => {
                    const insert = baseSecurityHelper.$_getObjectById(view);
                    insert && result[index].list.push(insert);
                });
            });

            return result;
        },

        componentProps() {
            return {
                positionSubtitle: 'align-center',
                positionDescription: 'text-center',
                fontTypeSubtitle: this.app
                    ? 'BUO-Paragraph-Small-SemiBold white--text'
                    : 'BUO-Paragraph-Small-SemiBold black--text',
                fontTypeDescription: this.app
                    ? 'BUO-Paragraph-Small-SemiBold blueProgress600--text'
                    : 'BUO-Paragraph-Small-SemiBold black--text',
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
    <BaseCardViewComponent>
        <div slot="card-text">
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
                <div v-if="$vuetify.breakpoint.mdAndUp">
                    <div v-for="(menu, i) in menuList" :key="i">
                        <v-card
                            flat
                            color="transparent"
                            v-if="menu.list.length > 0"
                        >
                            <v-card-title
                                class="BUO-Heading-Small"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                {{ menu.name }}
                            </v-card-title>

                            <v-card-text>
                                <div
                                    v-for="(array, i) in $_chuckSize(menu.list)"
                                    :key="i"
                                    class="pb-4"
                                >
                                    <v-layout justify-start>
                                        <div
                                            v-for="(item, i) in array"
                                            :key="i"
                                        >
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
                                                :min-width="
                                                    componentProps.width
                                                "
                                                :max-width="
                                                    componentProps.width
                                                "
                                                :min-height="
                                                    componentProps.heigh
                                                "
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
                                    </v-layout>
                                </div>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
                <div v-else-if="$vuetify.breakpoint.mobile">
                    <div v-for="(menu, i) in menuList" :key="i">
                        <v-card
                            flat
                            color="transparent"
                            v-if="menu.list.length > 0"
                        >
                            <v-card-title
                                class="BUO-Heading-Small"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'blue900--text',
                                ]"
                            >
                                {{ menu.name }}
                            </v-card-title>

                            <v-card-text>
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
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
