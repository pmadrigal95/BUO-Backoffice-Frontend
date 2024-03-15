<script>
/**
 * Descripción: Pantalla Sandbox 1
 *
 * @displayName Sandbox1ViewComponent
 *
 */

const BaseAlertCardViewComponent = () =>
    import(
        '@/views/dashboard/components/shared/card/BaseAlertCardViewComponent'
    );

export default {
    name: 'Sandbox1ViewComponent',

    components: { BaseAlertCardViewComponent },

    computed: {
        icon1() {
            return {
                src: 'https://buo-resources.s3.us-east-2.amazonaws.com/dashboard/ai-icon.svg',
            };
        },

        icon2() {
            return {
                src: 'mdi-domain',
            };
        },
    },
};
</script>

<template>
    <section>
        <h1>Sandbox 1</h1>

        <v-row class="mt-4">
            <v-col cols="4">
                <BaseAlertCardViewComponent
                    :icon="icon1"
                    label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
                />
            </v-col>

            <v-col cols="4">
                <BaseAlertCardViewComponent
                    :icon="icon2"
                    label="De acuerdo a insights de rotación, el 
    Beneficio 3 es un gran motivador para tus colaboradores por lo que te recomendamos aumentar esfuerzos relacionados con este beneficio"
                />
            </v-col>
        </v-row>
    </section>
</template>
