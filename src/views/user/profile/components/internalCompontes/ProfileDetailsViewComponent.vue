<script>
/**
 * Descripción: Pantalla Detalles Perfil
 *
 * @displayName ProfileDetailsViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

import baseSharedFnHelper from '@/helpers/baseSharedFnHelper';

const BaseCardViewComponent = () =>
    import('@/components/core/cards/BaseCardViewComponent');

const PersonalInformationViewComponent = () =>
    import(
        '@/views/user/profile/components/internalCompontes/PersonalInformationViewComponent'
    );

const PdaAbilityViewComponent = () =>
    import(
        '@/views/user/profile/components/internalCompontes/PdaAbilityViewComponent'
    );

const BuoAbilityViewComponent = () =>
    import(
        '@/views/user/profile/components/internalCompontes/BuoAbilityViewComponent'
    );

export default {
    name: 'ProfileDetailsViewComponent',

    props: {
        userId: {
            type: [Number, String],
        },
    },

    components: {
        BaseCardViewComponent,
        PersonalInformationViewComponent,
        PdaAbilityViewComponent,
        BuoAbilityViewComponent,
    },

    data() {
        return {
            entity: undefined,
            loading: false,
        };
    },

    created() {
        this.$_getObject();
    },

    methods: {
        /**
         * Function to return the ProfileFilterViewComponent
         */
        $_returnToFilter() {
            this.$router.back();
        },

        $_getObject() {
            let data = this.userId
                ? this.userId
                : this.$router.currentRoute.params.Id;
            if (data) {
                //HttpServices a la vista para obtener Vista
                this.loading = true;
                httpService.get(`user/${data}`).then((response) => {
                    this.loading = false;
                    if (response != undefined) {
                        // Encontro la entidad
                        this.entity = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );

                        this.entity.fechaNacimiento =
                            baseSharedFnHelper.$_parseArrayToDateISOString(
                                this.entity.fechaNacimiento
                            );
                    }
                });
            }
        },
    },
};
</script>

<template>
    <BaseCardViewComponent
        :btnAction="userId ? undefined : $_returnToFilter"
        :md="userId ? '12' : undefined"
        :offset="userId ? '0' : undefined"
    >
        <div slot="card-text">
            <BaseSkeletonLoader
                v-if="loading || !entity"
                type="article, actions"
            />
            <v-card flat v-else class="rounded-t-xl">
                <v-card-text>
                    <PersonalInformationViewComponent :entity="entity" />
                    <BuoAbilityViewComponent
                        :userName="entity.username"
                        :userId="userId"
                    />
                    <PdaAbilityViewComponent
                        :userName="entity.username"
                        :conPda="entity.conPda"
                        :userId="userId"
                    />
                </v-card-text>
            </v-card>
        </div>
    </BaseCardViewComponent>
</template>
