<script>
/**
 * Descripción: Pantalla Editor Habilidades
 *
 * @displayName AddAbilityViewComponent
 *
 */

import httpService from '@/services/axios/httpService';

import BaseArrayHelper from '@/helpers/baseArrayHelper';

const FormAbilityViewComponent = () =>
    import('@/views/ability/components/editor/FormAbilityViewComponent');

const AddMicroAbilityViewComponent = () =>
    import('@/views/ability/components/editor/AddMicroAbilityViewComponent');

export default {
    name: 'AddAbilityViewComponent',

    components: {
        FormAbilityViewComponent,
        AddMicroAbilityViewComponent,
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
            response: undefined,
            loading: false,
            step: 0,
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

                    if (response != undefined && response.data != '') {
                        this.response = BaseArrayHelper.SetObject(
                            {},
                            response.data
                        );
                        this.step = 1;
                    }
                });
        },
    },
};
</script>

<template>
    <BaseSkeletonLoader v-if="loading" type="card, article" />
    <v-window v-model="step" touchless v-else>
        <v-window-item :value="0">
            <br />
            <BaseForm
                :block="$vuetify.breakpoint.mobile"
                :method="$_sendToApi"
                :cancel="$_returnToFilter"
            >
                <div slot="body">
                    <FormAbilityViewComponent :entity="entity" />
                </div>
            </BaseForm>
        </v-window-item>
        <v-window-item :value="1">
            <br />
            <AddMicroAbilityViewComponent
                :entity="response"
                :$_returnToFilter="$_returnToFilter"
            />
        </v-window-item>
    </v-window>
</template>
