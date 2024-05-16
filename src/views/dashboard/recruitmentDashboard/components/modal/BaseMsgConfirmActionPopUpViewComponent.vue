<script>
/**
 * Descripción: Pantalla  BaseMsgConfirmActionPopUpViewComponent
 *
 * @displayName BaseMsgConfirmActionPopUpViewComponent
 *
 */
import { mapGetters } from 'vuex';

import { v4 as uuidv4 } from 'uuid';

import httpService from '@/services/axios/httpService';

export default {
    name: 'BaseMsgConfirmActionPopUpViewComponent',

    props: {
        callback: {
            type: Function,
            required: true,
        },
    },

    components: {},

    data() {
        return {
            /**
             * Identificador del Dialog
             */
            refpopUp: 'popUp_',

            request: undefined,

            loading: false,
        };
    },

    computed: {
        ...mapGetters('theme', ['app']),

        title() {
            return this.request ? this.request?.title : undefined;
        },

        name() {
            return this.request ? this.request?.name : undefined;
        },

        msg() {
            return this.request
                ? `¿Está seguro de ${this.title.toLowerCase()} al candidato ${
                      this.name
                  }?`
                : undefined;
        },
    },

    created() {
        const randomID = uuidv4();

        /**
         * Config Inicial ID
         */
        this.refpopUp = this.refpopUp + randomID;
    },

    methods: {
        /**
         * Abrir modal
         */
        $_openModal() {
            this.$refs[this.refpopUp].$_openModal();
        },

        $_setData(data) {
            this.request = undefined;
            this.request = data;
            this.$_openModal();
        },

        $_setRequestApi() {
            return {
                vacanteCandidatoId: this.request?.id,
                estadoId: this.request?.statusId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('vacanteCandidato/changeStatus', this.$_setRequestApi())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.callback();
                        this.$_openModal();
                    }
                });
        },
    },
};
</script>

<template>
    <BasePopUp
        :ref="refpopUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '65%'"
        :isDrawer="false"
        scrollable
    >
        <div slot="Content">
            <BaseSkeletonLoader v-if="loading" type="article, actions" />
            <v-card flat v-else-if="request">
                <v-card-title
                    v-if="title"
                    class="BUO-Heading-Small"
                    :class="[app ? 'white--text' : 'grey700--text']"
                    >{{ title }}</v-card-title
                >
                <v-card-text>
                    <BaseForm :method="$_sendToApi" :labelBtn="title">
                        <div slot="body">
                            <v-row align-content="center" class="ma-auto">
                                <h3
                                    v-if="msg"
                                    class="BUO-Paragraph-Medium"
                                    :class="[
                                        app
                                            ? 'blueProgress600--text'
                                            : 'grey600--text',
                                    ]"
                                >
                                    {{ msg }}
                                </h3>
                            </v-row>
                        </div>
                    </BaseForm>
                </v-card-text>
            </v-card>
        </div>
    </BasePopUp>
</template>
