<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName AddAbilityViewComponent
 *
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

export default {
    name: 'AddMicroAbilityViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },

        $_returnToFilter: {
            type: Function,
            requiered: true,
        },
    },

    data() {
        return {
            list: [],
            entityForm: this.$_Object(),
            loading: false,
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),
    },

    methods: {
        /**
         * Entity Object
         */
        $_Object() {
            return {
                id: 0,
                definicion: undefined,
                esInterna: undefined,
                cualificacionId: this.entity.id,
                estadoId: 2,
                organizacionId: this.entity.organizacionId,
                usuarioModificaId: this.entity.usuarioModificaId,
            };
        },

        $_addToList() {
            this.list.push(this.entityForm);
            this.entityForm = this.$_Object();
        },

        $_delete(index) {
            this.list.splice(index, 1);
        },

        $_sendToApi() {
            if (this.list && this.list.length > 0) {
                this.loading = true;

                httpService
                    .post('competencia/saveFormList', this.list)
                    .then((response) => {
                        if (response != undefined && response.data != '') {
                            this.$_returnToFilter();
                        }
                        this.loading = false;
                    });
            }
        },
    },
};
</script>

<template>
    <v-card flat v-if="user && buoId">
        <v-card-title>MicroHabilidades</v-card-title>
        <v-card-subtitle
            >Agrega las microhabilidades generales de la habilidad
            {{ entity?.definicion }}</v-card-subtitle
        >
        <v-card-text>
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <div v-else>
                <BaseForm
                    labelBtn="Agregar"
                    :block="$vuetify.breakpoint.mobile"
                    :method="$_addToList"
                >
                    <div slot="body">
                        <v-row dense>
                            <v-col cols="12">
                                <BaseInput
                                    label="Definición"
                                    :max="1000"
                                    v-model.trim="entityForm.definicion"
                                    :validate="['text']"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseSwitch
                                    :disabled="user.companyId != buoId"
                                    label="Interna"
                                    v-model="entityForm.esInterna"
                                />
                            </v-col>
                            <v-col cols="12">
                                <BaseRadioGroup
                                    v-model="entityForm.estadoId"
                                    endpoint="status"
                                    :validate="['requiered']"
                                />
                            </v-col>
                        </v-row>
                    </div>
                </BaseForm>
                <div class="pt-8">
                    <v-row v-if="list && list.length > 0">
                        <v-chip-group column>
                            <div v-for="(item, i) in list" :key="i">
                                <v-chip
                                    style="height: auto; white-space: normal"
                                    close
                                    close-icon="mdi-close"
                                    @click="$_delete(i)"
                                    @click:close="$_delete(i)"
                                >
                                    {{ item.definicion }}
                                </v-chip>
                            </div>
                        </v-chip-group>
                    </v-row>
                    <v-row justify-center class="pt-3">
                        <v-btn
                            @click="$_sendToApi"
                            block
                            dark
                            :color="
                                list && list.length > 0 ? 'primary' : 'grey500'
                            "
                            class="no-uppercase rounded-lg"
                            >Guardar
                            {{
                                list && list.length > 0
                                    ? '(' + list.length + ')'
                                    : ''
                            }}</v-btn
                        >
                    </v-row>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
