<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName UpdateAbilityViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const FormAbilityViewComponent = () =>
    import('@/views/ability/components/editor/FormAbilityViewComponent');

export default {
    name: 'UpdateAbilityViewComponent',

    components: {
        FormAbilityViewComponent,
    },

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
            loading: false,
        };
    },

    methods: {
        $_sendToApi() {
            this.loading = true;
            let object = BaseArrayHelper.SetObject({}, this.entity);

            httpService
                .post('cualificacion/saveForm', object)
                .then((response) => {
                    this.loading = false;

                    if (response != undefined) {
                        //Logica JS luego de la acción exitosa!!!
                        this.$_returnToFilter();
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="article, actions" />
    <BaseForm
        v-else
        :block="$vuetify.breakpoint.mobile"
        :method="$_sendToApi"
        :cancel="$_returnToFilter"
    >
        <div slot="body">
            <FormAbilityViewComponent :entity="entity" />
        </div>
    </BaseForm>
</template>
