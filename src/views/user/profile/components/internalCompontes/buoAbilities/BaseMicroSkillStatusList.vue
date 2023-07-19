<script>
/**
 * Descripción: Componente Lista de mis Habilidades segun el estado
 *
 * @displayName BaseMicroSkillStatusList
 */

import { mapGetters } from 'vuex';

import baseConfigHelper from '@/helpers/baseConfigHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseGroupAvatar = () =>
    import('@/components/core/avatars/BaseGroupAvatar');

export default {
    name: 'BaseMicroSkillStatusList',

    props: {
        /**
         * Habilidad
         */
        list: {
            type: Array,
            required: true,
        },

        type: {
            type: Number,
            default: 4,
        },
    },

    data() {
        return {
            key: null,
        };
    },

    components: {
        BaseGroupAvatar,
    },

    computed: {
        ...mapGetters('theme', ['app']),

        inProgressCode() {
            return baseConfigHelper.$_statusCode.certifying;
        },

        listClean() {
            return baseSharedFnHelper.$_removeDuplicates(
                this.list,
                'competenciaId'
            );
        },
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal(competenciaId) {
            this.key = competenciaId;
            this.$refs['popUp'].$_openModal();
        },

        groupBycompetitionId(competenciaId) {
            const array = this.list.filter(
                (element) => element['competenciaId'] == competenciaId
            );
            return array;
        },

        $_avatarList(competenciaId) {
            let array = [];
            this.groupBycompetitionId(competenciaId).forEach((element) => {
                let object = {
                    id: element.organizacionId,
                    src: element.logo,
                    text: element.nombreOrganizacion,
                };

                array.push(object);
            });

            return array;
        },
    },
};
</script>

<template>
    <section>
        <BasePopUp
            ref="popUp"
            :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '45%'"
            :isDrawer="false"
            scrollable
        >
            <div slot="Content">
                <v-card
                    color="transparent"
                    flat
                    max-width="100%"
                    max-height="100%"
                >
                    <v-card-title
                        class="BUO-Heading-XSmall"
                        :class="[app ? 'white--text' : 'grey700--text']"
                    >
                        Detalles de validación
                    </v-card-title>

                    <v-card-text
                        v-for="(item, i) in groupBycompetitionId(key)"
                        :key="i"
                    >
                        <v-card flat max-width="100%" max-height="100%">
                            <v-card-title
                                class="BUO-Label-XSmall-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                Empresa
                            </v-card-title>
                            <section>
                                <v-layout justify-space-between align-center>
                                    <v-card-subtitle
                                        class="BUO-Paragrap-Medium"
                                        :class="[
                                            app
                                                ? 'white--text'
                                                : 'grey700--text',
                                        ]"
                                    >
                                        {{ item.nombreOrganizacion }}
                                    </v-card-subtitle>

                                    <div
                                        class="__avatar"
                                        :style="[{ border: '2px solid white' }]"
                                    >
                                        <v-img
                                            max-height="100%"
                                            max-width="100%"
                                            contain
                                            :src="item.logo"
                                            alt=""
                                            v-if="item.logo != null"
                                        />

                                        <v-avatar tile color="primary" v-else>
                                            <span class="white--text">{{
                                                item.nombreOrganizacion.charAt(
                                                    0
                                                )
                                            }}</span>
                                        </v-avatar>
                                    </div>
                                </v-layout>
                            </section>

                            <v-divider></v-divider>

                            <v-card-title
                                class="BUO-Label-XSmall-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                {{
                                    type === inProgressCode
                                        ? 'Fecha'
                                        : 'Fecha de validación'
                                }}
                            </v-card-title>
                            <v-card-subtitle
                                class="BUO-Paragrap-Medium"
                                :class="[app ? 'white--text' : 'grey700--text']"
                            >
                                {{ item.fechaEstadoFormato }}
                            </v-card-subtitle>
                        </v-card>
                    </v-card-text>
                </v-card>
            </div>
        </BasePopUp>

        <v-card color="transparent" flat max-width="100%" max-height="100%">
            <v-card-text>
                <v-row>
                    <v-col cols="12" v-for="(item, i) in listClean" :key="i">
                        <v-card
                            flat
                            max-width="100%"
                            max-height="100%"
                            :color="app ? 'grey700' : 'grey200'"
                            class="rounded-lg"
                            light
                        >
                            <v-card-title>
                                <v-layout justify-start align-start>
                                    <v-img
                                        style="
                                            top: -21px;
                                            position: relative !important;
                                        "
                                        contain
                                        :max-width="
                                            $vuetify.breakpoint.mobile
                                                ? '30%'
                                                : '8%'
                                        "
                                        :src="`https://buo-resources.s3.us-east-2.amazonaws.com/wallet/${
                                            type === inProgressCode
                                                ? 'progress'
                                                : 'validated'
                                        }.svg`"
                                    />
                                </v-layout>
                                <v-layout justify-end>
                                    <v-btn
                                        icon
                                        :color="
                                            app ? 'blueProgress600' : 'black'
                                        "
                                        @click="$_openModal(item.competenciaId)"
                                    >
                                        <v-icon> mdi-dots-vertical </v-icon>
                                    </v-btn>
                                </v-layout>
                            </v-card-title>

                            <v-card-subtitle
                                class="BUO-Label-XSmall"
                                :class="[
                                    app
                                        ? 'blueProgress600--text'
                                        : 'grey500--text',
                                ]"
                                >{{
                                    type === inProgressCode
                                        ? 'En proceso'
                                        : 'Validado'
                                }}</v-card-subtitle
                            >

                            <v-card-text
                                class="BUO-Paragraph-Small-SemiBold"
                                :class="[app ? 'white--text' : 'grey700--text']"
                                >{{ item.definicion }}</v-card-text
                            >
                            <div>
                                <v-card-title
                                    class="BUO-Label-XSmall-SemiBold"
                                    :class="[
                                        app ? 'white--text' : 'grey700--text',
                                    ]"
                                >
                                    {{
                                        type === inProgressCode
                                            ? 'En proceso por'
                                            : 'Validado por'
                                    }}
                                </v-card-title>

                                <v-card-subtitle
                                    class="BUO-Paragrap-Medium"
                                    :class="[
                                        app ? 'white--text' : 'grey700--text',
                                    ]"
                                    v-if="item.competenciaId"
                                    ><v-layout
                                        justify-space-between
                                        align-center
                                    >
                                        {{
                                            $_avatarList(item.competenciaId)
                                                .length + ' Empresas'
                                        }}

                                        <BaseGroupAvatar
                                            borderColor="white"
                                            :avatars="
                                                $_avatarList(item.competenciaId)
                                            "
                                        ></BaseGroupAvatar>
                                    </v-layout>
                                </v-card-subtitle>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </section>
</template>

<style lang="less" scoped>
.__avatar {
    width: 30px;
    height: 30px;
    border-radius: 40px;
    overflow: hidden;
    border: 2px solid white;
    transition: all 0.25s ease;
    z-index: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .__panel_show_more {
        cursor: pointer;
        position: absolute;
        background-color: rgba(10, 12, 18, 0.5);
        width: 100%;
        height: 100%;
        z-index: 3;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
    }
    &:hover {
        -webkit-transform: translate(-3px);
        transform: translate(-3px);
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
</style>
