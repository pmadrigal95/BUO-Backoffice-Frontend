<script>
/**
 * Descripción: Pantalla Cambiar password User
 *
 * @displayName UserPasswordViewComponent
 */

import { mapGetters } from 'vuex';

import httpService from '@/services/axios/httpService';

const BasePasswordInput = () =>
    import('@/components/core/forms/BasePasswordInput');

export default {
    name: 'UserPasswordViewComponent',

    props: {
        callback: {
            type: Function,
            requiered: true,
        },
    },

    components: { BasePasswordInput },

    data() {
        return {
            loading: false,
            entity: this.$_Object(),
        };
    },

    computed: {
        ...mapGetters('authentication', ['user', 'buoId']),

        ...mapGetters('theme', ['app']),
    },

    methods: {
        $_Object() {
            return {
                newPassword: undefined,
            };
        },

        $_setRequest() {
            return {
                ...this.entity,
                usuarioId: this.user.userId,
            };
        },

        $_sendToApi() {
            this.loading = true;

            httpService
                .post('user/changePassword', this.$_setRequest())
                .then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        this.$_cancel();
                    }
                });
        },

        $_cancel() {
            this.entity = this.$_Object();
            this.callback();
        },

        $_open() {
            this.$refs['popUp'].$_openModal();
        },
    },
};
</script>

<template>
    <BasePopUp
        ref="popUp"
        :maxWidth="$vuetify.breakpoint.mobile ? '100%' : '60%'"
    >
        <div slot="Content">
            <BaseSkeletonLoader v-if="loading" type="article" />
            <BaseForm
                :method="$_sendToApi"
                :cancel="$_cancel"
                v-else
                :block="$vuetify.breakpoint.mobile"
            >
                <div slot="body">
                    <section
                        class="text-left BUO-Heading-Small mb-4"
                        :class="[
                            app ? 'blueProgress600--text' : 'blue900--text',
                        ]"
                    >
                        Resetear contraseña
                    </section>

                    <BasePasswordInput
                        v-model.trim="entity.newPassword"
                        title="Nueva contraseña"
                    />
                </div>
            </BaseForm>
        </div>
    </BasePopUp>
</template>
