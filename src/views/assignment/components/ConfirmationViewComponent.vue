<script>
/**
 * Descripción: Pantalla Busqueda de talento
 *
 * @displayName FilterViewComponent
 *
 */

const StepViewComponent = () =>
    import('@/views/user/bulkLoad/components/StepViewComponent.vue');

export default {
    name: 'ConfirmationViewComponent',

    props: {
        entity: {
            type: Object,
            requiered: true,
        },
    },

    components: {
        StepViewComponent,
    },

    methods: {
        $_goBack() {
            this.entity.step = 1;
        },
    },
};
</script>

<template>
    <div>
        <v-layout justify-space-between>
            <StepViewComponent
                icon="mdi-numeric-3-circle"
                description="Seleccionar micro habilidades"
                iconColor="greenC900"
                font="grey700--text BUO-Paragraph-Medium"
            />
            <div>
                <v-btn
                    fab
                    x-small
                    color="primary"
                    @click="$_goBack"
                    elevation="0"
                    class="mx-1"
                >
                    <v-icon dark> mdi-chevron-left </v-icon>
                </v-btn>

                <v-btn fab x-small elevation="0" disabled>
                    <v-icon dark> mdi-chevron-right </v-icon>
                </v-btn>
            </div>
        </v-layout>
        {{ entity }}
    </div>
</template>
