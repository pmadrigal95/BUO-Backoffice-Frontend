<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName AbilityEditorViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSecurityHelper from '@/helpers/baseSecurityHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const AddAbilityViewComponent = () =>
    import('@/views/ability/components/AddAbilityViewComponent');

const UpdateAbilityViewComponent = () =>
    import('@/views/ability/components/UpdateAbilityViewComponent');

const MicroAbilityFilterViewComponent = () =>
    import('@/views/microAbility/MicroAbilityFilterViewComponent');

export default {
    name: 'AbilityEditorViewComponent',

    components: {
        AddAbilityViewComponent,
        BaseCardViewComponent,
        UpdateAbilityViewComponent,
        MicroAbilityFilterViewComponent,
    },

    data() {
        return {
            tab: null,
            entity: this.$_Object(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        microabilityPermission() {
            const result = baseSecurityHelper.$_ReadPermission(
                'MicroAbilityViewComponent'
            );
            return result;
        },
    },

    mounted() {
        /**
         * Determinar si Es nuevo / editor
         */
        this.$_getObject();

        //TODO: How to implement on vue router the background config
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.white;
    },

    destroyed() {
        this.$vuetify.theme.themes.light.background =
            this.$vuetify.theme.themes.light.clouds;
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: 0,
                definicion: undefined,
                otroNombre: undefined,
                proposito: undefined,
                ambitoOcupacional: undefined,
                link: undefined,
                esInterna: undefined,
                categoriaId: undefined,
                estadoId: 2,
                organizacionId: undefined,
                tipoCualificacionId: undefined,
                usuarioModificaId: undefined,
            };
        },

        /**
         * Determinar si Es nuevo / editor
         */
        $_getObject() {
            let data = this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`cualificacion/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                    }
                });
            }
        },

        /**
         * Function to return the AbilityFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
        },
    },
};
</script>

<template>
    <section v-if="$router.currentRoute.params.Id">
        <v-tabs
            v-model="tab"
            right
            show-arrows
            height="25"
            class="pa-3 background"
            :color="app ? 'white' : 'primary'"
        >
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab class="rounded-pill no-uppercase"> Indicador </v-tab>
            <v-tab
                class="rounded-pill no-uppercase"
                v-if="microabilityPermission"
            >
                Micro-Indicadores
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5 background">
            <v-tab-item>
                <BaseCardViewComponent
                    title="Indicador"
                    :btnAction="$_returnToFilter"
                    class="mx-auto"
                    md="6"
                    offset="3"
                >
                    <div slot="card-text">
                        <BaseSkeletonLoader
                            v-if="loading"
                            type="article, actions"
                        />
                        <div v-else>
                            <UpdateAbilityViewComponent
                                :entity="entity"
                                :$_returnToFilter="$_returnToFilter"
                            />
                        </div>
                    </div>
                </BaseCardViewComponent>
            </v-tab-item>
            <v-tab-item v-if="microabilityPermission">
                <MicroAbilityFilterViewComponent
                    :cualificacionId="$router.currentRoute.params.Id"
                    :organizacionId="entity.organizacionId"
                />
            </v-tab-item>
        </v-tabs-items>
    </section>

    <BaseCardViewComponent
        v-else
        title="Indicador"
        :btnAction="$_returnToFilter"
        class="mx-auto"
        md="6"
        offset="3"
    >
        <div slot="card-text">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <div v-else>
                <AddAbilityViewComponent
                    :entity="entity"
                    :$_returnToFilter="$_returnToFilter"
                />
            </div>
        </div>
    </BaseCardViewComponent>
</template>
