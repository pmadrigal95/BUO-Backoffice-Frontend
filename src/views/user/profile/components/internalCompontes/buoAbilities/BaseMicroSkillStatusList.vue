<script>
/**
 * Descripción: Componente Lista de mis Habilidades segun el estado
 *
 * @displayName BaseMicroSkillStatusList
 */

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseGroupAvatar = () =>
    import('@/components/core/avatars/BaseGroupAvatar');

export default {
    name: 'BaseShareableHeaderMyAbility',

    props: {

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
            validatedCode: 5,
            inProgressCode: 4,
            notValidatedCode: 3,
        };
    },

    components: {
        BaseGroupAvatar,
    },

    computed: {
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
    <div>
        <v-card color="transparent" flat max-width="100%" max-height="100%">
            <v-card-text>
                <v-row>
                    <v-col cols="12" v-for="(item, i) in listClean" :key="i">
                        <v-card
                            flat
                            max-width="100%"
                            max-height="100%"
                            color="grey200"
                            class="rounded-lg"
                            light
                        >
                            <v-card-subtitle>{{
                                type === inProgressCode
                                    ? 'En proceso'
                                    : 'Validado'
                            }}</v-card-subtitle>

                            <v-card-text
                                :class="[
                                    $vuetify.breakpoint.smAndDown
                                        ? 'BUO-Paragraph-Small black--text'
                                        : 'BUO-Paragraph-Medium black--text',
                                ]"
                                v-text="item.definicion"
                            />
                            <div>
                                <v-card-title
                                    :class="[
                                        $vuetify.breakpoint.smAndDown
                                            ? 'BUO-Label-XSmall'
                                            : 'BUO-Paragraph-Small',
                                    ]"
                                >
                                    {{
                                        type === inProgressCode
                                            ? 'En proceso por'
                                            : 'Validado por'
                                    }}
                                </v-card-title>

                                <v-card-subtitle
                                    :class="[
                                        $vuetify.breakpoint.smAndDown
                                            ? 'BUO-Label-Medium'
                                            : 'BUO-Paragraph-Medium',
                                    ]"
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
    </div>
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