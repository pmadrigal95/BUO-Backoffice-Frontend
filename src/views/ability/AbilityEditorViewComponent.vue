<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName AbilityEditorViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

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
            this.$router.push({
                name: 'AbilityFilterViewComponent',
            });
        },
    },
};
</script>

<template>
    <div v-if="$router.currentRoute.params.Id">
        <v-tabs v-model="tab" right show-arrows height="25" class="pa-3">
            <v-tabs-slider color="transparent"></v-tabs-slider>
            <v-tab class="rounded-pill no-uppercase"> Habilidad </v-tab>
            <v-tab class="rounded-pill no-uppercase"> Micro Habilidades </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="pa-5">
            <v-tab-item>
                <BaseCardViewComponent
                    title="Habilidad"
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
            <v-tab-item>
                <MicroAbilityFilterViewComponent
                    :cualificacionId="$router.currentRoute.params.Id"
                    :organizacionId="entity.organizacionId"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>

    <BaseCardViewComponent
        v-else
        title="Habilidad"
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
